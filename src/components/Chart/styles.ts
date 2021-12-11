import styled from 'styled-components'

export const ChartWrapper = styled.div`
  position: relative;
  min-height: 450px;
  transform: translateZ(0);
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    width: 100%;
  }
`

export const EmptyChartContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 24px;
  opacity: 0.5;
`
