import moment, { Moment } from 'moment'

import {
  ExtendedResourceAnalyticMetric,
  TypeAggregatedResourceAnalytics,
  TypeAggregatedResourceMetricsResponse
} from './types'

export const MAX_ANALYTICS_QUERY_RANGE_IN_DAYS = 30

export const typeAggregatedResourceAnalyticMetrics: TypeAggregatedResourceAnalytics[] = [
  'requestTimeByType',
  'responseTimeByType',
  'fetchTimeByType',
  'redirectTimeByType'
]
export const resourceAnalyticMetrics: ExtendedResourceAnalyticMetric[] = [
  'initiatorType',
  'requestTime',
  'responseTime',
  'fetchTime',
  'redirectTime',
  ...typeAggregatedResourceAnalyticMetrics
]

export const initialDateRangeValue = [moment().subtract(30, 'minutes'), moment()] as [Moment, Moment]
export const selectedAnalyticsAccountId = 1

export const typeAggregatedResponseLabels: Exclude<keyof TypeAggregatedResourceMetricsResponse, 'initiatorType'>[] = [
  'min',
  'count',
  'avg',
  'max'
]
