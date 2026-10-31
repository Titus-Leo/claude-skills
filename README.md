# claude-skills

Zentrale Ablage für alles, was Claude bei Titus nutzt, damit es in jeder Cloud-Sitzung verfügbar ist.

- `skills/` – globale Skills (Kopie von `~/.claude/skills`), inkl. eigene `/uebergabe` und `/pruefung`
- `CLAUDE.md` – globale Anweisungen (Kopie von `~/.claude/CLAUDE.md`)
- `plugins.md` – Plugins und Marketplaces
- `setup.sh` – installiert Skills, Plugins, CLAUDE.md; als Setup-Skript der Cloud-Umgebung eintragen

## Was wo ankommt

| Art | Lokal | Cloud | Weg |
|---|---|---|---|
| Skills in `skills/` | ja | ja | `setup.sh` |
| Plugins aus `plugins.md` (ponytail, steve-mods) | ja | ja | `setup.sh` |
| Konto-Plugins (github, searchfit-seo, marketing, design, figma, anthropic-skills) | ja | ja | hängen am claude.ai-Konto, nichts zu kopieren |
| Claude in Chrome, eingebauter Browser | ja | nein | brauchen den Desktop |
| Docs-Anbindung | ja | ja | Konto |
| `gh`-CLI in der Cloud | – | nur mit `GITHUB_TOKEN` als Umgebungs-Secret | nie ins Repo |

Regel: Wird lokal ein Skill, Plugin oder eine globale Anweisung hinzugefügt, kommt es auch hierher.
Nie hierher: `.credentials.json`, `.claude.json`, API-Keys, Tokens.
