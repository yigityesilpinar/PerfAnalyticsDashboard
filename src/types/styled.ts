import 'styled-components'

import { DefaultTheme as defaultTheme } from 'src/styles/theme'

declare module 'styled-components' {
  // define default styled component theme as application theme
  export interface DefaultTheme extends defaultTheme {}
}
