import { dirname } from 'https://deno.land/std@v0.35.0/path/mod.ts'
import { dirname as modDir } from 'https://deno.land/x/dirname/mod.ts'
export const PROJECT_ROOT = dirname(modDir(import.meta))
export default PROJECT_ROOT
