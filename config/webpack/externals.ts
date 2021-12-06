import fs from 'fs'
import path from 'path'
import { PROJECT_ROOT_DIR } from '../paths'

const node_modules = path.resolve(PROJECT_ROOT_DIR, 'node_modules')

const externals = fs
  .readdirSync(node_modules)
  .filter(
    (mod) => !/\.bin|react-universal-component|webpack-flush-chunks/.test(mod)
  )
  .reduce(
    (ext, mod) => ({ ...ext, [mod]: `commonjs ${mod}` }),
    {} as Record<string, string>
  )

externals['react-dom/server'] = 'commonjs react-dom/server'

export default externals
