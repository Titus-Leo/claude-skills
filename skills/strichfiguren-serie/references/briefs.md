# Briefing-Vorlagen

Platzhalter in spitzen Klammern ersetzen. Briefe sind die einzige Information des Agenten: Welt, Vorgaben und Dateien immer mitgeben.

## A: Skript-Gegenlesung (model: fable, sonst opus)

```
Du bist Skript-Berater für die TikTok/Reels/Shorts-Serie "<Serie>" (2D-Strichfiguren, Du-Perspektive, Zuschauer stimmen am Ende per Kommentar ab). Prüfe den Entwurf für Folge <N> auf:
(a) Physik und Logik,
(b) Spannungsspitzen etwa alle 8 s,
(c) Bindung an die Figuren,
(d) eine faire, harte Abstimmung, bei der beide Seiten Stimmen bekommen.
Antworte auf Deutsch, knapp, ohne Ja-Sagerei, nur denken (keine Dateien ändern). Liefere am Ende das überarbeitete Skript im selben Format (Englisch).

Welt: <Ort, Ereignis, Wasser- bzw. Gefahrenlogik mit Zahlen, Haus- und Raumaufbau>
Figuren: <Name, Look, Rolle, Geheimnisse, die noch nicht verraten werden dürfen>
Bogen: <diese und die nächste Folge laut Bibel>
Fällige Konsequenzen: <Einträge aus dem Register>
Letzte Folge endete: <letzte Zeilen, Wahl, gebauter Zweig>
Vorgaben:
- über 60 s (Ziel 65-75 s), ab Sekunde 0 packend
- Figuren zügig, ohne "...", kurze Sätze, Zeile höchstens ~220 Zeichen
- Tags sparsam, SFX als eigene Zeilen, Erzähler atempo 1.15
- Dauer-Faustregel: Zeichen / 15 s + 0,4 s je Zeile
- kein Bild unter 1 s
- kein Blut, Tod nur angedeutet, Kinder nie in gezeigter Lebensgefahr
- keine erfundenen Abstimmungszahlen
Entwurf (Nr | Sprecher | Text):
<Zeilen>
Eigene Zweifel: <konkrete Fragen zu Physik, Zeitrechnung, Fairness der Wahl>
```

## B: Ton (model: sonnet)

```
Erzeuge und bereite den Ton für Episode <id> auf. Projekt: <Pfad> (direkt im Checkout, nichts committen). Nie API-Schlüssel ausgeben. Vorbild: stimmproben/<vorige id>-roh/ und episodes/<vorige id>/assets/.
Quelle: episodes/<id>/episode.json, shots[0].lines (1-basiert). Text samt Tags genau so an die TTS geben. episode.json nicht von Hand ändern.

1) Stimmen: creative_generate_speech, model_id eleven_v4, generations_count 1, alle Aufrufe in einem Flow. Jede Zeile genau EINMAL; bei Fehlern erst den Status prüfen. Voice-IDs: <aus der Bibel>. Neue Figur: Stimme mit creative_list_voices suchen (nur IDs aus der Liste), Name und ID melden.
2) SFX: creative_generate_in_flow, node_type sfx, model_id eleven_text_to_sound_v2, generations_count 1, je einmal: <Zeile: Prompt>.
3) Warten mit creative_get_flow_run_status, dann creative_get_generations für die signed full_res_url, mit curl nach stimmproben/<id>-roh/<nr>.mp3 laden.
4) Aufbereiten nach episodes/<id>/assets/s01_l<nr>.mp3 (44,1 kHz):
   - Stille an Anfang und Ende schneiden (-45 dB, 30 ms Rest).
   - Sprechzeilen: interne Pausen auf höchstens 0,12 s (silenceremove=stop_periods=-1:stop_duration=0.12:stop_threshold=-40dB:stop_silence=0.08), vorher und nachher mit silencedetect prüfen.
   - atempo: Erzähler 1.15, Figuren 1.10. SFX ohne atempo, höchstens 1,6 s (Donner 2,0 s), 0,15 s Ausblenden.
5) bash scripts/angleichen.sh episodes/<id>/assets; Musik aus der Vorfolge kopieren.
6) npm run build -- <id> --only=audio (Whisper lokal). Fragt es nach Kosten: abbrechen und melden.
7) Whisper-Wortlaut gegen das Skript prüfen; Wortanfänge gegen silencedetect halten; Abweichungen über 0,1 s melden, nicht korrigieren. npm run validate -- <id>.
Melde: Flow-ID, neue Stimmen, Tabelle der Dateien mit Dauer, Summe (muss über 60 s), Auffälligkeiten, Wortzeit-Abweichungen.
```

## C: Szene bauen (model: opus, im Checkout)

```
Baue die Remotion-Szene für Episode <id> ("<Serie>", Folge <N>, Zweig <WAHL>). Direkt im Checkout <Pfad> (kein Worktree). Nichts committen.
Lies: arbeitsstand.md, die Bibel, episodes/<id>/episode.json. Vorlage ist die Vorfolge: remotion/src/scenes/<vorige id>.tsx (Ergebniskarte mit Konstante RESULT, keyCam, Vote-Ende, Pegel-Logik). Bausteine: remotion/src/flood/, remotion/src/zombie/. Szene in Episode.tsx registrieren (Import und SCENES). Wenig neuer Code; neue Props standardmäßig aus; die anderen Folgen bleiben pixelgleich (Kontroll-Stills vorher und nachher).
Ton und Wortzeiten macht parallel ein anderer Agent: episodes/<id>/assets und episode.json NICHT anfassen, nie --only=audio. Erst Sets, Figuren und Posen bauen und mit Stills prüfen; Schnitte erst auf die Wortzeiten legen, wenn sie in shots[0].assets.lines stehen.
Vorgaben: <Qualitätsregeln aus SKILL.md einfügen>
Kontinuität: Gleicher Gebäudeschnitt, gleiche Türen, gleiches Dach (RoofKit) wie die Vorfolge, und der Wasserstand schließt an die Vorfolge an.
Bildplan (Zeilennummern): <je Zeilengruppe: Ort, Handlung, Kamera, Einblendungen>
Prüfen: Stills mit npx remotion still ... --frame=N selbst ansehen; am Ende npm run build -- <id> --only=render, npx tsc --noEmit grün, Kontaktbogen out/rev<nr>/bogen-folge.png (fps=1,scale=180:320,tile=12x7; drawtext nicht verwenden).
Danach Selbstprüf-Schleife (Vorlage D).
Melde nur: geänderte Dateien, Einstellungsliste (Start-Ende-Länge), Pfade der Bögen, und ausschließlich Punkte, die technisch nicht lösbar waren, mit Grund.
```

## D: Selbstprüf-Schleife (an den Szenen-Agenten anhängen oder nachschicken)

```
Eigene Prüfrunde: Kontaktbogen der ganzen Folge (eine Kachel je Sekunde) und enge Bögen an kritischen Stellen (select='between(n\,A\,B)*not(mod(n\,15))',scale=240:427,tile=5x4) ansehen.
Prüfe Logik, Raum (ist jeder Ortswechsel im Bild nachvollziehbar?), Physik, Proportionen, Lesbarkeit ohne Ton, Kontinuität zur Vorfolge, keine Einstellung unter 30 Frames, Schnitte auf Wortanfängen, Bild nie vor der Stimme.
Liste jede Schwäche auf, behebe sie und prüfe erneut, bis nichts Wesentliches bleibt. Keine Schwächenliste an den Nutzer.
```

## E: Mängelliste nach der Abnahme (an denselben Szenen-Agenten)

```
Abnahme <id>: <was gut ist, ein Satz>. Bitte beheben, gleiche Regeln wie bisher:
1. <Mangel mit Frame/Zeile, was falsch ist, wie es richtig aussieht (physikalisch oder logisch begründet)>
2. ...
Prüfe <Punkt> vor dem Rendern mit 2-6 Stills. Danach komplett rendern, Bögen nach out/rev<nr>/, kurz melden.
```
