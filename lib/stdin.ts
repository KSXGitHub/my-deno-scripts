type MayEOF = number | Deno.EOF
type Con = (n: MayEOF) => boolean

export const UNTIL_END: Con = n => n !== Deno.EOF

export async function * bytes (con: Con) {
  let n: number | typeof Deno.EOF
  do {
    const u8 = new Uint8Array(1)
    n = await Deno.stdin.read(u8)
    yield * u8
  } while (con(n))
}

export async function getStdIn (encoding?: string) {
  const record: number[] = []
  for await (const byte of bytes(UNTIL_END)) {
    record.push(byte)
  }
  const u8v = new Uint8Array(record.slice(0, -1))
  const decoder = new TextDecoder(encoding)
  return decoder.decode(u8v)
}
