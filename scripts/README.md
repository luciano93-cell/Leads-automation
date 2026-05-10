# scripts/

| Datei | Zweck |
|---|---|
| `create-issues.sh` | Legt Labels, Milestones und alle Sprint-Issues im GitHub-Repo an. Idempotent — kann mehrfach laufen. |
| `build_presentation.js` | Generiert `docs/presentation.pptx` aus dem JS-Code. |

## create-issues.sh ausführen

Voraussetzung: [gh CLI](https://cli.github.com/) installiert und mit `gh auth login` authentifiziert.

```bash
# Im Repo-Verzeichnis
bash scripts/create-issues.sh

# Oder mit explizitem Repo
REPO=meinorg/lead-automation bash scripts/create-issues.sh
```

Unter Windows mit Git Bash ausführen.

## build_presentation.js ausführen

```bash
# Einmalig: Dependencies installieren (root)
npm install

# Slides bauen
node scripts/build_presentation.js
```

Output landet in `docs/presentation.pptx`.

Falls die Datei in PowerPoint geöffnet ist, schlägt das Schreiben fehl. Erst schließen, dann neu bauen.
