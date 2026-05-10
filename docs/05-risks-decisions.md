# 05 — Risiken & offene Entscheidungen

## Risiken

| Risiko | Wahrscheinlichkeit | Impact | Maßnahme |
|---|---|---|---|
| DSGVO-Beanstandung | Mittel | Hoch | Vorab-Freigabe Legal, Trennung Anlage/Outbound, dokumentierter Löschprozess |
| Graph-Subscription verfällt unbemerkt | Hoch (ohne Maßnahme) | Hoch | Renewal-Job alle 48 h + Dead-Man's-Switch stündlich |
| LLM extrahiert falsche Felder | Mittel | Mittel | Deterministische Validierung statt LLM-Confidence, Review-Flow |
| Salesforce-API-Limit | Niedrig | Mittel | Batch-Sync alle 5 Min, Retry-Backoff |
| VPS-Ausfall | Niedrig | Mittel | Uptime-Kuma, tägliche Backups, Recovery-Runbook |
| Clay zu teuer / Vendor-Lock-in | Mittel | Niedrig | Lead-Schema bleibt eigen, Clay austauschbar |
| Sales-Team nutzt Review-Flow nicht | Mittel | Mittel | Magic-Link-Mail einfacher als Tool, Onboarding in Sprint 5 |
| Microsoft Graph webhook validation handshake | Mittel | Hoch | Explizit getestet in Sprint 2.2, 10-Sek-Response garantiert |

## Offene Entscheidungen

Diese Punkte brauchen Team-Input, bevor Sprint 0 abgeschlossen werden kann:

1. **DSGVO/UWG-Linie:** Wo zieht Legal die Grenze zwischen Datenhaltung (zulässig) und Outbound-Kontaktaufnahme (heikel)?
2. **Product Owner:** Wer setzt Prioritäten und übersetzt zwischen Tech und Sales?
3. **Pilot-Scope:**
   - Welche Branche / Region für Kanal 1?
   - Welche Shared Mailbox für Kanal 2?
4. **Score-Schwellen final bestätigen:** Vorschlag in [`03-data-schema.md`](03-data-schema.md), muss mit Sales-Lead abgestimmt werden.
5. **Verteiler für Review-Mails:** Eine Adresse oder Round-Robin? Wer ist Urlaubs-Backup?
6. **Eskalation bei `failed`-Status:** Wer wird wann benachrichtigt?
7. **Datenlöschung:** Retention für `rejected` 90 Tage ok? Für `synced`?
8. **Sandbox vs. Produktiv Salesforce:** Ist die Sandbox aktuell genug für realistische Tests?
9. **Skalierung nach Pilot:** Weitere Mailboxes, weitere Clay-Tabellen, weitere Sprachen?
10. **Clay-Alternative:** Falls Budget nicht freigegeben — direkt mit eigenem Firecrawl-Scraper starten? Erhöht Sprint-3-Aufwand auf ~5 Tage.

## Entscheidungs-Log

Dieser Abschnitt wird durch das Team gepflegt. Format:

```
YYYY-MM-DD — Entscheidung XYZ
Kontext: …
Optionen: A / B / C
Gewählt: B
Begründung: …
```

(noch leer)
