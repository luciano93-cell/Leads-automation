# 03 — Datenmodell, Status, Validierung

## Lead-Schema (kanonisch)

Beide Eingangskanäle müssen Datensätze in genau diesem Format produzieren. Mapping zu Salesforce-Feldern geschieht zentral im Sync-Worker.

```json
{
  "lead_id": "uuid v4",
  "source": "web | email",
  "source_detail": "clay_table_id | outlook_message_id",
  "company": "string (required)",
  "website": "string | null",
  "contact_name": "string | null",
  "contact_email": "string | null",
  "contact_phone": "string E.164 | null",
  "job_title": "string | null",
  "address": {
    "street": "string | null",
    "zip": "string | null",
    "city": "string | null",
    "country": "ISO-3166-1 alpha-2 | null"
  },
  "industry": "string | null",
  "raw_excerpt": "string (für Audit, max 4000 chars)",
  "validation_score": 0,
  "validation_flags": ["new_domain", "missing_phone", ...],
  "extracted_at": "ISO 8601",
  "salesforce_id": "string | null",
  "status": "new"
}
```

### Pflichtfelder
- `lead_id`, `source`, `source_detail`, `company`, `extracted_at`, `status`
- Mindestens eines von: `contact_email` ODER `contact_phone`

## Status-Modell

| Status | Bedeutung | Nächster Schritt |
|---|---|---|
| `new` | Soeben extrahiert, Validierung bestanden | Auto-Push an Salesforce |
| `review` | Validierung unsicher (neue Domain, fehlende Felder) | Review-Mail an Sales mit Magic Link |
| `approved` | Sales hat freigegeben | Auto-Push an Salesforce |
| `rejected` | Sales hat verworfen | Endzustand, mit Begründung archiviert |
| `synced` | In Salesforce angelegt, SF-ID gespeichert | Endzustand |
| `failed` | SF-Push 3× gescheitert | Alert, manueller Eingriff |

### Erlaubte Übergänge
```
new       → synced | failed
review    → approved | rejected
approved  → synced | failed
failed    → synced (nach manuellem Eingriff/Retry)
```

Andere Übergänge sind ungültig und müssen 422 zurückgeben.

## Validierungs-Regeln (deterministisch, nicht LLM-Confidence)

Berechnung eines `validation_score` 0–5. Jede erfüllte Regel = +1 Punkt:

| # | Regel | Bedingung |
|---|---|---|
| 1 | Pflichtfelder vorhanden | `company` UND (`contact_email` ODER `contact_phone`) |
| 2 | Email-Domain matcht Firmen-Domain | Email-Domain ist Suffix von `website`-Domain (ohne `www`) |
| 3 | Telefon parsefähig | Per `phonenumbers`-Library nach E.164 normalisierbar |
| 4 | Adresse vollständig | `city` UND `country` vorhanden |
| 5 | Domain bereits bekannt | Existiert in DB mit `status IN (synced, approved)` |

### Score-Schwellen
| Score | Status nach Validierung |
|---|---|
| 5 | `new` (auto) |
| 4 | `new` falls Regel 2 erfüllt, sonst `review` |
| 2–3 | `review` |
| 0–1 | `rejected` |

### Flags (in `validation_flags`)
Werden gesetzt, wenn relevante Punkte fehlen — informieren das Sales-Team in Review-Mails:
- `new_domain` — Domain zum ersten Mal gesehen
- `missing_phone`, `missing_email`, `missing_address`
- `domain_mismatch` — Email-Domain weicht von Website-Domain ab
- `invalid_phone` — Parsen fehlgeschlagen
- `incomplete_signature` — bei Kanal 2: weniger als 3 Felder extrahiert

## Dedup-Logik

Pro neuem Lead vor Insert:

1. **Match auf `normalized_email`** (Email in Kleinbuchstaben, `+suffix` entfernt) → bestehender Lead wird mit fehlenden Feldern angereichert, kein neuer Eintrag.
2. **Falls keine Email vorhanden:** Match auf `(domain + lastname)` — wo Domain aus Website extrahiert, Lastname aus `contact_name`.
3. **Kein Match:** Insert.
4. **Salesforce-Sync:** vor `Lead.create` zusätzlich SOQL-Lookup ob Lead/Contact in SF schon existiert. Bei Treffer Status auf `synced` ohne erneutes Anlegen.

## Anti-Spam-Filter für Kanal 2 (E-Mail)

Bevor eine Mail überhaupt in die Extraktion geht:
- `List-Unsubscribe`-Header gesetzt → skip (Newsletter)
- `Auto-Submitted`-Header ≠ `no` → skip (Out-of-Office, System-Mails)
- Absender in interner Domain → skip
- Bekannte Marketing-Automation-Domains (z.B. `mailchimp`, `sendgrid`) → skip
- Mail-Body kürzer als 50 Zeichen → skip
- Absender bereits in Salesforce als Contact → skip (kein Lead)

## DSGVO-Anforderungen am Datenmodell

- **Löschung:** Endpoint `/admin/lead/{id}` mit DELETE muss alle PII aus DB + SF entfernen.
- **Auskunft:** Endpoint `/admin/lead/{id}` mit GET liefert kompletten Datensatz für Auskunfts-Anfragen.
- **Retention:** Leads mit `status=rejected` werden nach 90 Tagen automatisch gepurged.
- **Logging:** PII (Email, Telefon, Name) wird in Logs durch `[REDACTED]` ersetzt. `lead_id` darf geloggt werden.
