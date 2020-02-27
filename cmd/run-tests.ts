import { join } from 'https://deno.land/std@v0.33.0/path/mod.ts'
import root from '../lib/project-root.ts'
import traverse from '../lib/traverse-file-system.ts'

Deno.chdir(root)

const TEST_PATTERN = /\.test\.(ts|js)/
const files: string[] = []
const generator = traverse('.', x => x.info.name !== '.git')
for await (const { container, info, isDirectory } of generator) {
  if (isDirectory) continue
  const filename = join(container, info.name!)
  if (TEST_PATTERN.test(filename)) files.push(filename)
}

console.info('$ deno test', ...files)

await Deno.run({
  args: ['deno', 'test', ...files],
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit'
}).status()
  .then(status => Deno.exit(status.code))
