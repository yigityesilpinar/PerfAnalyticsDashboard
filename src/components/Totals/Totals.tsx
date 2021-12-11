import React from 'react'

import { parseNumber } from './utils'
import { TotalsWrapper, TotalsContainer, Total, TotalNumber, TotalText } from './styles'

interface TotalsProps {
  countMetric: number
  maxMetric: number
  minMetric: number
  avgMetric: number
}
const Totals: React.FC<TotalsProps> = ({ countMetric, maxMetric, minMetric, avgMetric }) => (
  <TotalsWrapper>
    <TotalsContainer>
      <Total>
        <TotalText>Total events</TotalText>
        <TotalNumber>{parseNumber(countMetric)}</TotalNumber>
      </Total>
      <Total>
        <TotalText>Avg</TotalText>
        <TotalNumber>{parseNumber(avgMetric)}</TotalNumber>
      </Total>
      <Total>
        <TotalText>Max</TotalText>
        <TotalNumber>{parseNumber(maxMetric)}</TotalNumber>
      </Total>
      <Total>
        <TotalText>Min</TotalText>
        <TotalNumber>{parseNumber(minMetric)}</TotalNumber>
      </Total>
    </TotalsContainer>
  </TotalsWrapper>
)

export default Totals
