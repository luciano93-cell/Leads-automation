# 02 — Architektur, Tech-Stack, Hosting

## Architektur-Überblick

```
┌──────────────────────────────────────────────────────────────────┐
│  EINGANGSKANÄLE                                                  │
│                                                                  │
│  ┌────────────────┐               ┌──────────────────────────┐  │
│  │  Clay.com      │               │  Microsoft Outlook        │  │
│  │  Discovery +   │               │  Shared Mailbox           │  │
│  │  Enrichment    │               │  (sales@firma.de)         │  │
│  │  (täglich)     │               │  via Microsoft Graph      │  │
│  └────────┬───────┘               └────────────┬─────────────┘  │
│           │ Webhook                            │ Webhook (Push)  │
│           ▼                                    ▼                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  PYTHON-SERVICE  (FastAPI, Docker, VPS Hetzner)             │ │
│  │                                                              │ │
│  │   /ingest/clay      /ingest/email      /review/{token}      │ │
│  │        │                 │                                   │ │
│  │        ▼                 ▼                                   │ │
│  │   Mapping        Signatur extrahieren (Claude API)           │ │
│  │        │                 │                                   │ │
│  │        └────────┬────────┘                                   │ │
│  │                 ▼                                            │ │
│  │   Deterministische Validierung + Dedup                       │ │
│  │                 │                                            │ │
│  │                 ▼                                            │ │
│  │   ┌──────────────────────────────────────┐                  │ │
│  │   │  SQLite: leads-Tabelle                │                  │ │
│  │   │  status: new | review | approved |    │                  │ │
│  │   │          synced | rejected | failed   │                  │ │
│  │   └──────────────────────────────────────┘                  │ │
│  │                                                              │ │
│  │   APScheduler-Jobs:                                          │ │
│  │   • sync_salesforce       alle 5 Min                         │ │
│  │   • renew_graph_sub       alle 48 h                          │ │
│  │   • dead_mans_switch      stündlich                          │ │
│  │   • backup_sqlite         täglich                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                 │                              ▲                 │
│                 ▼                              │                 │
│   ┌──────────────────────┐         ┌────────────────────────┐  │
│   │  Salesforce REST API  │         │  Review-Mail an Sales  │  │
│   │  Lead.create          │         │  mit Magic Links       │  │
│   └──────────────────────┘         └────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## Komponenten

### Eingangskanäle
- **Clay.com** — Lead-Discovery + Enrichment. Schickt POST an `/ingest/clay` mit HMAC-signiertem Body.
- **Microsoft Graph** — Subscription auf Shared Mailbox. Push-Webhook an `/ingest/email` mit Validation-Token-Handshake.

### Service-interne Schichten
| Layer | Modul | Zweck |
|---|---|---|
| HTTP | `app/api/` | FastAPI-Endpoints, Validation, Auth |
| Domain | `app/services/` | Extraktion, Validierung, Dedup, Sync |
| Persistence | `app/db/` | SQLAlchemy-Modelle, Migrations |
| Scheduling | `app/jobs/` | APScheduler-Jobs |
| Integrations | `app/clients/` | Salesforce, Microsoft Graph, Anthropic-Wrapper |
| Config | `app/config.py` | Pydantic Settings, ENV-Vars |

### Ausgangskanäle
- **Salesforce REST API** — `Lead.create` via `simple-salesforce`, Token-Refresh, Retry.
- **SMTP / Magic Links** — Review-Mails an Sales-Verteiler mit signierten Approve/Reject-Links.

## Tech-Stack

| Kategorie | Technologie | Begründung |
|---|---|---|
| Sprache | Python 3.11+ | Standard, AI-Agenten gut darin |
| Web | FastAPI | Async, Pydantic, OpenAPI-Doc out-of-the-box |
| DB | SQLite + SQLAlchemy | Eine Datei, kein Server, reicht für >100k Leads |
| Migrations | Alembic | Standard für SQLAlchemy |
| Scheduler | APScheduler | In-process, kein Redis nötig |
| LLM | Claude Haiku via `anthropic` SDK | Günstig, structured output via Tool-Use |
| MS Graph | `msgraph-sdk` oder `httpx` | OAuth2 mit `msal` |
| Salesforce | `simple-salesforce` | Erprobte Bibliothek |
| Tests | pytest, pytest-asyncio, respx | HTTP-Mocks für externe APIs |
| Lint/Format | ruff, black, mypy | CI-Gates |
| Container | Docker + docker-compose | |
| Reverse Proxy | Caddy | HTTPS auto, Let's Encrypt |
| Monitoring | Uptime-Kuma | Self-hosted, im selben Compose |
| Logs | loguru (JSON in Prod) | Strukturierte Logs |

## Hosting

- **VPS:** Hetzner CX22 oder vergleichbar, Standort Deutschland (DSGVO).
- **Domain:** Subdomain (z.B. `leads.firma.de`) auf VPS-IP.
- **HTTPS:** automatisch via Caddy + Let's Encrypt.
- **Backups:** tägliche SQLite-Dumps in Hetzner Storage Box, 30 Tage Retention.
- **Recovery-Ziel:** RTO ~30 Min via dokumentiertes Runbook.

## Sicherheits-Constraints

- Alle Webhook-Endpoints prüfen Signaturen (HMAC für Clay, Validation-Token für Graph).
- Magic-Links für Review sind **signiert** (z.B. itsdangerous) und maximal 7 Tage gültig, Token-Replay-Schutz.
- Secrets ausschließlich in `.env` / Container-ENV, nie im Code.
- Lead-Daten **nicht** in Logs (PII-Schutz).

## Kosten pro Monat

| Posten | Kosten |
|---|---|
| Hetzner CX22 VPS | 6 € |
| Hetzner Storage Box (Backups) | 4 € |
| Claude API (Haiku, ~10k Extraktionen) | ~15 € |
| Claude Code Subscription (1 Seat) | ~80 € |
| Clay.com Starter/Explorer | 150–350 € |
| Microsoft Graph | 0 € (in M365) |
| Salesforce API | 0 € (in Lizenz) |
| **Summe** | **~255–455 €/Monat** |

## Skalierungs-Pfade (falls nötig)
- SQLite → Postgres bei >500k Leads oder Multi-Mailbox
- Single-VPS → Container-Orchestrierung bei >5 Mailboxes
- Clay → eigenes Scraping (Firecrawl) wenn Lizenzkosten relevanter werden
