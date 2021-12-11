import moment, { Moment } from 'moment'

import { AnalyticMetric } from './types'

export const MAX_ANALYTICS_QUERY_RANGE_IN_DAYS = 30
export const analyticMetrics: AnalyticMetric[] = [
  'ttfb',
  'fcp',
  'domContentLoad',
  'windowLoad',
  'connectionTime',
  'dnsLookUp',
  'domComplete',
  'domInteractive',
  'redirectCount',
  'redirectTime',
  'requestTime',
  'responseTime',
  'tlsTime',
  'unloadTime'
]

export const initialDateRangeValue = [moment().subtract(30, 'minutes'), moment()] as [Moment, Moment]
export const selectedAnalyticsAccountId = 1
