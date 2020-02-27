import { parse } from 'https://deno.land/std@v0.33.0/flags/mod.ts'
import { getStdIn } from '../lib/stdin.ts'
import { insertObjectKey } from '../lib/insert-object-key.ts'
import { jsonIndent } from '../lib/json-indent.ts'

const {
  help,
  before,
  after,
  indent = 2,
  _: [key, value]
} = parse(Deno.args) as {
  help?: boolean
  before?: string | number
  after?: string | number
  indent?: number | 'tab' | 'none'
  _: string[]
}

if (help) {
  console.info([
    '$ insert-object-key [options] <key> <value>',
    '',
    'Positional:',
    '  <key>: JSON key',
    '  <value>: JSON value (valid JSON text)',
    '',
    'Options:',
    '  --help: Display this message',
    '  --before <key> | --after <key>: Where to insert',
    '    <key>: Existing JSON key which the new key would be inserted before/after',
    '  --indent <N>|tab|none: Indentation of output JSON',
    '    <N>: Indent using N spaces',
    '    tab: Indent using 1 tab',
    '    none: Minified',
    '',
    'Examples:',
    '  Insert "newKey": "newValue" into "file.json" before "oldKey"',
    `  $ insert-object-key --before oldKey newKey '"new value"' < file.json > file.json`
  ].join('\n'))

  throw Deno.exit(0)
}

if (key === undefined) {
  console.error('ERROR: key is missing')
  throw Deno.exit(1)
}

if (value === undefined) {
  console.error('ERROR: value is missing')
  throw Deno.exit(1)
}

const inputObject = JSON.parse(await getStdIn('utf-8'))
const outputObject = insertObjectKey(
  inputObject,
  key,
  JSON.parse(value),
  position => position.keyAfter === before || position.keyBefore === after
)
console.info(JSON.stringify(
  outputObject,
  undefined,
  jsonIndent(indent)
))
