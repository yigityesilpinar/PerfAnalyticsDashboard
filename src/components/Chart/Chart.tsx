import React, { useState, useEffect, useRef } from 'react'
import ChartJS, { ChartConfiguration } from 'chart.js'

import { ChartWrapper, EmptyChartContainer } from './styles'

interface Props extends ChartConfiguration {}

const Chart: React.FC<Props> = (chartProps) => {
  const { ...chartConfig } = chartProps

  const [chart, setCart] = useState<ChartJS>()
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chart) {
        chart.destroy()
      }
      setCart(
        new ChartJS(chartRef.current, {
          ...chartConfig,
          options: {
            ...chartConfig.options,
            title: {
              fontFamily: 'Roboto',
              display:
                typeof chartConfig.options?.title?.display !== 'undefined'
                  ? chartConfig.options?.title?.display
                  : !!chartConfig.options?.title,
              ...chartConfig.options?.title
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              ...chartConfig.options?.legend,
              labels: {
                fontFamily: 'Roboto',
                ...chartConfig.options?.legend?.labels
              }
            }
          }
        })
      )
    }
  }, [chartProps])

  const isEmptyChart = !chartConfig?.data?.labels?.length || chartConfig.data.labels.length === 0
  return (
    <ChartWrapper>
      {isEmptyChart && <EmptyChartContainer>No data</EmptyChartContainer>}
      <canvas ref={chartRef} />
    </ChartWrapper>
  )
}

export default Chart
