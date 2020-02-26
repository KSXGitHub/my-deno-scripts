import { dirname } from 'https://raw.githubusercontent.com/denoland/deno/v0.33.0/std/path/mod.ts'
import { dirname as modDir } from 'https://deno.land/x/dirname/mod.ts'
export const PROJECT_ROOT = dirname(modDir(import.meta))
export default PROJECT_ROOT
