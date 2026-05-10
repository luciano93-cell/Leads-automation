# Lead-Automatisierung

Zwei agentische KI-Workflows zur automatischen Erfassung neuer Sales-Leads:
1. **Web-Recherche** über Clay.com (proaktiv, täglich)
2. **E-Mail-Signaturen** aus der Sales-Mailbox (reaktiv, Echtzeit)

Beide münden in ein einheitliches Datenformat und werden in Salesforce als Lead angelegt.

---

## Was ist wo?

| Datei | Inhalt |
|---|---|
| [`docs/01-plan.md`](docs/01-plan.md) | Vision, Pitch, Scope |
| [`docs/02-architecture.md`](docs/02-architecture.md) | System-Architektur, Tech-Stack, Hosting |
| [`docs/03-data-schema.md`](docs/03-data-schema.md) | Lead-Schema, Status-Modell, Validierungs-Regeln |
| [`docs/04-sprint-plan.md`](docs/04-sprint-plan.md) | Alle Sprints mit Aufgaben, menschlich/AI-markiert |
| [`docs/05-risks-decisions.md`](docs/05-risks-decisions.md) | Risiken, offene Entscheidungen |
| [`docs/presentation.pptx`](docs/presentation.pptx) | Pitch-Slides für Management & Marketing |
| [`CLAUDE.md`](CLAUDE.md) | Onboarding für Claude Code |
| [`AGENTS.md`](AGENTS.md) | Onboarding für Codex / andere Agenten |

---

## Schnellstart für Menschen

1. Plan lesen: [`docs/01-plan.md`](docs/01-plan.md) und [`docs/04-sprint-plan.md`](docs/04-sprint-plan.md)
2. Offene GitHub-Issues nach Milestone `Sprint 0` filtern
3. Loslegen

## Schnellstart für AI-Agenten (Claude Code / Codex)

1. Lies `CLAUDE.md` bzw. `AGENTS.md` — dort stehen Konventionen und Constraints
2. Nimm das nächste offene Issue mit Label `ai-agent` aus dem aktuellen Sprint-Milestone
3. Folge den Konventionen, frage bei Unklarheiten, eröffne einen PR pro Issue

---

## Status

🟡 Vorbereitung — siehe [`docs/04-sprint-plan.md`](docs/04-sprint-plan.md), Sprint 0

## Stack (geplant)

Python · FastAPI · SQLite · APScheduler · Claude API · Microsoft Graph · Salesforce REST · Clay.com · Docker · Hetzner VPS · Caddy
