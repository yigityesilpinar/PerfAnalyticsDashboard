import { typeAggregatedResourceAnalyticMetrics } from './config'
import {
  ExtendedResourceAnalyticMetric,
  ResourceAnalyticMetric,
  TypeAggregatedResourceAnalytics,
  TypeAggregatedResourceMetricsData
} from './types'

export const isResourceAnalyticMetric = (
  metric: ExtendedResourceAnalyticMetric | undefined
): metric is ResourceAnalyticMetric =>
  !!metric && !typeAggregatedResourceAnalyticMetrics.includes(metric as TypeAggregatedResourceAnalytics)

export const makeResourceAnalyticsMetric = (metric: TypeAggregatedResourceAnalytics): ResourceAnalyticMetric =>
  metric.replace(/ByType$/, '') as ResourceAnalyticMetric

export const getEventsCounts: (options: {
  selectedMetric: ExtendedResourceAnalyticMetric | undefined
  performanceMetrics: ResourceMetricsData[]
}) => {
  countMetric: number
  maxMetric: number
  minMetric: number
  avgMetric: number
} = ({ selectedMetric, performanceMetrics }) => {
  if (typeof selectedMetric === 'undefined') {
    return {
      countMetric: 0,
      maxMetric: NaN,
      avgMetric: NaN,
      minMetric: NaN
    }
  } else if (selectedMetric === 'initiatorType') {
    return {
      countMetric: performanceMetrics.length,
      maxMetric: NaN,
      avgMetric: NaN,
      minMetric: NaN
    }
  } else if (isResourceAnalyticMetric(selectedMetric)) {
    const metricDataSet = performanceMetrics.map((it) => it[selectedMetric] as number)
    return {
      countMetric: metricDataSet.length,
      maxMetric: metricDataSet.length ? parseFloat(Math.max(...metricDataSet).toFixed(2)) : NaN,
      avgMetric: metricDataSet.length
        ? parseFloat((metricDataSet.reduce((a, b) => a + b, 0) / metricDataSet.length).toFixed(2))
        : NaN,
      minMetric: metricDataSet.length ? parseFloat(Math.min(...metricDataSet).toFixed(2)) : NaN
    }
  } else {
    const metricDataSet = performanceMetrics as unknown as TypeAggregatedResourceMetricsData[]
    return {
      countMetric: metricDataSet.length ? metricDataSet.reduce((acc, data) => acc + data.count, 0) : 0,
      maxMetric: metricDataSet.length ? parseFloat(Math.max(...metricDataSet.map((it) => it.max)).toFixed(2)) : NaN,
      avgMetric: metricDataSet.length
        ? parseFloat((metricDataSet.reduce((acc, data) => acc + data.avg, 0) / metricDataSet.length).toFixed(2))
        : NaN,
      minMetric: metricDataSet.length ? parseFloat(Math.min(...metricDataSet.map((it) => it.min)).toFixed(2)) : NaN
    }
  }
}
