const defaultTheme = {
  palette: {
    primary: {
      main: '#03D684',
      light: '#7c8084',
    },
    secondary: {
      main: '#5f6368',
      light: '#7c8084',
    },
    error: {
      main: 'red', // TODO: define
    },
    background: {
      main: '#fafafa',
    },
    text: {
      main: '#252424',
    },
    green: {
      light: '#05F26C',
    },
  },
  mobileBreakPoint: '1000px',
  boxShadow:
    '0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15)',
}
export type DefaultTheme = typeof defaultTheme

export default defaultTheme
