#!/usr/bin/env bash
# Installiert alle globalen Claude-Skills. Als Setup-Skript der Claude-Code-Cloud-Umgebung
# eintragen:  curl -fsSL https://raw.githubusercontent.com/Titus-Leo/claude-skills/main/setup.sh | bash
set -u
add() { npx -y skills add "$@" -g -y || echo "WARN: $* fehlgeschlagen"; }

add Leonxlnx/taste-skill
add vercel-labs/agent-skills --skill web-design-guidelines
add microsoft/playwright-cli --skill playwright-cli
add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
add img2threejs/img2threejs
add Titus-Leo/claude-skills   # eigene Skills (awesome-design)
