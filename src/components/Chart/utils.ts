import { ChartOptions } from 'chart.js'

interface GetScaleRulesOptions {
  yAxesLabel: string
  xAxesLabel: string
  ySuggestedMax?: number
}

export const getScaleRules: (options: GetScaleRulesOptions) => Partial<ChartOptions['scales']> = ({
  yAxesLabel,
  xAxesLabel,
  ySuggestedMax
}) => ({
  xAxes: [
    {
      scaleLabel: {
        display: true,
        labelString: xAxesLabel
      },
      ticks: {
        fontSize: 10
      }
    }
  ],
  yAxes: [
    {
      scaleLabel: {
        display: true,
        labelString: yAxesLabel
      },
      ticks: {
        beginAtZero: true,
        fontSize: 10,
        maxTicksLimit: 5,
        stepSize: 1,
        ...(ySuggestedMax ? { suggestedMax: ySuggestedMax } : {})
      }
    }
  ]
})