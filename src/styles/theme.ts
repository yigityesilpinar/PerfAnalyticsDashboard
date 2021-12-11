import { lighten, darken } from 'polished'

const basePrimary = '#ff671d'
const baseSecondary = '#868688'
const baseText = '#231f20'

const defaultTheme = {
  palette: {
    primary: {
      dark: darken(0.2)(basePrimary),
      main: basePrimary,
      light: lighten(0.2)(basePrimary),
      contrastText: '#ffffff'
    },
    secondary: {
      dark: darken(0.3)(baseSecondary),
      main: baseSecondary,
      light: lighten(0.3)(baseSecondary),
      contrastText: '#ffffff'
    },
    text: {
      primary: baseText,
      disabled: lighten(0.3)(baseSecondary),
      hint: lighten(0.3)(baseText),
      secondary: lighten(0.2)(baseSecondary)
    }
  },
  mobileBreakPoint: '900px'
}

export const analyticColors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600']

export type DefaultTheme = typeof defaultTheme

export default defaultTheme
