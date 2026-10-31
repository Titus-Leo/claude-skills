# Plugins (Benutzerebene, gelten in allen Repos)

Marketplaces:
- `titus-mods` – dieses Repo (`.claude-plugin/marketplace.json`, Mods unter `mods/`)
- `ponytail` – `DietrichGebert/ponytail`

Eigene Mods (`mods/`):
- `planung-teuer@titus-mods` – starkes Modell plant, günstiges setzt um
- `kosten-qualitaet@titus-mods` – günstig bauen, stark prüfen
- `github-minuten@titus-mods` – Pushes/Merges bündeln, CI sparen
- `uebergabe-mod@titus-mods` – Leiste ab drei geänderten Dateien: „Übergabe“ startet /uebergabe

Fremd:
- `ponytail@ponytail` – knapper Code, Band mit Kosten/Tokens

Konto-Plugins (claude.ai-Katalog, gelten lokal und in der Cloud, nichts zu kopieren):
- `github` (offizieller GitHub-MCP), `searchfit-seo`, `marketing`, `design`, `figma`, `anthropic-skills`

Nur lokal (Desktop-PC, nicht Cloud):
- `voicestudio` MCP – lokale TTS/Klonen (debpalash/VoiceStudio, AGPL), App muss laufen: `claude mcp add --transport http --scope user voicestudio http://localhost:3900/mcp/`

Hinweis: Die Mods lagen zuerst im Repo `titus-leo/automatisierung` (`tools/claude-mods/`, Marktplatz `steve-mods`).
Seit 31.10.2026 ist dieses Repo die Quelle; die Kopie dort ist nur noch Referenz.
