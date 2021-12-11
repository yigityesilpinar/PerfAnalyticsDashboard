import { AnalyticMetric, AnalyticMetricResponse } from './types'

export const getEventsCounts: (options: {
  selectedMetric: AnalyticMetric | undefined
  performanceMetrics: AnalyticMetricResponse[]
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
  } else {
    const metricDataSet = performanceMetrics.map((it) => it.value)
    return {
      countMetric: metricDataSet.length,
      maxMetric: metricDataSet.length ? parseFloat(Math.max(...metricDataSet).toFixed(2)) : NaN,
      avgMetric: metricDataSet.length
        ? parseFloat((metricDataSet.reduce((a, b) => a + b, 0) / metricDataSet.length).toFixed(2))
        : NaN,
      minMetric: metricDataSet.length ? parseFloat(Math.min(...metricDataSet).toFixed(2)) : NaN
    }
  }
}
