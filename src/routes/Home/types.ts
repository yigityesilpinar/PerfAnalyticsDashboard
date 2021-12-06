export interface CommonMetricsData {
  analyzeSessionUUID: string
  analyzeStartAt: string
}

export interface PerformanceMetricsData extends CommonMetricsData {
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
}

export interface ResourceMetricsData
  extends CommonMetricsData,
    Pick<PerformanceResourceTiming, 'initiatorType' | 'name'> {
  requestTime: number
  responseTime: number
  fetchTime: number
  redirectTime: number
}