import { join } from 'https://deno.land/std@v0.33.0/path/mod.ts'

export interface Item {
  readonly container: string
  readonly info: Deno.FileInfo
}

export async function * traverseFileSystem (
  container: string,
  deep: (param: Item) => boolean
): AsyncGenerator<Item> {
  for (const info of await Deno.readDir(container)) {
    const item: Item = { container, info }
    yield item
    if (info.isDirectory() && deep(item)) {
      yield * traverseFileSystem(join(container, info.name!), deep)
    }
  }
}

export default traverseFileSystem
