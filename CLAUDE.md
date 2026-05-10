# CLAUDE.md — Onboarding für Claude Code

Diese Datei wird beim Start automatisch geladen. Sie fasst zusammen, was du wissen musst, um in diesem Projekt sinnvoll zu arbeiten.

## Projekt in einem Satz
Ein Python-Service, der Sales-Leads aus zwei Quellen (Web-Recherche via Clay, E-Mail-Signaturen via Microsoft Graph) extrahiert, validiert und in Salesforce anlegt.

## Was du zuerst lesen solltest
1. [`docs/01-plan.md`](docs/01-plan.md) — Vision und Scope
2. [`docs/02-architecture.md`](docs/02-architecture.md) — Architektur und Tech-Stack
3. [`docs/03-data-schema.md`](docs/03-data-schema.md) — Datenmodell und Validierung
4. [`docs/04-sprint-plan.md`](docs/04-sprint-plan.md) — Aktuelle Aufgaben

## Tech-Stack — verbindlich, nicht zur Diskussion
- **Sprache:** Python 3.11+
- **Web-Framework:** FastAPI
- **DB:** SQLite via SQLAlchemy (kein anderes ORM, kein Postgres-Wechsel ohne Diskussion)
- **Migrations:** Alembic
- **Scheduler:** APScheduler (in-process, kein Celery / Redis)
- **LLM:** Anthropic Claude (Haiku als Default), via offiziellem `anthropic`-SDK mit Tool-Use für strukturiertes JSON
- **Salesforce:** `simple-salesforce`
- **Microsoft Graph:** `msgraph-sdk` oder direkt `httpx`
- **Tests:** `pytest` + `pytest-asyncio` + `httpx` für HTTP-Mocks
- **Lint/Format:** `ruff` + `black`
- **Container:** Docker, docker-compose
- **Reverse Proxy:** Caddy

## Konventionen
- **Tests sind Pflicht.** Jeder PR ohne Tests wird zurückgewiesen. Bei Bugfix: erst Test schreiben der den Bug reproduziert, dann fixen.
- **Keine Geheimnisse im Code.** Secrets immer aus `.env` (lokal) bzw. Container-Env-Vars (Prod).
- **Strukturierte Logs** mit `loguru`, JSON-Format in Prod.
- **Type Hints** überall, `mypy --strict` läuft in CI.
- **Idempotenz:** Webhook-Endpoints müssen mehrfaches Empfangen derselben Nachricht ohne Schaden verkraften.
- **Retry-Logik:** Salesforce- und Graph-Calls mit exponential backoff (3 Versuche).
- **Kommentare:** nur wenn das Warum nicht offensichtlich ist. Keine Kommentare die wiederholen, was der Code tut.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
- **PRs:** klein, eine Issue pro PR, Tests grün vor Review-Anfrage.

## Constraints — bitte respektieren
- **DSGVO:** Lead-Daten sind personenbezogen. Lösch-Funktionen müssen vorgesehen sein. Keine Speicherung in Logs.
- **Anlage ≠ Outbound:** Dieser Service legt Leads in Salesforce an, sendet aber **niemals selbst** Mails an Leads. Die Kontaktaufnahme bleibt manueller Sales-Prozess.
- **Microsoft Graph Subscriptions** laufen alle 4230 Min (≈70 h) ab. Renewal-Job ist Pflicht, ein Dead-Man's-Switch ebenso.
- **LLM-Confidence ist nicht kalibriert.** Wir nutzen deterministische Validierungs-Regeln (`docs/03-data-schema.md`), nicht Schwellenwerte auf LLM-Output.

## Wenn du unsicher bist
- Wenn etwas DSGVO-relevant aussieht → frag den User, nicht entscheiden.
- Wenn ein Issue widersprüchlich zum Plan ist → frag, nicht raten.
- Wenn ein Sprint-Task externe Zugänge braucht, die nicht da sind → markiere das Issue als `blocked` und kommentiere.

## Wie du Aufgaben annimmst
1. GitHub-Issue mit Label `ai-agent` aus aktuellem Sprint-Milestone wählen
2. Issue lesen, in Plan-Doku quer-referenzieren
3. Branch `feat/issue-<nr>-<kurzbeschreibung>` anlegen
4. Code + Tests schreiben
5. PR öffnen, Issue verlinken (`Closes #<nr>`)

## Build & Run
```bash
# Setup (einmal)
python -m venv .venv && source .venv/bin/activate  # bzw. .venv\Scripts\activate auf Windows
pip install -e ".[dev]"

# Tests
pytest

# Dev-Server
uvicorn app.main:app --reload

# Container-Build
docker compose up --build
```

(Diese Befehle gelten ab Sprint 1, wenn das Projekt-Skelett steht.)

## Was NICHT zum Scope gehört
Lies [`docs/01-plan.md`](docs/01-plan.md) → Abschnitt „Was bewusst NICHT im Scope ist". Wenn du Lust hast, das zu ändern: frag erst.
