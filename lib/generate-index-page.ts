import { join } from 'https://deno.land/std@v0.35.0/path/mod.ts'
import { writeFileStr } from 'https://deno.land/std@v0.35.0/fs/mod.ts'
import formatCode from './format-code.ts'

const indentDelta = '  '

const file = (
  basename: string,
  filename: string,
  indent: string
) => formatCode(indent, `
  <li class="file" data-basename="${basename}">
    <a href="${filename}">${basename}</a>
  </li>
`)

async function * directory (
  basename: string,
  dirname: string,
  indent: string
): AsyncGenerator<string, void, unknown> {
  yield * formatCode(indent, `
    <li class="directory" data-basename="${basename}">
      <a href="${dirname}">${basename === '.' ? '/' : dirname}</a>
      <ul>
  `)

  const nextIndent = indent + indentDelta + indentDelta
  for (const info of await Deno.readDir(dirname)) {
    const basename = info.name!
    const path = join(dirname, basename)

    if (basename.startsWith('.')) continue

    if (info.isFile()) {
      yield * file(basename, path, nextIndent)
      continue
    }

    if (info.isDirectory()) {
      yield * directory(basename, path, nextIndent)
      continue
    }
  }

  yield * formatCode(indent, `
      </ul>
    </li>
  `)
}

async function htmlList (dirname: string, indent: string) {
  let text = ''

  for await (const line of directory('.', dirname, indent)) {
    text += '\n' + line
  }

  return text
}

export const html = async (dirname: string) => `
  <!DOCTYPE html>
  <!--
    NOTE:
    This file is generated. Do not edit.
    Run 'deno --allow-all cmd/generate-index-page.ts' to update this file
  -->

  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Files</title>
    </head>
    <body>
      <h1>Files</h1>
      <hr />
      <main><nav>
        ${await htmlList(dirname, indentDelta.repeat(2))}
      </nav></main>
    </body>
  </html>
`

export const write = async (
  filename: string,
  dirname: string
) => writeFileStr(filename, await html(dirname))
