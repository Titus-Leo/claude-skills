#!/usr/bin/env bash
# Richtet Claude (lokal oder Cloud-Umgebung) komplett ein: Skills, Plugins, globale CLAUDE.md.
# Als Setup-Skript der Claude-Code-Cloud-Umgebung eintragen:
#   curl -fsSL https://raw.githubusercontent.com/Titus-Leo/claude-skills/main/setup.sh | bash
# (Repo ist privat: dafuer braucht die Umgebung GitHub-Zugriff, sonst git clone + bash setup.sh.)
set -u
add() { npx -y skills add "$@" -g -y || echo "WARN: $* fehlgeschlagen"; }

# Alle eigenen Skills aus diesem Repo (skills/) direkt nach ~/.claude/skills
SRC="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd)"
if [ ! -d "$SRC/skills" ]; then
  SRC="$(mktemp -d)"; git clone --depth 1 https://github.com/Titus-Leo/claude-skills.git "$SRC" || exit 0
fi
mkdir -p ~/.claude/skills
cp -r "$SRC"/skills/. ~/.claude/skills/
[ -f "$SRC/CLAUDE.md" ] && cp "$SRC/CLAUDE.md" ~/.claude/CLAUDE.md

# Plugins (Benutzerebene)
claude plugin marketplace add titus-leo/automatisierung || echo "WARN: marketplace steve-mods"
claude plugin marketplace add DietrichGebert/ponytail || echo "WARN: marketplace ponytail"
for p in planung-teuer@steve-mods kosten-qualitaet@steve-mods github-minuten@steve-mods ponytail@ponytail; do
  claude plugin install "$p" --scope user || echo "WARN: $p fehlgeschlagen"
done

# Zusaetzlich aktuelle Upstream-Versionen der Fremd-Skills
add Leonxlnx/taste-skill
add vercel-labs/agent-skills --skill web-design-guidelines
add microsoft/playwright-cli --skill playwright-cli
add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
add img2threejs/img2threejs
