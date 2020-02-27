export function jsonIndent (indent: number | 'tab' | 'none') {
  switch (indent) {
    case 'tab':
      return '\t'
    case 'none':
      return undefined
    default:
      return indent
  }
}

export default jsonIndent
