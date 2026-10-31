# claude-skills

Zentrale Ablage für alles, was Claude bei Titus lokal nutzt, damit es in jeder Cloud-Sitzung verfügbar ist.

- `skills/` – alle globalen Skills (Kopie von `~/.claude/skills`)
- `CLAUDE.md` – globale Anweisungen (Kopie von `~/.claude/CLAUDE.md`)
- `plugins.md` – genutzte Plugins und Marketplaces
- `setup.sh` – installiert alles (Skills, Plugins, CLAUDE.md); als Setup-Skript der Cloud-Umgebung eintragen

Regel: Wird lokal ein Skill, Plugin oder eine globale Anweisung hinzugefügt, kommt es auch hierher.
Nie hierher: `.credentials.json`, `.claude.json`, API-Keys und Tokens.
