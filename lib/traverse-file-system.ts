import { join } from 'https://deno.land/std@v0.33.0/path/mod.ts'

export interface Item {
  readonly container: string
  readonly info: Deno.FileInfo
  readonly isDirectory: boolean
}

export async function * traverseFileSystem (
  container: string,
  deep: (param: Item) => boolean
): AsyncGenerator<Item> {
  for (const info of await Deno.readDir(container)) {
    const isDirectory = info.isDirectory()
    const item: Item = {
      container,
      info,
      isDirectory
    }
    yield item
    if (isDirectory && deep(item)) {
      yield * traverseFileSystem(join(container, info.name!), deep)
    }
  }
}

export default traverseFileSystem
