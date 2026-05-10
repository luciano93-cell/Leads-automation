# AGENTS.md — Onboarding für Codex und andere AI-Agenten

Diese Datei wird beim Start automatisch geladen. Inhaltlich identisch mit [`CLAUDE.md`](CLAUDE.md) — wir pflegen die Konventionen an einer Stelle.

➡️ **Bitte lies [`CLAUDE.md`](CLAUDE.md) zuerst.**

Alles dort gilt 1:1 auch für dich:
- Tech-Stack (Python, FastAPI, SQLite, APScheduler, Claude API, Docker)
- Konventionen (Tests Pflicht, Type Hints, structured logging, Conventional Commits)
- Constraints (DSGVO, Anlage ≠ Outbound, Microsoft Graph Renewal)
- Arbeitsablauf (Issue → Branch → PR)

## Spezifische Hinweise für Codex
- Du arbeitest in der Regel mit größerer Autonomie über mehrere Files. Halte dich trotzdem an „eine Issue pro PR".
- Wenn du Tooling-Setup (Docker, CI) änderst, beschreibe in der PR-Description was warum geändert wurde — der Reviewer hat sonst keinen Kontext.
- Bei Konflikt zwischen Plan-Doku und Issue: Plan-Doku gewinnt. Issue ggf. updaten.

## Vorsicht vor Halluzinationen
- Bibliotheken nur verwenden, wenn sie in `pyproject.toml` stehen oder du sie dort hinzufügst.
- API-Endpoints von Salesforce / Microsoft Graph nicht aus dem Gedächtnis — verlinke die offizielle Doku im PR.
- LLM-Tool-Use Schemas: an [`docs/03-data-schema.md`](docs/03-data-schema.md) halten.
