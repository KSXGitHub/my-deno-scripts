import { join } from 'https://raw.githubusercontent.com/denoland/deno/v0.33.0/std/path/mod.ts'
import root from '../lib/project-root.ts'
import { write } from '../lib/generate-index-page.ts'

const filename = join(root, 'tree.html')
console.info(`Generating ${filename}...`)
await write(filename, root)
console.info('done.')
