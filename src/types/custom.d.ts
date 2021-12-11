import { PassedToClient } from '../server/config'

declare global {
  var WEBPACK_STATS_PATH: string
  interface Window {
    passedToClient: PassedToClient
  }

  interface CommonMetricsData {
    analyzeSessionUUID: string
    analyzeStartAt: string
  }

  interface PerformanceMetricsData extends CommonMetricsData {
    ttfb: number
    fcp: number
    requestTime: number
    responseTime: number
    dnsLookUp: number
    connectionTime: number
    tlsTime: number
    redirectTime: number
    redirectCount: number
    unloadTime: number
    domInteractive: number
    domComplete: number
    domContentLoad: number
    windowLoad: number
  }

  interface ResourceMetricsData extends CommonMetricsData, Pick<PerformanceResourceTiming, 'initiatorType' | 'name'> {
    requestTime: number
    responseTime: number
    fetchTime: number
    redirectTime: number
  }
}

var CLIENT_BUILD: boolean
