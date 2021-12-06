import { PassedToClient } from '../server/config'

declare global {
  var WEBPACK_STATS_PATH: string
  interface Window {
    passedToClient: PassedToClient
  }
}

var CLIENT_BUILD: boolean
