---
name: pruefung
description: "Voller Prüflauf vor Commit/PR: Lint, Typen, Tests, Build, Secrets-Scan, Review der Änderung. Trigger: /pruefung, \"prüf das\", \"Prüflauf\", \"alles checken\"."
---

# /pruefung

Ziel: Kein Schritt wird vergessen. Jeder Schritt wird ausgeführt oder mit Grund als übersprungen gemeldet.

1. **Umfang**: `git diff --stat` (uncommitted) bzw. Diff zum Basis-Branch. Nur geänderte Bereiche prüfen, Tests aber vollständig.
2. **Projekt erkennen**: package.json / pyproject.toml / go.mod / Cargo.toml / composer.json / *.csproj. Befehle aus README, CLAUDE.md oder Scripts nehmen, nicht raten.
3. **Lint + Typen**: z.B. `npm run lint`, `tsc --noEmit`, `ruff`, `mypy`, `go vet`. Fehler beheben, nicht abschalten.
4. **Tests**: komplette Suite. Fehlschläge mit Ausgabe zeigen; Tests nur löschen oder lockern, wenn der Nutzer zustimmt.
5. **Build**: Produktions-Build, falls vorhanden.
6. **Secrets**: Diff nach Schlüsseln, Tokens, `.env`-Inhalten durchsuchen. Treffer = Stopp und melden.
7. **Review** (/code-review oder /ponytail-review, falls verfügbar): Logik, Fehlerfälle, Sicherheit an Vertrauensgrenzen, unnötiger Code.
8. **Ergebnis**: Tabelle Schritt → bestanden / Fehler / übersprungen (Grund). Keine Freigabe, solange ein Schritt rot ist.

Keine GitHub-Actions anstoßen; der Lauf passiert lokal bzw. in der Sitzung.
