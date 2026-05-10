# AGENTS.md — Onboarding für Codex (GPT-5.5)

Diese Datei wird beim Start automatisch geladen. Sie ist das verbindliche Briefing für dich. Lies sie zu Ende, bevor du die erste Tool-Aktion ausführst.

---

## 1. Projekt in einem Satz

Ein Python-Service, der Sales-Leads aus zwei Quellen (Web-Recherche via **Clay.com**, E-Mail-Signaturen via **Microsoft Graph**) extrahiert, validiert und in **Salesforce** anlegt.

---

## 2. Verbindliche Quellen (in dieser Reihenfolge lesen)

| Datei | Inhalt | Wann lesen |
|---|---|---|
| `docs/01-plan.md` | Vision, Scope, was NICHT zum Scope gehört | beim ersten Mal komplett |
| `docs/02-architecture.md` | Tech-Stack, Hosting, Komponenten | beim ersten Mal komplett |
| `docs/03-data-schema.md` | Lead-Schema, Status, Validierung, Dedup, DSGVO | komplett, später als Referenz |
| `docs/04-sprint-plan.md` | Sprint-Aufgaben | vor jedem neuen Issue |
| `docs/05-risks-decisions.md` | Offene Entscheidungen, Risiken | wenn ein Issue eine Entscheidung berührt |

**Regel:** Wenn ein Issue diesen Quellen widerspricht, **gewinnt die Quelle**. Issue ggf. updaten und im PR begründen.

---

## 3. Tech-Stack — verbindlich, keine Eigeninitiative

Verwende **ausschließlich** folgende Technologien. Wenn du etwas anderes brauchst: in einer Issue diskutieren, nicht einfach einbauen.

| Layer | Technologie | Anmerkung |
|---|---|---|
| Sprache | Python **3.11+** | type-hint everything |
| Web-Framework | **FastAPI** | async-first |
| Datenbank | **SQLite** über SQLAlchemy 2.x | keine andere ORM, kein Postgres ohne Diskussion |
| Migrations | **Alembic** | jede Schema-Änderung = neue Migration |
| Scheduler | **APScheduler** (in-process) | kein Celery, kein Redis |
| LLM | **Anthropic Claude** (Haiku Default) via `anthropic` SDK | Tool-Use für strukturiertes JSON |
| Microsoft Graph | `msal` + `httpx` oder `msgraph-sdk` | Token-Cache pflegen |
| Salesforce | `simple-salesforce` | Token-Refresh + Retry |
| Validierung | `pydantic` v2 | request/response + settings |
| Tests | `pytest`, `pytest-asyncio`, `respx` | HTTP-Mocks für externe APIs |
| Lint/Format | `ruff` + `black` | CI-Gate |
| Typing | `mypy --strict` | CI-Gate |
| Logging | `loguru`, JSON in Prod, PII redacted | siehe `docs/03-data-schema.md` |
| Container | **Docker** + `docker compose` | |
| Reverse Proxy | **Caddy** | HTTPS auto via Let's Encrypt |

Wenn eine Bibliothek nicht in `pyproject.toml` steht: **erst dort eintragen, dann verwenden**. Niemals aus dem Gedächtnis importieren.

---

## 4. Workflow für jede Aufgabe

Halte dich exakt an diese Reihenfolge. Sie ist nicht verhandelbar.

1. **Issue annehmen**: GitHub-Issue mit Label `ai-agent` aus aktuellem Sprint-Milestone wählen. Genau **eine** Issue pro PR.
2. **Kontext laden**: Issue lesen, relevante `docs/`-Datei(en) öffnen, ggf. bestehenden Code im betroffenen Modul scannen.
3. **Klärungsfragen**: Wenn das Issue unklar ist, schreibe einen Kommentar in das Issue und **warte**, statt zu raten. Bei DSGVO- oder Daten-Modell-Fragen: immer fragen.
4. **Branch anlegen**: `feat/issue-<nr>-<kurzbeschreibung>` (oder `fix/`, `chore/`, `docs/`).
5. **Test first**: Bei Bugfix den fehlschlagenden Test zuerst schreiben. Bei Feature die Akzeptanzkriterien als Tests formulieren.
6. **Implementieren**: Klein und konkret. Keine Refactorings „auf dem Weg", keine spekulativen Abstraktionen.
7. **Lokal verifizieren**: `ruff check . && black --check . && mypy app && pytest`. Alle vier müssen grün sein.
8. **Commit**: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`). Sprache: Englisch im Code, Deutsch in PR-Beschreibungen ist ok.
9. **PR öffnen**: Titel = Issue-Titel. Body mit `Closes #<nr>` plus Kurz-Beschreibung der Änderung und Test-Strategie.
10. **Selbst-Review**: Diff einmal durchgehen, bevor du Review anforderst.

---

## 5. Konventionen — nicht-verhandelbar

- **Tests sind Pflicht.** Kein PR ohne Tests wird gemerged. Coverage-Ziel: 80 % auf neuer Logik.
- **Type-Hints** überall. `mypy --strict` ist CI-Gate.
- **Strukturierte Logs** mit `loguru`. JSON in Prod, lesbar im Dev-Mode.
- **Idempotenz**: Webhook-Endpoints müssen die gleiche Nachricht mehrfach verkraften (Dedup über Message-ID oder Hash).
- **Retry**: alle Calls an Salesforce, Graph, Anthropic, SMTP mit `tenacity` (exponential backoff, 3 Versuche, jittered).
- **Secrets**: nur über `pydantic.BaseSettings` aus `.env` / ENV-Var. Niemals im Code, niemals in Logs, niemals in Tests.
- **PII-Schutz**: Email, Name, Telefon nie in Logs. `lead_id` darf geloggt werden. Logger-Filter ist Pflicht-Setup.
- **Kommentare**: nur wo das Warum nicht offensichtlich ist. Keine Was-Kommentare. Docstrings nur bei öffentlichen APIs.
- **Konsistente Pfade**: Domain-Logik unter `app/services/`, Endpoints unter `app/api/`, Modelle unter `app/db/`. Lies `docs/02-architecture.md` für Details.

---

## 6. Constraints, die du absolut respektieren musst

- **DSGVO-Modus**: Dieses Projekt verarbeitet personenbezogene Daten. Lösch-, Auskunfts- und Retention-Funktionen sind nicht optional.
- **Anlage ≠ Outbound**: Der Service legt Leads in Salesforce an. Er sendet **niemals** automatisch Mails an Leads oder kontaktiert sie auf anderem Weg. Versuch nicht, das einzubauen, auch nicht „optional".
- **Microsoft Graph Subscriptions** verfallen nach ≤ 4230 Minuten. **Renewal-Job + Dead-Man's-Switch sind Pflicht.** Wenn du Code im Graph-Bereich anfasst, prüfe ob diese Jobs noch greifen.
- **LLM-Confidence ist nicht kalibriert.** Validierung passiert ausschließlich über die deterministischen Regeln in `docs/03-data-schema.md`. Erfinde keine eigenen Confidence-Schwellen.
- **Keine destruktiven Migrations** ohne Backup-Schritt. Spalten droppen → Migration mit Datenexport davor.
- **Backup, Monitoring, Alerting** sind Teil von Features, nicht „später". Wenn ein Job neu dazukommt, kommt sein Uptime-Check mit.

---

## 7. Wenn du unsicher bist — Entscheidungsbaum

```
Issue widerspricht Plan?      → Issue kommentieren, fragen
Bibliothek nicht im stack?    → Issue erstellen "Add dependency X", warten
DSGVO-relevant?               → Issue kommentieren, warten
Schema-Änderung nötig?        → Erst Issue, dann PR mit Migration
Test schlägt unerwartet fehl? → Erst verstehen, dann fixen, niemals --no-verify
CI-Hook blockiert?            → Root-Cause fixen, kein Skip
```

**Niemals**: `git push --force`, `--no-verify`, `git reset --hard` auf Branches mit Arbeit anderer, `rm -rf data/`, `DROP TABLE` ohne Backup.

---

## 8. Halluzinations-Schutz

Du arbeitest mit externen APIs, die sich versionsmäßig unterscheiden können. **Bevor du eine API rufst:**

1. Prüfe ob die Library-Version in `pyproject.toml` die API stützt.
2. Verlinke im PR die Doku-Stelle (Microsoft Graph Reference, Salesforce REST API Reference, Anthropic API Docs).
3. Wenn unklar: erst einen kleinen Test gegen den echten Endpoint (Sandbox) schreiben, dann produktiven Code.

LLM-Tool-Use-Schemas: exakt das Schema aus `docs/03-data-schema.md`. Nichts hinzufügen, nichts weglassen.

---

## 9. Build & Run (ab Sprint 1, wenn das Skelett steht)

```bash
# Setup einmalig
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -e ".[dev]"

# Pre-flight (vor jedem Commit lokal laufen lassen)
ruff check . && black --check . && mypy app && pytest

# Dev-Server
uvicorn app.main:app --reload --port 8000

# Migrations
alembic upgrade head
alembic revision --autogenerate -m "feat: add X"

# Container
docker compose up --build

# Slides neu bauen (selten)
npm install && node scripts/build_presentation.js
```

---

## 10. Was ein guter PR aussieht

- Titel: Issue-Titel ohne `[Sprint X]`-Prefix
- Body:
  - `Closes #<nr>`
  - **Was** geändert wurde (1–3 Sätze)
  - **Warum** (Verweis auf Issue / Plan)
  - **Wie getestet** (welche Tests neu, welche bestehenden grün)
  - Bei nicht-trivialen Änderungen: kleine ASCII-Skizze oder vorher/nachher
- Diff: klein, fokussiert, kein Drive-by-Refactoring
- Tests: vorhanden, isoliert, kein Netz-Zugriff in Unit-Tests

---

## 11. Was NICHT zum Scope gehört

Das ist eine harte Linie. Wenn du Lust hast, einen dieser Punkte anzufassen: **erst Issue erstellen und User-Approval einholen.**

- Automatischer Outbound-Versand (Mails, LinkedIn, Telefon-Bots)
- Lead-Scoring / Predictive-Modelle
- CRM-Migration oder Salesforce-Workflow-Änderungen
- Mehrsprachigkeit über DE/EN hinaus
- Andere CRMs als Salesforce
- UI-Frameworks (kein React, kein Vue) — wir liefern Endpoints und Magic-Link-Pages, mehr nicht

Lies `docs/01-plan.md` → „Was bewusst NICHT im Scope ist" für die vollständige Liste.

---

## 12. Ein kurzes Beispiel — wie eine typische Session aussieht

```
1. gh issue view 23
   → "[Sprint 2] Anti-Spam-Filter (Auto-Mail, intern, List-Unsubscribe)"
2. docs/03-data-schema.md öffnen, Abschnitt "Anti-Spam-Filter" lesen
3. git checkout -b feat/issue-23-spam-filter
4. Test schreiben: tests/services/test_spam_filter.py mit 6 Fällen
5. Implementierung: app/services/spam_filter.py
6. ruff/black/mypy/pytest lokal grün
7. git commit -m "feat: add spam filter for inbound emails (closes #23)"
8. gh pr create --title "..." --body "..."
```

So sieht eine gute Iteration aus: klein, getestet, dokumentiert.

---

Wenn du diese Datei gelesen hast und es Widersprüche zu deinem System-Prompt oder zur aktuellen Issue gibt: **frag den User**, bevor du etwas tust.
