#!/usr/bin/env bash
# Richtet Claude (lokal oder Cloud-Umgebung) ein: Skills, Plugins, globale CLAUDE.md.
# Cloud-Setup-Skript:  git clone https://github.com/Titus-Leo/claude-skills.git && bash claude-skills/setup.sh
# (privates Repo: die Umgebung braucht GitHub-Zugriff; gh-CLI zusätzlich GITHUB_TOKEN als Secret)
set -u
add() { npx -y skills add "$@" -g -y || echo "WARN: $* fehlgeschlagen"; }

SRC="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd)"
if [ ! -d "$SRC/skills" ]; then
  SRC="$(mktemp -d)"; git clone --depth 1 https://github.com/Titus-Leo/claude-skills.git "$SRC" || exit 0
fi
mkdir -p ~/.claude/skills
cp -r "$SRC"/skills/. ~/.claude/skills/
cp "$SRC/CLAUDE.md" ~/.claude/CLAUDE.md

claude plugin marketplace add titus-leo/automatisierung || echo "WARN: marketplace steve-mods"
claude plugin marketplace add DietrichGebert/ponytail || echo "WARN: marketplace ponytail"
for p in planung-teuer@steve-mods kosten-qualitaet@steve-mods github-minuten@steve-mods ponytail@ponytail; do
  claude plugin install "$p" --scope user || echo "WARN: $p fehlgeschlagen"
done
# steve-mods laden nur mit "hooks": {} in hooks/hooks.json (solange das Quell-Repo es nicht hat)
for d in ~/.claude/plugins/cache/steve-mods/*/*/hooks; do
  [ -f "$d/hooks.json" ] && grep -q '"hooks"' "$d/hooks.json" || printf '{ "hooks": {}, "modules": ["./register.ts"] }' > "$d/hooks.json"
done

# Fremd-Skills in aktueller Upstream-Version
add Leonxlnx/taste-skill
add vercel-labs/agent-skills --skill web-design-guidelines
add microsoft/playwright-cli --skill playwright-cli
add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
add img2threejs/img2threejs
add remotion-dev/skills
