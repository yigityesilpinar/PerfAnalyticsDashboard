declare module NodeJS {
  interface Global {
    WEBPACK_STATS_PATH: string
  }
}

var CLIENT_BUILD: boolean
