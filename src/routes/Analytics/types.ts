import { Account } from 'src/api/generated/perfAnalytics'

export type AnalyticMetric = Account.AnalyticsDetail.RequestParams['field']
export type AnalyticMetricResponse = Account.AnalyticsDetail.ResponseBody['data'][number]
