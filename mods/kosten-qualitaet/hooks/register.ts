import type { Register } from 'claude-code';

const TEXT = `# Kosten und Qualität (Vorgabe von Leo)

- So günstig wie möglich, so teuer wie nötig: tokensparend arbeiten, kleine Pakete, nur betroffene Tests gezielt, nichts doppelt lesen, keine Dateidumps in den Kontext ziehen, die ein Agent zusammenfassen kann.
- Die Qualität wird nie beschnitten. Gespart wird bei der Umsetzung, nicht beim Ergebnis.
- Umsetzung: günstige Modelle (Sonnet, für mechanische Arbeit Haiku) in Worktrees, mit Spezifikation, Dateiliste und Tests.
- Prüfung: Jedes Ergebnis eines günstigen Modells nimmt ein starkes Modell (Opus, bei Sicherheit oder Geld Fable) ab: Diff lesen, Tests und Prüfläufe ansehen, gegen die Spezifikation halten.
- Bemängelt die Prüfung etwas, geht die Arbeit mit konkreter Mängelliste an das günstige Modell zurück oder das starke Modell behebt es selbst, wenn das schneller ist. Erst nach bestandener Prüfung gilt eine Aufgabe als fertig.
- Dieser Mod setzt für Agenten ohne Modellangabe Sonnet (Umsetzung, Suche) und Opus, wenn der Auftrag eine Prüfung, Abnahme oder Sicherheitsfrage ist.`;

const PRUEFUNG = /\b(prüf|pruef|review|abnahme|abnehmen|audit|sicherheit|security|verifizier|kontrollier)/i;

export const register: Register = (on) => {
  const zaehler = new Map<string, number>();

  on('prompt.compose', async (_$, e, next) => {
    const { sections } = await next(e);
    return {
      sections: [...sections, { id: 'kosten-qualitaet:regeln', text: TEXT, scope: 'session' as const }],
    };
  });

  on('tool.call', { tool: 'Agent' }, async ($, e, next) => {
    let model = e.model;
    if (model === undefined && e.subagent_type !== 'fork' && e.subagent_type !== 'Plan') {
      model = PRUEFUNG.test(`${e.description} ${e.prompt.slice(0, 400)}`) ? 'opus' : 'sonnet';
    }
    const gewaehlt = model ?? 'erbt';
    zaehler.set(gewaehlt, (zaehler.get(gewaehlt) ?? 0) + 1);
    $.ui.status(`Agenten: ${[...zaehler].map(([m, n]) => `${n}× ${m}`).join(', ')}`);
    return next(model === e.model ? e : { ...e, model });
  });
};
