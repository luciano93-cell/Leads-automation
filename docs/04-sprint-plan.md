# 04 — Sprint-Plan

**Legende:**
- 👤 = menschliche Aufgabe (Dev, IT, Legal, Sales-Ops, Admin)
- 🤖 = Vibe-Coding (Claude Code / Codex), Mensch reviewt PR

Jede Aufgabe wird zu einer GitHub-Issue. Die Generierung ist in [`scripts/create-issues.sh`](../scripts/create-issues.sh) automatisiert.

---

## Sprint 0 — Voraussetzungen (Woche 1)

Ziel: Alle Zugänge und Freigaben da.

| # | Aufgabe | Wer | Aufwand |
|---|---|---|---|
| 0.1 | DSGVO-Freigabe einholen: B2B-Lead-Datenhaltung, klare Trennung Anlage ≠ Outbound | 👤 PM + Legal | 0,5 PT + Wartezeit |
| 0.2 | Azure App Registration, Scope `Mail.Read` auf Sales-Mailbox, Admin-Consent | 👤 IT | 0,5 PT + Wartezeit |
| 0.3 | Salesforce-Sandbox + Custom Fields: `Lead_Source_Detail__c`, `AI_Validation_Score__c`, `Extracted_At__c`, `Source_Raw_Excerpt__c` | 👤 SF-Admin | 0,5 PT |
| 0.4 | Clay.com Account + erste Discovery-Liste | 👤 Sales-Ops | 1 PT |
| 0.5 | VPS bestellen (Hetzner CX22), DNS-Eintrag | 👤 DevOps | 0,5 PT |
| 0.6 | GitHub-Repo, Claude-Code-Zugang, Codex-Zugang | 👤 Dev | 0,25 PT |
| 0.7 | Anthropic API Key, Budget-Limit | 👤 Dev | 0,25 PT |
| 0.8 | Entscheidungen: Mailbox, Pilot-Branche, Verteiler für Review-Mails | 👤 PM + Sales-Lead | 0,5 PT |

---

## Sprint 1 — Skelett & Salesforce-Sync (Woche 2)

Ziel: Dummy-Lead erreicht Salesforce-Sandbox.

| # | Aufgabe | Wer |
|---|---|---|
| 1.1 | FastAPI-Projekt bootstrappen: Struktur, pyproject.toml, ruff/black, pytest, GitHub Actions CI | 🤖 |
| 1.2 | SQLAlchemy-Modell für `Lead` gemäß Schema, Alembic-Migrations | 🤖 |
| 1.3 | Pydantic-Schemas (request/response), shared zwischen Endpoints | 🤖 |
| 1.4 | Salesforce-Client (simple-salesforce), Token-Refresh, Retry-Decorator | 🤖 |
| 1.5 | Sync-Job: APScheduler alle 5 Min, `status=new OR approved` → SF.Lead.create | 🤖 |
| 1.6 | Integration-Test End-to-End mit Mock-SF | 🤖 |
| 1.7 | Dockerfile + docker-compose mit Caddy (HTTPS), Health-Endpoint | 🤖 |
| 1.8 | SF-Sandbox-Credentials auf VPS hinterlegen, Deploy testen | 👤 Dev |
| 1.9 | Manueller End-to-End-Test: Dummy-Lead → Salesforce-Sandbox | 👤 Dev |

---

## Sprint 2 — Outlook-Pipeline (Woche 3)

Ziel: Echte Mails werden zu validierten Leads.

| # | Aufgabe | Wer |
|---|---|---|
| 2.1 | Microsoft Graph Client: OAuth2-Setup, Token-Cache, Mail-Body-Abruf | 🤖 |
| 2.2 | Webhook-Endpoint `/ingest/email` mit Validation-Token-Handshake (10-Sek-Response) | 🤖 |
| 2.3 | Subscription-Anlage-Skript (`scripts/setup_graph_subscription.py`) | 🤖 |
| 2.4 | Renewal-Job alle 48 h mit Logging + Alert bei Fehler | 🤖 |
| 2.5 | Dead-Man's-Switch: stündlicher Check, Alert wenn 24 h keine Mail | 🤖 |
| 2.6 | Signatur-Extraktor: Heuristik für Signatur-Block (HTML + Plaintext) | 🤖 |
| 2.7 | Claude-API-Call mit Tool-Use für strukturierten JSON-Output | 🤖 |
| 2.8 | Filter: extern, nicht in SF, keine Auto-Mails (List-Unsubscribe-Header) | 🤖 |
| 2.9 | Deterministische Validierung gemäß `03-data-schema.md` | 🤖 |
| 2.10 | Dedup-Logik mit Update-statt-Insert bei Match | 🤖 |
| 2.11 | Tests mit 5 Beispiel-Mails (HTML, Plaintext, Antwort-Thread, ohne Signatur, mehrsprachig) | 🤖 |
| 2.12 | Graph-Subscription auf echter Shared Mailbox aktivieren | 👤 IT + Dev |
| 2.13 | Test mit 20 echten Mails aus Archiv, Genauigkeit messen | 👤 Dev + Sales |
| 2.14 | Prompt-Iteration basierend auf Test-Ergebnissen | 🤖 |

---

## Sprint 3 — Clay-Pipeline (Woche 4)

Ziel: Web-Leads fließen täglich rein.

| # | Aufgabe | Wer |
|---|---|---|
| 3.1 | Clay-Tabelle aufsetzen, Enrichment-Spalten konfigurieren | 👤 Sales-Ops |
| 3.2 | Webhook-Endpoint `/ingest/clay` mit HMAC-Signatur-Verification | 🤖 |
| 3.3 | Mapper Clay-Felder → einheitliches Schema | 🤖 |
| 3.4 | Tests mit Beispiel-Payloads aus Clay-Doku | 🤖 |
| 3.5 | Clay-Webhook auf VPS-Endpoint konfigurieren | 👤 Sales-Ops |
| 3.6 | Test-Run mit 100 Leads, Sales reviewt Stichprobe von 20 | 👤 Sales |
| 3.7 | Tuning Clay-Mapping basierend auf Stichprobe | 🤖 |

---

## Sprint 4 — Human-Review-Flow (Woche 4)

Ziel: Sales-Team kann in 10 Sekunden entscheiden.

| # | Aufgabe | Wer |
|---|---|---|
| 4.1 | Magic-Link-Generator (signierte Tokens, 7 Tage gültig, Replay-Schutz) | 🤖 |
| 4.2 | Endpoint `/review/{token}` mit Mini-HTML-Page „Approve / Reject" | 🤖 |
| 4.3 | Mail-Versand-Job: für jeden neuen `review`-Lead Mail an Sales-Verteiler | 🤖 |
| 4.4 | Tests inkl. Token-Replay-Schutz | 🤖 |
| 4.5 | Sales-Verteiler-Adresse festlegen, kurze Anleitung verschicken | 👤 Sales-Lead |

---

## Sprint 5 — Go-Live & Monitoring (Woche 5)

Ziel: Produktivbetrieb mit Sicherheitsnetz.

| # | Aufgabe | Wer |
|---|---|---|
| 5.1 | Uptime-Kuma in docker-compose, Checks für Endpoints + Jobs | 🤖 |
| 5.2 | Strukturiertes Logging (loguru), JSON in Prod, Log-Rotation | 🤖 |
| 5.3 | Backup-Cron: tägl. SQLite-Dump → Hetzner Storage Box, 30 T Retention | 🤖 |
| 5.4 | Alert-Regeln: failed-Push, Dead-Man's-Switch, Renewal-Fail → Mail | 🤖 |
| 5.5 | Runbook generieren: häufige Probleme + Fix-Schritte | 🤖 |
| 5.6 | Mini-Dashboard: Leads/Tag pro Quelle, Sync-Rate, Review-Quote | 🤖 |
| 5.7 | Wechsel SF-Sandbox → Produktiv-Credentials | 👤 SF-Admin + Dev |
| 5.8 | Schulung Sales-Team (30 Min Walkthrough) | 👤 PM + Sales-Lead |
| 5.9 | Soft-Launch mit erhöhter manueller Stichprobenkontrolle | 👤 Sales |
| 5.10 | Retro nach Woche 1 Produktivbetrieb | 👤 Team |

---

## Sprint 6+ — Optimierung (laufend)

- Feedback aus Sales auswerten, LLM-Prompt iterieren
- Clay-Suchkriterien verfeinern
- Validation-Regeln nachschärfen
- Ggf. Clay durch eigenes Scraping ersetzen
