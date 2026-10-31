import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

const files = atom({ plugin: 'uebergabe-mod', key: 'files' } as const, [] as string[])
const isHidden = atom({ plugin: 'uebergabe-mod', key: 'isHidden' } as const, false)
const LIMIT = 3

export const register: Register = on => {
  const track = async ($: EngineInterface, path: string) =>
    update($, files, list =>
      /(^|[\\/])arbeitsstand\.md$/i.test(path) ? [] : list.includes(path) ? list : [...list, path],
    )

  on('tool.call', { tool: 'Edit' }, async ($, e, next) => {
    await track($, e.file_path)
    return next(e)
  })
  on('tool.call', { tool: 'Write' }, async ($, e, next) => {
    await track($, e.file_path)
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const n = (await read($, files)).length
    if (e.props.hasSurvey || n < LIMIT || (await read($, isHidden))) return next(e)
    const { Box, Button, Text } = $.ui.resolve(e)
    return (
      <Box>
        <Text dimColor>{n} Dateien geändert ohne Übergabe </Text>
        <Button key="run" label="Übergabe" onPress={() => void $.command.run({ command: 'uebergabe' })} />
        <Button key="hide" plain label="Später" onPress={() => update($, isHidden, () => true)} />
      </Box>
    )
  })
}
