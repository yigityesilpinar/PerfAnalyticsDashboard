import React, { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'
import DatePicker from 'antd/lib/date-picker'
import message from 'antd/lib/message'
import Select from 'antd/lib/select'

import { Api } from 'src/api/generated/perfAnalytics'
import Chart, { getScaleRules } from 'src/components/Chart'
import { isTouchScreen } from 'src/utils/responsiveness'
import useSessionStorage from 'src/utils/useSessionStorage'
import { analyticColors } from 'src/styles/theme'
import { makeUnique, rotate } from 'src/utils/array'
import { makeHumanReadable } from 'src/utils/analytics'
import Refresh from 'src/components/Icons/Refresh'
import Button from 'src/components/Button'
import Totals from 'src/components/Totals'
import Toolbar from 'src/components/Toolbar'

import { ResourceAnalyticMetricResponse, TypeAggregatedResourceMetricsResponse } from './types'
import { isResourceAnalyticMetric, makeResourceAnalyticsMetric, getEventsCounts } from './utils'
import {
  MAX_ANALYTICS_QUERY_RANGE_IN_DAYS,
  resourceAnalyticMetrics,
  initialDateRangeValue,
  selectedAnalyticsAccountId,
  typeAggregatedResponseLabels
} from './config'

const ResourceAnalytics: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [refetchCount, setRefetchCount] = useState(0)
  const [dateRange, setDateRange] = useSessionStorage<[Moment, Moment]>({
    storageKey: 'perfAnalytics_stored_date_range',
    initialValue: initialDateRangeValue,
    deserializer: (s) => {
      try {
        if (s) {
          return (JSON.parse(s) as string[]).map((it) => moment(it)) as [Moment, Moment]
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
      return initialDateRangeValue
    }
  })
  const [resourceAnalyticMetric, setResourceAnalyticMetric] = useState<ResourceAnalyticMetricResponse[]>([])
  const [typeAggregatedResourceAnalyticMetric, setTypeAggregatedResourceAnalyticMetric] = useState<
    TypeAggregatedResourceMetricsResponse[]
  >([])
  const [selectedMetric, setSelectedMetric] = useSessionStorage({
    storageKey: 'perfAnalytics_stored_resource_metric_name',
    initialValue: resourceAnalyticMetrics[0]
  })

  useEffect(() => {
    if (dateRange && selectedMetric) {
      setIsLoading(true)
      const api = new Api({
        baseUrl: window.passedToClient.perfAnalyticsApi
      })

      if (isResourceAnalyticMetric(selectedMetric)) {
        api.account
          .resourceAnalyticsDetail({
            id: selectedAnalyticsAccountId,
            field: selectedMetric,
            start: dateRange[0].toISOString(),
            end: dateRange[1].toISOString()
          })
          .then((res) => setResourceAnalyticMetric(res.data.data))
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error({ err })
            message.error('We are having technical issue at the moment. Please try again later.')
          })
          .finally(() => setIsLoading(false))
      } else {
        api.account
          .resourceAnalyticsByTypeDetail({
            id: selectedAnalyticsAccountId,
            field: makeResourceAnalyticsMetric(selectedMetric),
            start: dateRange[0].toISOString(),
            end: dateRange[1].toISOString()
          })
          .then((res) => setTypeAggregatedResourceAnalyticMetric(res.data.data))
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error({ err })
            message.error('We are having technical issue at the moment. Please try again later.')
          })
          .finally(() => setIsLoading(false))
      }
    }
  }, [dateRange, refetchCount, selectedMetric])

  const { countMetric, maxMetric, minMetric, avgMetric } = getEventsCounts({
    performanceMetrics: isResourceAnalyticMetric(selectedMetric)
      ? resourceAnalyticMetric
      : typeAggregatedResourceAnalyticMetric,
    selectedMetric
  })
  return (
    <>
      <Toolbar>
        <Select
          showSearch
          placeholder="Select a metric"
          optionFilterProp="children"
          filterOption={(input, opt) => {
            if (opt) {
              return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            return false
          }}
          value={selectedMetric}
          onChange={setSelectedMetric}
        >
          {resourceAnalyticMetrics.map((metric) => (
            <Select.Option key={metric} value={metric}>
              {makeHumanReadable(metric)}
            </Select.Option>
          ))}
        </Select>
        <DatePicker.RangePicker
          showTime
          showSecond={false}
          allowClear={false}
          value={dateRange}
          inputReadOnly={isTouchScreen()}
          disabledDate={(date) =>
            date.isAfter(moment().endOf('day')) ||
            date.isBefore(moment().endOf('day').subtract(MAX_ANALYTICS_QUERY_RANGE_IN_DAYS, 'days'))
          }
          onChange={(_range) => {
            if (_range && _range[0] && _range[1]) {
              setDateRange([_range[0].clone(), _range[1].clone()])
            }
          }}
        />
        <Button
          isLoading={isLoading}
          iconSrcOrNode={<Refresh />}
          text="Refresh"
          onClick={() => setRefetchCount((c) => c + 1)}
        />
      </Toolbar>
      <Totals countMetric={countMetric} maxMetric={maxMetric} minMetric={minMetric} avgMetric={avgMetric} />
      {selectedMetric === 'initiatorType' ? (
        <Chart
          type="bar"
          data={{
            labels: makeUnique(resourceAnalyticMetric.map((it) => it.value)),
            datasets: [
              {
                label: 'initiatorType',
                backgroundColor: analyticColors,
                data:
                  selectedMetric === 'initiatorType'
                    ? makeUnique(resourceAnalyticMetric.map((it) => it.value)).map(
                        (i) => resourceAnalyticMetric.filter((p) => p.value === i).length
                      )
                    : []
              }
            ]
          }}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            title: {
              text: makeHumanReadable(selectedMetric)
            }
          }}
        />
      ) : (
        <>
          {isResourceAnalyticMetric(selectedMetric) ? (
            <Chart
              type="line"
              data={{
                labels: resourceAnalyticMetric.map((it) => moment(it.analyzeStartAt).format('DD.MM.YY HH:mm')) || [],
                datasets: [
                  {
                    backgroundColor:
                      analyticColors[resourceAnalyticMetrics.indexOf(selectedMetric) % analyticColors.length],
                    label: makeHumanReadable(selectedMetric),
                    data: resourceAnalyticMetric.map((it) => it.value)
                  }
                ]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1
                  }
                },
                scales: getScaleRules({
                  yAxesLabel: makeHumanReadable(selectedMetric),
                  xAxesLabel: 'Time',
                  ySuggestedMax: Math.ceil(maxMetric * 1.1)
                }),
                title: {
                  text: makeHumanReadable(selectedMetric)
                }
              }}
            />
          ) : (
            <Chart
              type="bar"
              data={{
                labels: typeAggregatedResourceAnalyticMetric.map((it) => it['initiatorType']),
                datasets: typeAggregatedResponseLabels.map((label, index) => ({
                  backgroundColor: rotate(analyticColors, index),
                  label: makeHumanReadable(label),
                  data: typeAggregatedResourceAnalyticMetric.map((it) => it[label])
                }))
              }}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      }
                    }
                  ]
                },
                title: {
                  text: makeHumanReadable(selectedMetric)
                }
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default ResourceAnalytics
