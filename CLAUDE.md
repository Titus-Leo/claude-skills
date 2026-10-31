# Globale Vorgaben (Titus)

- **graphify** (`~/.claude/skills/graphify/SKILL.md`): Codebasis als Wissensgraph; bei Fragen zu Architektur und Abhängigkeiten zuerst `graphify-out/` abfragen statt Dateien breit zu lesen. Trigger: `/graphify`.
- **/uebergabe** am Sitzungsende: `arbeitsstand.md` + Graph aktualisieren. **/pruefung** vor Commit/PR.
- So wenig Code wie möglich bei gleicher Funktion. Keine Erklärkommentare für Menschen; nur knappe Hinweise, die ein späterer Agent braucht (Warum, nicht Was).
- Teure Modelle planen und prüfen, günstige setzen um (Plugins planung-teuer, kosten-qualitaet). CI-Läufe bündeln (github-minuten).
- Installierte Skills und Plugins ungefragt nutzen, sobald die Aufgabe passt (Design: impeccable + design-taste-frontend; Animation: emil-design-eng, improve-animations, apple-design; Video: remotion-*; SEO/GEO: searchfit-seo; Tests im Browser: playwright-cli; Sicherheit: /security-review je Diff, security-audit (Cloudflare) nur vor Meilensteinen, voller Lauf ist teuer). Nicht auf einen Slash-Befehl warten.
- Neue Skills, Plugins oder globale Regeln auch in https://github.com/Titus-Leo/claude-skills eintragen (Cloud-Setup).
