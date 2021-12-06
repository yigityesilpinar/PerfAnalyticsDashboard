import React, { useState, useEffect, useRef } from 'react'
import ChartJS, { ChartConfiguration } from 'chart.js'

import { ChartContainer } from './styles'

interface Props extends ChartConfiguration {
  onLabelClick?: (labelStr: string) => void
}

const Chart: React.FC<Props> = (chartProps) => {
  const { onLabelClick, ...chartConfig } = chartProps

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
            ...(onLabelClick
              ? {
                  onClick: (_, i) => {
                    const e = i ? (i[0] as any) : undefined
                    if (chartProps.data?.labels && e && '_index' in e) {
                      const label = chartProps.data.labels[e._index]
                      if (typeof label === 'string') {
                        onLabelClick(label)
                      }
                    }
                  },
                  hover: {
                    onHover(e) {
                      const point = this.getElementAtEvent(e)
                      const target = e.target as HTMLElement | undefined
                      if (target) {
                        if (point.length) {
                          target.style.cursor = 'pointer'
                        } else {
                          target.style.cursor = 'default'
                        }
                      }
                    }
                  }
                }
              : {}),
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

  return (
    <ChartContainer>
      <canvas ref={chartRef} />
    </ChartContainer>
  )
}

export default Chart
