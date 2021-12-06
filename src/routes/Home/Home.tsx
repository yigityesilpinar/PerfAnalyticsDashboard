import React, { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'
import DatePicker from 'antd/lib/date-picker'

import Typography from 'src/components/Typography'
import Section from 'src/components/Section'
import Chart from 'src/components/Chart'
import { RouteContainer, RouteContent } from 'src/routes/styles'
import { isTouchScreen } from 'src/utils/responsiveness'

import { PerformanceMetricsData } from './types'
import { getScaleRules } from './utilts'
import { MAX_ANALYTICS_QUERY_RANGE_IN_DAYS } from './config'
import {
  AnalyticsContainer,
  Toolbar,
  EmptyChartContainer,
  ChartContainer,
  TotalsContainer,
  Total,
  TotalNumber,
  TotalText
} from './styles'

const Home: React.FC = () => {
  const selectedAnalyticsAccountId = 1
  const [dateRange, setDateRange] = useState<[Moment, Moment]>([moment().subtract(30, 'minutes'), moment()])
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricsData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    fetch(
      `${
        window.passedToClient.perfAnalyticsApi
      }/account/${selectedAnalyticsAccountId}/analytics?start=${dateRange[0].toISOString()}&end=${dateRange[1].toISOString()}`
    )
      .then((it) => it.json())
      .then((res) => setPerformanceMetrics(res.data))
      .finally(() => setIsLoading(false))
  }, [dateRange])

  const performanceMetricsLabels = performanceMetrics.map((it) => it.analyzeStartAt)
  return (
    <RouteContainer>
      <RouteContent>
        <Section>
          <Toolbar>
            <div>
              <Typography variant="inputLabel">dateRange</Typography>
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
            </div>
          </Toolbar>
          <AnalyticsContainer>
            <ChartContainer>
              <TotalsContainer>
                <Total>
                  <TotalText>Total requests</TotalText>
                  <TotalNumber>333</TotalNumber>
                </Total>
              </TotalsContainer>
            </ChartContainer>
          </AnalyticsContainer>
        </Section>
      </RouteContent>
      <ChartContainer>
        {/* TODO:  */}
        {false && <EmptyChartContainer>no data</EmptyChartContainer>}
        <Chart
          type="doughnut"
          data={{
            labels: [1, 2, 3, 4, 5],
            datasets: [
              {
                data: [23123231]
              }
            ]
          }}
          options={{
            legend: {
              position: 'top'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            },
            title: {
              text: 'Title'
            }
          }}
        />
      </ChartContainer>
      <ChartContainer>
        <Chart
          type="line"
          data={{
            labels: performanceMetricsLabels || [],
            datasets: [
              {
                label: 'TTFB',
                data: performanceMetrics.map((it) => it.ttfb)
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
              yAxesLabel: 'TTFB',
              xAxesLabel: 'Time',
              ySuggestedMax: Math.ceil(Math.max(...performanceMetrics.map((it) => it.ttfb)) * 1.1)
            }),
            title: {
              text: 'TTFB'
            }
          }}
        />
      </ChartContainer>
    </RouteContainer>
  )
}

export default Home
