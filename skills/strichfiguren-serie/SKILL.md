---
name: strichfiguren-serie
description: "Produziert Folgen einer interaktiven Kurzvideo-Serie mit 2D-Strichfiguren in Remotion (Du-Perspektive, Zuschauer stimmen am Ende per Kommentar ab), z. B. 'The Water Rises'. Skript, Stimmen (ElevenLabs), Wortzeiten (Whisper), Szene (Remotion), Abnahme, Auslieferung. Trigger: 'neue Folge', 'Part N', 'Folge N mit <Wahl>', 'mach weiter mit der Serie', 'Folge anpassen'."
---

# Strichfiguren-Serie: eine Folge produzieren

Ziel: Der Nutzer sieht nur fertige, selbst abgenommene Folgen. Keine Schwächenlisten zur Freigabe.

## Voraussetzungen

- Projekt-Repo `VideoGenerierung` (Remotion-Projekt `remotion/`, Pipeline `pipeline/`, `scripts/angleichen.sh`). Zuerst lesen: `CLAUDE.md`, `arbeitsstand.md`, die Serien-Bibel (`docs/SERIE-*.md`, enthält Welt, Figuren, Stimmen-IDs, Bogen, Konsequenzen-Register, gebaute Zweige).
- ElevenLabs-Konnektor mit den Tools `creative_generate_speech`, `creative_generate_in_flow`, `creative_get_flow_run_status`, `creative_get_generations`, `creative_list_voices`.
- ffmpeg, Node, lokales whisper.cpp (`.whisper/`).
- Kein Repo-Zugang? Dann zuerst danach fragen; ohne die Bausteine (Gebäudeschnitt, Dach, Figuren) lässt sich der Look nicht reproduzieren.

## Rollen (Kosten und Qualität)

- Hauptsitzung (starkes Modell): Skript-Entwurf, Abnahme, Wortzeit-Korrektur, Auslieferung. Tippt keine Szenen selbst.
- Skript-Gegenlesung: Agent mit `model: fable`; bei Limit `opus`. Unverankert briefen (Welt, Vorgaben, Entwurf, eigene Zweifel).
- Ton: Agent mit `model: sonnet`.
- Szene: Agent mit `model: opus`, direkt im Checkout (kein Worktree: Assets-Junction bricht den Bundler). Ton- und Szenen-Agent laufen parallel; die Szene legt Schnitte erst, wenn die Wortzeiten stehen.
- Nacharbeit an einer Szene immer per SendMessage an denselben Szenen-Agenten (kennt den Code). Agenten, die gemeinsame Dateien (`flood/`, `zombie/people.tsx`) ändern, nacheinander laufen lassen.
- Vorlagen für alle Briefings: `references/briefs.md`.

## Ablauf je Folge

1. **Stand lesen**: Bibel, Konsequenzen-Register (fällige Auszahlungen!), Tabelle "Gebaute Folgen und Wahlen", letzte Folge (`episodes/<id>/episode.json`, Szene `remotion/src/scenes/<id>.tsx`).
2. **Skript** (Englisch, Dokumente Deutsch): 20-27 Zeilen, Ziel 65-75 s, sicher über 60 s.
   - Sekunde 0 packend, Spitze etwa alle 8 s, eine Bindungsszene, Physik und Logik stimmen.
   - Figurenzeilen kurz und zügig, keine "..." und keine Gedankenstriche (erzeugen Pausen).
   - Tags in eckigen Klammern sparsam, SFX als eigene Zeilen (`character: "sfx"`).
   - Mindestens ein Eintrag aus dem Konsequenzen-Register wird ausgezahlt (ab Folge 4).
   - Ende: Wahl aus zwei Wörtern, die beide echte Kosten haben; beide Argumente möglichst aus dem Mund einer Figur mit Autorität.
   - Neue Konsequenzen sofort ins Register.
3. **Gegenlesen lassen** (Vorlage A). Übernehmen, was trägt; Widersprüche zu früheren Folgen nicht übernehmen.
4. **episode.json anlegen**: aus der Vorfolge kopieren (Figuren, Musik), `id`, `title`, `hookText`, `scene.bg = <id>`, `lines`. Dann `npm run validate -- <id>`.
5. **Ton** (Vorlage B): je Zeile genau ein Take, `eleven_v4`.
   - Pausen innerhalb der Zeilen auf höchstens 0,12 s kürzen.
   - atempo: Erzähler 1.15, Figuren 1.10.
   - Lautheit: `bash scripts/angleichen.sh episodes/<id>/assets` (-16 LUFS), Musik kopieren.
   - Wortzeiten: `npm run build -- <id> --only=audio`.
6. **Wortzeiten selbst prüfen**: Wörter je Zeile gegen `silencedetect` (-40 dB und -32 dB, d=0.06) halten.
   - Typische Whisper-Fehler: alle Wörter in den Anfang gequetscht, Wort nach einer Pause zu spät oder zu früh.
   - Von Hand in `shots[0].assets.lines[i].words` korrigieren und im Arbeitsstand vermerken: danach NIE wieder `--only=audio`.
   - Verschlusslaute (p, t, k) erzeugen Mini-Stillen innerhalb eines Worts, das ist kein Fehler.
7. **Szene** (Vorlage C). Danach Selbstprüf-Schleife (Vorlage D), bis nichts Wesentliches bleibt.
8. **Abnahme durch die Hauptsitzung**: Kontaktbogen der ganzen Folge (`fps=1,scale=180:320,tile=12x7`) und enge Bögen an kritischen Stellen ansehen.
   - Geprüft wird alles aus "Qualitätsregeln".
   - Jeder Mangel geht als konkrete Liste zurück an den Szenen-Agenten, nicht an den Nutzer.
9. **Kontinuität**: Ändert sich ein Baustein, den mehrere Folgen nutzen, die anderen Folgen pixelgleich halten (Kontroll-Stills vorher/nachher) oder bewusst mit anpassen und neu rendern. Folgen, die aufeinander folgen, zeigen dasselbe Haus, dieselben Türen und dasselbe Dach, und der Wasserstand läuft lückenlos weiter.
10. **Ausliefern**: `npm run build -- <id> --only=render`, dann `ffmpeg -i episodes/<id>/out/<id>.mp4 -c:v libx264 -crf 25 -preset slow -c:a copy out/<id>-<titel>.mp4`, per SendUserFile schicken. Kurz sagen, was drin ist und was nicht prüfbar war (Ton wird nie angehört).
11. **Festhalten**: Arbeitsstand, Bibel-Tabelle "Gebaute Folgen", Register. Commit nur auf Wunsch, Push nur auf Wunsch.

## Qualitätsregeln (Feedback des Auftraggebers)

- **Länge**: über 60 s (TikTok-Auszahlung).
- **Schnitt**: harte Schnitte auf Wortanfängen, keine Einstellung unter 30 Frames (1 s), keine kurzen Einschübe zwischen zwei Bildern desselben Ortes; Bewegung lieber per Kamerafahrt oder Punch-in. Bild nie vor der Stimme, Ton = Bild auf den Frame.
- **Sprechen**: zügig, keine dramatischen Sprechpausen, aber mit echter Emotion (Angst, Schreien an Pointen, Weinen), nie gelassen vorgelesen. Kein Funk- oder Walkie-Talkie-Filter auf normalen Stimmen.
- **Ton**: Effekte nie lauter als die Stimme; Geräuschteppiche bei etwa -30 LUFS unter der Sprache. Jedes Geräusch passt zu dem, was man in diesem Moment sieht.
- **Musik**: Hintergrundmusik läuft unter der Folge, wird unter Sprache leiser und stoppt hart an Pointen (Stille als Effekt).
- **Pointen-Sync**: Ein Pointen-Wort (Schrei, Name, Knall) bekommt eine eigene Zeile. Der Bild-Trigger wird gegen den Pegelsprung in der Tonspur geprüft, nicht nur gegen Whisper. Das Bild kommt nie vor der Stimme (früherer Fehler: Bild "FIRE" vor dem Ruf).
- **Welt**: kleine Figuren in großer, detaillierter, echter Welt (1 m = 170 px, Erwachsener etwa 300 px), nie grauer Hintergrund, nichts schwebt, Proportionen stimmen. Feste, wiederverwendbare Schauplätze; Innenszenen im Gebäudeschnitt.
- **Physik und Logik**:
  - Wasser kommt von unten, steht auf einem Stockwerk überall gleich hoch, steigt nur.
  - Türen halten kein Wasser, kein Luftpolster in Räumen mit Fenstern.
  - Jeder Ortswechsel ist im Bild nachvollziehbar (z. B. Tür sichtbar aufgehen und durchschwimmen lassen, nicht wegschneiden).
- **Figuren**: Arme knicken natürlich (Unterarm nie gegen den Ellbogen); "You" trägt immer die bunte Propellermütze.
- **Look-Fragen** (Accessoires, Farben, Stil): nie raten und komplett rendern, sondern 3-4 Varianten als Testbild (nah und Totale) zeigen und wählen lassen. Der Auftraggeber mag es verspielt und lustig, nicht "cool".
- **Abstimmung ehrlich und durchgehend**: Abgestimmt wird in jeder Folge, nie nur gelegentlich. Keine erfundenen Prozentzahlen; Zweige, die vor der Auszählung gebaut wurden, kennzeichnen.
- **Nicht auf Vorrat produzieren**: Vorab nur den gemeinsamen Teil der nächsten Folge bauen, den Abzweig erst nach der Auszählung, außer der Auftraggeber zieht einen Zweig ausdrücklich vor.
- **Inhalt**: keine sexuellen Darstellungen, keine fremden Meme-Figuren, kein Blut, Tod nur angedeutet, Kinder nie in gezeigter Lebensgefahr.
- **Konsequenzen**: Jede Wahl und jeder Verlust kommt ins Register und zahlt sich 2-4 Folgen später aus.

## Neue Serien, Formate, Storyrichtungen

- Laufende Serienfolgen: direkt bauen und erst das Fertige zeigen.
- Neue Serie, neues Format oder neue Storyrichtung:
  1. Zuerst Thema oder Skript in Stichpunkten zur Freigabe zeigen ("go oder nicht").
  2. Dann eine kurze Probe von 15-20 s bauen.
  3. Erst danach die ganze Folge.
- Die Welt so bauen, dass das Problem bleibt und mehrere Staffeln trägt (z. B. das Tal bleibt ein See).
- Vorlieben für weitere Formate:
  - Humor und echte Persönlichkeit.
  - Historische Momente, in denen Figuren reden wie heute; absichtlich dumme Erklärvideos.
  - 2D-Strichfiguren statt Fotorealismus, die Umgebung reich und gut sichtbar.
- Tabu: keine Voyeur-Motive (z. B. Nachbar beim Duschen), keine Zombies mehr.

## Kosten und Git

- Leitsatz: so wenig wie möglich, so viel wie nötig, damit die Qualität richtig gut wird.
- Credits sparen: ein Take je Zeile, vorhandene Assets nie neu erzeugen.
- Kleine Pakete, Agenten bekommen Dateiliste und Abnahmekriterien.
- CI-Läufe bündeln; vor jedem Push sagen, der wievielte er ist.
