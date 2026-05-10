#!/usr/bin/env bash
#
# create-issues.sh
# Legt Labels, Milestones und alle Sprint-Issues im GitHub-Repo an.
#
# Voraussetzungen:
# - gh CLI installiert und authentifiziert (`gh auth login`)
# - im Repo-Verzeichnis ausgeführt (gh erkennt das Repo automatisch)
# - oder REPO-Variable setzen: REPO=user/repo bash scripts/create-issues.sh
#
# Idempotent: existierende Labels / Milestones werden übersprungen.

set -euo pipefail

REPO="${REPO:-}"
GH_ARGS=()
if [[ -n "$REPO" ]]; then
  GH_ARGS+=(--repo "$REPO")
fi

echo "==> Labels anlegen"
declare -A LABELS=(
  ["sprint-0"]="d9d9d9"
  ["sprint-1"]="bfdbfe"
  ["sprint-2"]="bfdbfe"
  ["sprint-3"]="bfdbfe"
  ["sprint-4"]="bfdbfe"
  ["sprint-5"]="bfdbfe"
  ["human"]="fde68a"
  ["ai-agent"]="86efac"
  ["infra"]="c4b5fd"
  ["dsgvo"]="fca5a5"
  ["blocker"]="ef4444"
  ["docs"]="d1d5db"
)
for name in "${!LABELS[@]}"; do
  color="${LABELS[$name]}"
  gh label create "$name" --color "$color" "${GH_ARGS[@]}" 2>/dev/null \
    || echo "   Label '$name' existiert bereits, überspringe."
done

echo "==> Milestones anlegen"
MILESTONES=(
  "Sprint 0 — Voraussetzungen"
  "Sprint 1 — Skelett & Salesforce-Sync"
  "Sprint 2 — Outlook-Pipeline"
  "Sprint 3 — Clay-Pipeline"
  "Sprint 4 — Human-Review-Flow"
  "Sprint 5 — Go-Live & Monitoring"
)

# Repo-Slug ermitteln (für gh api)
if [[ -z "$REPO" ]]; then
  REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
fi

for title in "${MILESTONES[@]}"; do
  existing=$(gh api "repos/$REPO/milestones" --jq ".[] | select(.title==\"$title\") | .number" 2>/dev/null || true)
  if [[ -n "$existing" ]]; then
    echo "   Milestone '$title' existiert (#$existing), überspringe."
  else
    gh api "repos/$REPO/milestones" -f title="$title" >/dev/null
    echo "   Milestone '$title' angelegt."
  fi
done

# ----------------------------------------------------------------------
# Helper: issue anlegen
# usage: mk_issue "Titel" "Body" "milestone-title" "label1,label2,..."
# ----------------------------------------------------------------------
mk_issue () {
  local title="$1"
  local body="$2"
  local milestone="$3"
  local labels="$4"

  gh issue create \
    "${GH_ARGS[@]}" \
    --title "$title" \
    --body "$body" \
    --milestone "$milestone" \
    --label "$labels" \
    >/dev/null
  echo "   Issue: $title"
}

# Standard-Body mit Kontext-Verweisen
ctx_body () {
  cat <<EOF
$1

**Kontext:**
- Plan: \`docs/01-plan.md\`
- Architektur: \`docs/02-architecture.md\`
- Schema: \`docs/03-data-schema.md\`
- Sprint-Plan: \`docs/04-sprint-plan.md\`

**Akzeptanzkriterien:**
- [ ] Implementierung gemäß Plan
- [ ] Tests vorhanden und grün
- [ ] CI grün
- [ ] Code Review ok
EOF
}

echo "==> Issues anlegen"

# -------------------- Sprint 0 --------------------
SP0="Sprint 0 — Voraussetzungen"
mk_issue "[Sprint 0] DSGVO-Freigabe einholen" "$(ctx_body 'B2B-Lead-Datenhaltung freigeben lassen, klare Trennung Anlage ≠ Outbound dokumentieren.')" "$SP0" "sprint-0,human,dsgvo,blocker"
mk_issue "[Sprint 0] Azure App Registration anlegen" "$(ctx_body 'Scope Mail.Read auf Sales-Mailbox, Admin-Consent durch IT.')" "$SP0" "sprint-0,human,infra,blocker"
mk_issue "[Sprint 0] Salesforce Sandbox + Custom Fields" "$(ctx_body 'Custom Fields: Lead_Source_Detail__c, AI_Validation_Score__c, Extracted_At__c, Source_Raw_Excerpt__c.')" "$SP0" "sprint-0,human,blocker"
mk_issue "[Sprint 0] Clay.com Account + erste Discovery-Liste" "$(ctx_body 'Suchkriterien für Pilot-Branche definieren.')" "$SP0" "sprint-0,human"
mk_issue "[Sprint 0] VPS bestellen + DNS" "$(ctx_body 'Hetzner CX22, Subdomain z.B. leads.firma.de.')" "$SP0" "sprint-0,human,infra"
mk_issue "[Sprint 0] GitHub-Repo + AI-Agent-Zugänge einrichten" "$(ctx_body 'Repo angelegt, Claude Code + Codex haben Zugriff.')" "$SP0" "sprint-0,human"
mk_issue "[Sprint 0] Anthropic API Key + Budget-Limit" "$(ctx_body 'Production-Tier-Key, monatliches Budget-Cap setzen.')" "$SP0" "sprint-0,human"
mk_issue "[Sprint 0] Entscheidungen treffen: Mailbox, Pilot-Branche, Review-Verteiler" "$(ctx_body 'Output für Sprint 2 + 3.')" "$SP0" "sprint-0,human,blocker"

# -------------------- Sprint 1 --------------------
SP1="Sprint 1 — Skelett & Salesforce-Sync"
mk_issue "[Sprint 1] FastAPI-Projekt bootstrappen" "$(ctx_body 'Struktur app/, pyproject.toml, ruff/black/mypy, pytest, GitHub Actions CI.')" "$SP1" "sprint-1,ai-agent"
mk_issue "[Sprint 1] SQLAlchemy-Modell + Alembic-Migrations" "$(ctx_body 'Lead-Modell gemäß docs/03-data-schema.md.')" "$SP1" "sprint-1,ai-agent"
mk_issue "[Sprint 1] Pydantic-Schemas (request/response)" "$(ctx_body 'Geteilt zwischen Endpoints.')" "$SP1" "sprint-1,ai-agent"
mk_issue "[Sprint 1] Salesforce-Client mit OAuth2, Token-Refresh, Retry" "$(ctx_body 'simple-salesforce, Retry-Decorator mit Backoff.')" "$SP1" "sprint-1,ai-agent"
mk_issue "[Sprint 1] Sync-Job APScheduler alle 5 Min" "$(ctx_body 'status=new OR approved → SF.Lead.create, SF-ID zurückschreiben.')" "$SP1" "sprint-1,ai-agent"
mk_issue "[Sprint 1] End-to-End Integration-Test mit Mock-SF" "$(ctx_body 'respx oder vergleichbar.')" "$SP1" "sprint-1,ai-agent"
mk_issue "[Sprint 1] Dockerfile + docker-compose mit Caddy" "$(ctx_body 'HTTPS via Lets Encrypt, Health-Endpoint /healthz.')" "$SP1" "sprint-1,ai-agent,infra"
mk_issue "[Sprint 1] SF-Sandbox auf VPS deployen + manueller Test" "$(ctx_body 'Dummy-Lead per curl, prüfen ob in SF-Sandbox.')" "$SP1" "sprint-1,human"

# -------------------- Sprint 2 --------------------
SP2="Sprint 2 — Outlook-Pipeline"
mk_issue "[Sprint 2] Microsoft Graph Client (OAuth2, Token-Cache)" "$(ctx_body 'msgraph-sdk oder direkt httpx + msal.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Webhook-Endpoint /ingest/email mit Validation-Handshake" "$(ctx_body '10-Sek-Response auf validationToken Pflicht.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Subscription-Anlage-Skript" "$(ctx_body 'scripts/setup_graph_subscription.py, einmalig ausführbar.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Renewal-Job alle 48 h + Alert bei Fehler" "$(ctx_body 'Graph-Sub läuft nach 4230 Min ab.')" "$SP2" "sprint-2,ai-agent,blocker"
mk_issue "[Sprint 2] Dead-Mans-Switch: Alert wenn 24 h keine Mail" "$(ctx_body 'Stündlicher Check, Mail-Alert.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Signatur-Extraktor (HTML + Plaintext)" "$(ctx_body 'Heuristik: nach --, letzte N Zeilen.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Claude API Tool-Use für strukturierten JSON-Output" "$(ctx_body 'Schema aus docs/03-data-schema.md.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Anti-Spam-Filter (Auto-Mail, intern, List-Unsubscribe)" "$(ctx_body 'Regeln aus docs/03-data-schema.md.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Deterministische Validierung (Score 0-5)" "$(ctx_body 'Regeln aus docs/03-data-schema.md.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Dedup-Logik mit Update-statt-Insert" "$(ctx_body 'Match auf normalized_email oder domain+lastname.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Tests mit 5 Beispiel-Mails (HTML, Plain, Thread, ohne Sig, mehrsprachig)" "$(ctx_body 'Fixtures in tests/fixtures/emails/.')" "$SP2" "sprint-2,ai-agent"
mk_issue "[Sprint 2] Graph-Subscription auf echter Mailbox aktivieren" "$(ctx_body 'Erst nach erfolgreichem Test.')" "$SP2" "sprint-2,human"
mk_issue "[Sprint 2] Test mit 20 echten Mails aus Archiv" "$(ctx_body 'Genauigkeit messen, Erkenntnisse in Issue dokumentieren.')" "$SP2" "sprint-2,human"
mk_issue "[Sprint 2] Prompt-Iteration nach Test-Ergebnissen" "$(ctx_body 'Folge-Issue aus Test-Run.')" "$SP2" "sprint-2,ai-agent"

# -------------------- Sprint 3 --------------------
SP3="Sprint 3 — Clay-Pipeline"
mk_issue "[Sprint 3] Clay-Tabelle final aufsetzen" "$(ctx_body 'Enrichment-Spalten gemäß Lead-Schema.')" "$SP3" "sprint-3,human"
mk_issue "[Sprint 3] Webhook-Endpoint /ingest/clay mit HMAC-Verification" "$(ctx_body 'Shared Secret aus ENV.')" "$SP3" "sprint-3,ai-agent"
mk_issue "[Sprint 3] Mapper Clay-Felder → Lead-Schema" "$(ctx_body 'Mit Tests gegen Beispiel-Payloads.')" "$SP3" "sprint-3,ai-agent"
mk_issue "[Sprint 3] Clay-Webhook auf VPS-Endpoint konfigurieren" "$(ctx_body 'In Clay-UI.')" "$SP3" "sprint-3,human"
mk_issue "[Sprint 3] Test-Run mit 100 Leads + Stichprobe 20 reviewen" "$(ctx_body 'Qualität validieren, Erkenntnisse in Issue.')" "$SP3" "sprint-3,human"
mk_issue "[Sprint 3] Tuning Mapping basierend auf Stichprobe" "$(ctx_body 'Folge-Issue nach Review.')" "$SP3" "sprint-3,ai-agent"

# -------------------- Sprint 4 --------------------
SP4="Sprint 4 — Human-Review-Flow"
mk_issue "[Sprint 4] Magic-Link-Generator (itsdangerous, 7 T gültig, Replay-Schutz)" "$(ctx_body 'Signiert + DB-Spalte für used_at.')" "$SP4" "sprint-4,ai-agent"
mk_issue "[Sprint 4] Endpoint /review/{token} mit Approve/Reject-HTML" "$(ctx_body 'Mini-HTML, Statuswechsel approved oder rejected.')" "$SP4" "sprint-4,ai-agent"
mk_issue "[Sprint 4] Mail-Versand für neue review-Leads" "$(ctx_body 'Vorschau-Daten + 2 Magic-Links.')" "$SP4" "sprint-4,ai-agent"
mk_issue "[Sprint 4] Sales-Verteiler-Adresse festlegen + Onboarding-Mail" "$(ctx_body 'Anleitung auf 1 Seite.')" "$SP4" "sprint-4,human"

# -------------------- Sprint 5 --------------------
SP5="Sprint 5 — Go-Live & Monitoring"
mk_issue "[Sprint 5] Uptime-Kuma in docker-compose, Checks für Endpoints + Jobs" "$(ctx_body 'Monitoring-Container, eigene Subdomain.')" "$SP5" "sprint-5,ai-agent,infra"
mk_issue "[Sprint 5] Strukturiertes Logging (loguru, JSON in Prod)" "$(ctx_body 'PII redaktion in Logs.')" "$SP5" "sprint-5,ai-agent"
mk_issue "[Sprint 5] Backup-Cron SQLite → Hetzner Storage Box" "$(ctx_body '30 Tage Retention.')" "$SP5" "sprint-5,ai-agent,infra"
mk_issue "[Sprint 5] Alert-Regeln (failed-Push, Dead-Mans-Switch, Renewal-Fail)" "$(ctx_body 'Mail an Dev-Verteiler.')" "$SP5" "sprint-5,ai-agent"
mk_issue "[Sprint 5] Runbook generieren" "$(ctx_body 'Häufige Probleme + Fix-Schritte, in docs/runbook.md.')" "$SP5" "sprint-5,ai-agent,docs"
mk_issue "[Sprint 5] Mini-Dashboard (Leads/Tag, Sync-Rate, Review-Quote)" "$(ctx_body 'Einfache HTML-Seite reicht.')" "$SP5" "sprint-5,ai-agent"
mk_issue "[Sprint 5] Wechsel SF-Sandbox → Produktiv-Credentials" "$(ctx_body 'Mit Dry-Run-Check.')" "$SP5" "sprint-5,human"
mk_issue "[Sprint 5] Schulung Sales-Team (30 Min Walkthrough)" "$(ctx_body 'Foliendeck nutzen, Q&A Slot.')" "$SP5" "sprint-5,human"
mk_issue "[Sprint 5] Soft-Launch + Retro nach Woche 1" "$(ctx_body 'Erhöhte Stichprobenkontrolle.')" "$SP5" "sprint-5,human"

echo
echo "==> Fertig. Übersicht:  gh issue list ${GH_ARGS[*]}"
