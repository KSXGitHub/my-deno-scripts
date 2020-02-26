export function * formatCode (indent: string, text: string) {
  for (const line of text.split('\n')) {
    const item  = indent + line
    if (item.trim()) yield item
  }
}

export default formatCode
