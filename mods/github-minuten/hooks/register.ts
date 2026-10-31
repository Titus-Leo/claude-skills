import type { Register } from 'claude-code';

const TEXT = `# GitHub-Minuten sparen (Vorgabe von Leo)

- Jeder Push auf einen Branch mit Workflow und jeder Merge löst CI aus und kostet GitHub-Minuten. Deshalb: gebündelt pushen, nicht nach jedem Teilschritt.
- Zwischenstände lokal sammeln (mehrere Commits sind fein), erst nach grünem lokalen Prüflauf einmal pushen. Keine Zwischenmerges, keine leeren Commits, kein Schließen und Wiederöffnen von PRs, um CI neu anzustoßen.
- Agenten in Worktrees pushen nie selbst; die Hauptsitzung führt zusammen und pusht einmal.
- Ausnahme: Pushes, die nichts bauen (Docs-only-Branches ohne Workflow, reine Sicherung eines Standes ohne CI), sind frei. Wenn unklar ist, ob ein Push CI auslöst, lokal prüfen (Pfadfilter des Workflows), statt zu raten.
- Vor einem Push kurz sagen, der wievielte in dieser Sitzung es ist und was er auslöst.`;

const PUSH = /\bgit\s+push\b/;
const MERGE = /\bgh\s+pr\s+(merge|create)\b|\bgit\s+merge\b.*\borigin\//;

export const register: Register = (on) => {
  let pushes = 0;

  on('prompt.compose', async (_$, e, next) => {
    const { sections } = await next(e);
    return {
      sections: [...sections, { id: 'github-minuten:regeln', text: TEXT, scope: 'session' as const }],
    };
  });

  on('tool.call', { tool: 'Bash' }, async ($, e, next) => {
    const istPush = PUSH.test(e.command);
    if (istPush) {
      pushes += 1;
      $.ui.toast(`Push Nr. ${pushes} in dieser Sitzung. Bündeln, wenn noch mehr folgt.`, { duration: 6000 });
      $.ui.status(`Pushes: ${pushes}`);
    } else if (MERGE.test(e.command)) {
      $.ui.toast('Merge oder PR: löst CI aus. Nur, wenn gebündelt und lokal grün.', { duration: 6000 });
    }
    return next(e);
  });

  on('tool.call', { tool: 'mcp__github__merge_pull_request' }, ($, e, next) => {
    $.ui.toast('PR-Merge löst CI aus. Nur, wenn gebündelt und lokal grün.', { duration: 6000 });
    return next(e);
  });
};
