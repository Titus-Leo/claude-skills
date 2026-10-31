#!/usr/bin/env bash
# Richtet Claude (lokal oder Cloud-Umgebung) ein: Skills, Mods, Plugins, globale CLAUDE.md.
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

claude plugin marketplace add "$SRC" || echo "WARN: marketplace titus-mods"
claude plugin marketplace add DietrichGebert/ponytail || echo "WARN: marketplace ponytail"
for p in planung-teuer@titus-mods kosten-qualitaet@titus-mods github-minuten@titus-mods uebergabe-mod@titus-mods ponytail@ponytail; do
  claude plugin install "$p" --scope user || echo "WARN: $p fehlgeschlagen"
done

# Fremd-Skills in aktueller Upstream-Version
add Leonxlnx/taste-skill
add vercel-labs/agent-skills --skill web-design-guidelines
add microsoft/playwright-cli --skill playwright-cli
add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
add img2threejs/img2threejs
add remotion-dev/skills
add https://github.com/cloudflare/security-audit-skill --skill security-audit
add Jakeschincariol/instagram-agent-skill

# Agent-Reach (YouTube-Transkripte, GitHub, Reddit, X …); nie von PyPI, dort liegt ein fremdes Paket
command -v uv >/dev/null || pip install --user uv
uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip && agent-reach setup || echo "WARN: agent-reach"
