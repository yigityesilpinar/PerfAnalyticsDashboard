export interface TypeAggregatedResourceMetricsData {
  initiatorType: string
  count: number
  avg: number
  max: number
  min: number
}

export type TypeAggregatedResourceAnalytics =
  | 'requestTimeByType'
  | 'responseTimeByType'
  | 'fetchTimeByType'
  | 'redirectTimeByType'

export type ResourceAnalyticMetric = keyof ResourceMetricsData

export type ExtendedResourceAnalyticMetric = ResourceAnalyticMetric | TypeAggregatedResourceAnalytics
