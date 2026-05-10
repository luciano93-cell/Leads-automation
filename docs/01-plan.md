# 01 — Plan: Vision, Pitch, Scope

## Vision in einem Satz
Zwei vollautomatische Workflows erfassen rund um die Uhr neue potenzielle Kunden aus dem Web und aus eingehenden E-Mails, strukturieren die Daten einheitlich und legen sie in Salesforce an — ohne manuelle Recherche, ohne Copy-Paste, mit definierter Qualitätskontrolle.

## Das Problem heute
- Lead-Recherche ist manuell: 5–10 Minuten pro Lead in Google, LinkedIn, Impressum.
- Kontaktdaten aus E-Mail-Signaturen werden selten erfasst — Potenzial bleibt liegen.
- Datenqualität in Salesforce schwankt, Duplikate sammeln sich an.
- **Aufwand:** 15–30 Stunden manuelle Arbeit pro Monat plus unbekannte Anzahl nicht erfasster Leads.

## Die zwei Workflows

### Kanal 1 — Web-Recherche (proaktiv)
- **Trigger:** täglich 03:00 Uhr via Cron.
- **Quelle:** Clay.com mit definierten Suchkriterien (Branche, Region, Firmengröße).
- **Output:** angereicherte Leads (Firma, Kontakt, Mail, Telefon, Branche).

### Kanal 2 — E-Mail-Signaturen (reaktiv)
- **Trigger:** Push-Webhook über Microsoft Graph bei neuer Mail in der Sales-Mailbox.
- **Quelle:** Signatur-Block der eingehenden Mail.
- **Output:** gleiches Datenformat wie Kanal 1, plus Referenz auf die Original-Mail.

## Verarbeitung
1. Normalisierung auf einheitliches Lead-Schema → siehe [`03-data-schema.md`](03-data-schema.md)
2. Deterministische Validierung (Pflichtfelder, Plausibilität, Dedup)
3. Persistenz in SQLite mit Status
4. Auto-Push an Salesforce alle 5 Min für hochqualitative Datensätze
5. Review-Mail an Sales-Team für mittlere Qualität
6. Verwerfen + Archivieren bei unzureichender Qualität

## Was sich für das Sales-Team ändert
- Mehr und besser strukturierte Leads in der Salesforce-Queue
- Tools und Prozesse bleiben gleich
- Review-Mails mit „Anlegen / Verwerfen"-Links für unsichere Fälle

## Kalenderzeit und Aufwand
- **5 Wochen** bis Produktivbetrieb
- **~16 Personentage** verteilt auf Dev, IT, Sales-Ops, Salesforce-Admin
- Der Großteil der Entwicklung läuft per **Vibe-Coding mit Claude Code / Codex**

## Betriebskosten
~255–455 €/Monat (VPS, Clay, Claude API, Backup) — Detail siehe [`02-architecture.md`](02-architecture.md).

## ROI
Bei 200 automatischen Leads/Monat → 15–30 h Zeitersparnis → 750–1.500 €/Monat. Break-even ab Monat 1.

## Was bewusst NICHT im Scope ist
Diese Punkte sind ausgeschlossen, um Scope-Creep zu vermeiden:

- **Automatischer Outbound-Versand** (Mails, LinkedIn-DMs) — separater Folge-Use-Case, juristisch eigenes Thema.
- **Lead-Scoring / Predictive-Modelle** — Salesforce kann das selbst, später integrierbar.
- **CRM-Migration oder Salesforce-Workflows** — wir liefern nur Leads, alles danach ist bestehender Sales-Prozess.
- **Mehrsprachigkeit über DE/EN hinaus** — später erweiterbar, Claude unterstützt alle Sprachen.
- **Anbindung weiterer CRMs** (HubSpot etc.) — durch sauberes Lead-Schema vorbereitet, aber nicht jetzt.

## Wichtigste Prinzipien
1. **Vibe-Coding-first:** Claude Code / Codex erledigen den Großteil, Mensch reviewt.
2. **Deterministische Qualitätsregeln** statt LLM-Confidence.
3. **Single Source of Truth:** ein Schema, eine DB, ein Sync-Worker.
4. **Trennung Anlage vs. Outbound:** wir legen an, der Mensch entscheidet über Kontaktaufnahme.
5. **DSGVO-konform** by design: Datenhaltung in DE, Löschmechanismen vorgesehen.
