import { Account } from 'src/api/generated/perfAnalytics'

export type TypeAggregatedResourceAnalytics =
  | 'requestTimeByType'
  | 'responseTimeByType'
  | 'fetchTimeByType'
  | 'redirectTimeByType'

export type TypeAggregatedResourceMetricsResponse = Account.ResourceAnalyticsByTypeDetail.ResponseBody['data'][number]
export type ResourceAnalyticMetricResponse = Account.ResourceAnalyticsDetail.ResponseBody['data'][number]

export type ResourceAnalyticMetric = Account.ResourceAnalyticsDetail.RequestParams['field']

export type ExtendedResourceAnalyticMetric = ResourceAnalyticMetric | TypeAggregatedResourceAnalytics
