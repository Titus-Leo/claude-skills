import type { Register } from 'claude-code';

const TEXT = `# Planung: stark planen, günstig bauen (Vorgabe von Leo)

- Jede Aufgabe, die mehr als eine kleine Korrektur ist, wird ZUERST geplant, und zwar von einem starken Modell:
  in der Regel Opus; Fable nur, wenn die Aufgabe es wirklich trägt (Architektur, Sicherheit, Freigabe- und Rechnungslogik, schwierige Abwägungen).
- Den Denkaufwand (Reasoning-Effort) an die Aufgabe anpassen: Routine niedrig bis mittel, Architektur und Sicherheit hoch, nie pauschal maximal.
- Der Plan ist konkret: betroffene Dateien, Reihenfolge, Tests, Abnahmekriterien, offene Entscheidungen. Erst danach umsetzen.
- Die Umsetzung geht an günstige Modelle (Sonnet, für mechanische Arbeit Haiku) als Agenten mit klar umrissenem Auftrag, bekannten Dateien und vorhandenen Tests.
- Läuft diese Sitzung selbst auf einem teuren Modell, plant und prüft sie, delegiert aber die Umsetzung, statt sie selbst zu tippen.
- Dieser Mod setzt für Plan-Agenten ohne Modellangabe Opus.`;

export const register: Register = (on) => {
  on('prompt.compose', async (_$, e, next) => {
    const { sections } = await next(e);
    return { sections: [...sections, { id: 'planung-teuer:regeln', text: TEXT, scope: 'session' as const }] };
  });

  on('tool.call', { tool: 'Agent' }, ($, e, next) => {
    if (e.model === undefined && e.subagent_type === 'Plan') {
      $.ui.status('Plan-Agent: Opus');
      return next({ ...e, model: 'opus' });
    }
    return next(e);
  });
};
