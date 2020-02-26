import root from '../lib/project-root.ts'
import { write } from '../lib/generate-index-page.ts'

Deno.chdir(root)
const filename = 'tree.html'
console.info(`Generating ${filename}...`)
await write(filename, '.')
console.info('done.')
