# KI-Kurzvideos aus Code: Recherche (Stand 31.10.2026)

Drei Agenten-Recherchen (Pipelines, Stimmen, Formate). Zahlen aus GitHub-API, Artificial Analysis, Anbieter-Preisseiten; Reichweiten fast nur aus Anbieter-Blogs (unverifiziert). Nichts gerendert, nichts gehört.

## Renderer (Video aus Code, 0 € pro Video)

| Tool | Sterne | Lizenz | Urteil |
|---|---|---|---|
| HyperFrames (heygen-com/hyperframes) | 76k | Apache-2.0 | HTML+GSAP, 450 Bausteine, keine Lizenzfrage. `npx skills add heygen-com/hyperframes` |
| Remotion + remotion-dev/skills | 69k / 6k | gratis bis 3 Personen | React, größtes Skill-Ökosystem (installiert) |
| Manim | 42k | MIT | Mathe/Wissenschaft, für Social aufwendig |
| Motion Canvas / Revideo | 20k / 4k | MIT | seit Monaten kaum gepflegt |

KI-Generatoren (Diffusion) kosten pro Sekunde: Runway gen4_turbo 0,05 $/s, Kling 0,09–0,17 $/s, Veo 3.1 bis 0,40 $/s (https://docs.dev.runwayml.com/guides/pricing/). 30-s-Reel: 1,50 $ bis 12 $. Nur für B-Roll sinnvoll.

## Stile und fertige Pakete

| Stil | Paket | Stand | Hinweis |
|---|---|---|---|
| Stickman | dsauce/stickman-kino | 10★, MIT, HyperFrames | 14 Figuren, 58 Posen, 202 Props, `--format 9:16`; Stimme Kokoro (kein Deutsch) |
| Stickman-Skits | tamtree-ai/stick-stage | 0★, MIT, Remotion | 5 Vorlagen 1080×1920, Lip-Sync, offline |
| Whiteboard | Matteoikarieth96/whiteboard-video-skill | 19★, MIT | Hand zeichnet synchron zur Stimme |
| Pixel-Art / handgezeichnet | Azure12355/weilanx-claude-videos | 217★, MIT | bester Pixel-Treffer |
| Erklärer (schwarze Leinwand) | Vincentwei1021/anything2explainer | 2,9k★, Lizenz unklar | meistgesternt, vor Nutzung Lizenz klären |
| Screen-Demos | digitalsamba/claude-code-video-toolkit | 2,4k★, MIT | Playwright + Remotion |
| Daten-Charts | iart-ai/data-animation-skills | 16★, MIT | CSV → animiertes Chart |
| Schnitt echter Takes | alisadiq-ai/favstash-ai-video-editing-skills | 54★, Apache-2.0 | FFmpeg + HyperFrames, Captions |

## Stimmen (Elo: https://artificialanalysis.ai/text-to-speech/leaderboard, kein deutsches Blind-Ranking)

| Dienst | Elo | Preis | Mehrsprecher | Wort-Timestamps | Deutsch | MCP |
|---|---|---|---|---|---|---|
| ElevenLabs v4 | 1334 | 0,08 $/1k Zeichen | Dialog-Endpoint, Audio-Tags | nein | ja | gehostet, OAuth |
| Cartesia Sonic 3.6 | 1296 | ~0,04 $/1k | pro Segment, Emotion/Tempo | **ja** | ja | offiziell: `claude mcp add --transport http --scope user cartesia-mcp https://mcp.cartesia.ai/mcp` |
| Gemini 3.8 Flash TTS | 1283 | ~0,0135 $/Min (ab 2027 doppelt) | max. 2 | nein | ja | Community |
| Fish S2.1 Pro | 1188 | 15 $/1M Bytes | ? | ? | ja | Community |
| Chatterbox (lokal) | 1024 | 0 | pro Segment | nein | ja, MIT, Wasserzeichen | – |
| Kokoro (lokal) | 1062 | 0 | pro Segment | nein | **nein** | in HyperFrames |

Untertitel Wort für Wort: Cartesia nativ, sonst Whisper-Schritt nach dem TTS. Remotion hat keine TTS-Integration, `@remotion/elevenlabs` baut nur Captions aus STT.

## Formate (Reichweite fast nur aus Anbieter-Blogs)

| Format | Beleg | Sättigung | Richtlinien-Risiko |
|---|---|---|---|
| Stickman-Erklärer | Paint Explainer 2 Mio Abos (Langform, taletok.io) | mittel | Template-Look kann als „generisch“ gelten |
| Daten-Visualisierung | keine Zahlen | vermutlich niedrig | niedrig, keine Labelpflicht |
| Was-wäre-wenn / History / Science | What If 8,9 Mio, Epic History 3,1 Mio (Langform) | niedrig–mittel | niedrig bei eigener Recherche |
| Quiz/Trivia mit Loop | nur Anbieterwert | mittel–hoch | Template-Risiko |
| Reddit + Gameplay, Fake-Chat, Promi-Stimmen | nur Tool-Werbung | hoch | Rechte, „unoriginal“, nicht FYF-fähig |
| Motivations-Zitate | Motiversity 4,2 Mio | sehr hoch | generisch |

Regeln: YouTube „inauthentic content“ seit 15.07.2025, Juli 2026 Klarstellung (generisch/repetitiv, off-putting, KI-Persona als Experte) → nicht monetarisierbar; Labelpflicht nur bei realistischen KI-Inhalten, Animation nicht (https://support.google.com/youtube/answer/14328491). YPP ab 01.02.2027: 20 Mio Shorts-Views/90 Tage für Neue (vidIQ). TikTok-Label ab 24.09.2026 für realistische Szenen. Instagram: Label bei fotorealistischem Video/realistischem Audio; unsicher, ob TTS darunter fällt. Shorts: 30–60 s beste Reichweite (Socialinsider, zweitzitiert); Hook in 0,5–2 s; Swipe-away unter 30 %.

## Empfehlung

1. Stil: Stickman- oder Whiteboard-Erklärer mit eigenem Skript, zweitens Daten-Stories (Code-Vorteil). Keine Reddit/Promi-Formate.
2. Renderer: HyperFrames (lizenzfrei) oder Remotion (schon installiert); stickman-kino als Start testen, Stimme auf ElevenLabs/Cartesia umstellen, weil Kokoro kein Deutsch kann.
3. Stimme: ElevenLabs v4 für Mehrcharakter-Dialoge, Cartesia für Wort-Untertitel. Deutsche Qualität mit eigenem Text gegenhören.
4. Test: 3 Formate × 20 Videos, Swipe-away je Format in YouTube Studio vergleichen.

## Entscheidung Stimme (31.10.2026)

VoiceStudio lokal (RTX 4080 Super), Engine **IndexTTS 2.5** (Emotion je Satz über `emo_text` + `emo_alpha`), 0 €. Reels auf Englisch. ElevenLabs nicht nötig.
Charakter-Profile (VoiceStudio `/profiles`, feste Seeds): Mia `8e10dd2c` (w, jung, US), Elena `cd693f7f` (w, reif, tief, brit.), Zoe `32160f7d` (w, Teen, hoch), Marcus `60ab2ad8` (m, reif, tief, US), Leo `0cd91245` (m, jung, brit.).
Render: `POST http://localhost:3900/generate` (multipart: text, profile_id, engine=indextts2, language=English, emo_text, emo_alpha) → WAV-Bytes. MCP `voicestudio` für generate_speech/transcribe.
Bekannter Fehler: IndexTTS-Install lässt `hf_cache/w2v-bert-2.0/model.safetensors` manchmal unvollständig (`.incomplete`); dann von huggingface.co/facebook/w2v-bert-2.0 nachladen.
