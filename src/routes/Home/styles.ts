import styled, { css } from 'styled-components'

export const ChartContainer = styled.div`
  position: relative;
`

export const AnalyticsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${ChartContainer} {
    width: 45%;
    margin: 2.5% 0;
  }
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    ${ChartContainer} {
      width: initial;
    }
  }
`

export const TotalsContainer = styled.div``

export const TotalNumber = styled.div`
  font-weight: bold;
  font-size: 40px;
  padding: 5px 15px;
`

export const TotalText = styled.div`
  font-family: bold ;
  font-size: 18px;
  text-align: left;
  padding-left: 15px;
`

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  max-width: 400px;
  @media screen and (max-width: 1200px) {
    ${TotalText} {
      font-size: 14px;
      padding-bottom: 5px;
    }
    ${TotalNumber} {
      font-size: 20px;
    }
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
`

export const Toolbar = styled.div`
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    > :last-child {
      margin-top: 10px;
    }
  }
`

export const ShortcutContainer = styled.div`
  margin-top: 10px;
`
export const Delimeter = styled.span`
  margin: 0 10px;
`
