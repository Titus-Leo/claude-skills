---
name: uebergabe
description: Sitzungsende: arbeitsstand.md aktualisieren, Wissensgraph (graphify) nachziehen, offene Punkte festhalten. Trigger: /uebergabe, "Übergabe", "Sitzung abschließen".
---

# /uebergabe

Ziel: Die nächste Sitzung (lokal oder Cloud) kann ohne Rückfragen weiterarbeiten.

1. `git status --short` und `git log --oneline -10` lesen. Nichts committen, was der Nutzer nicht freigegeben hat.
2. `arbeitsstand.md` im Repo-Root anlegen oder ersetzen, maximal 40 Zeilen, nur diese Abschnitte:
   - **Stand** (Datum): was fertig ist, was läuft.
   - **Nächste Schritte**: 3–7 konkrete Punkte mit Dateipfaden.
   - **Offen / Risiken**: Entscheidungen, die der Nutzer treffen muss; ungetestete Änderungen.
   - **Befehle**: wie man baut, testet, startet (nur falls nicht in README/CLAUDE.md).
   Alten Inhalt nicht anhängen, sondern ersetzen; Historie liegt in git.
3. Wenn `graphify-out/` existiert: `/graphify . --update` ausführen, damit der Graph die geänderten Dateien kennt. Wenn nicht, nichts bauen.
4. Dem Nutzer in maximal 5 Zeilen sagen: was in arbeitsstand.md steht, ob uncommittete Änderungen bleiben, ob der Graph aktualisiert wurde.
