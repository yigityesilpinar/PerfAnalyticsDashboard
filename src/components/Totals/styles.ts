import styled from 'styled-components'


export const TotalsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    flex-direction: column;
  }
`

export const TotalsContainer = styled.div`
  display: flex;
  margin: 15px 0;
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
`
export const TotalNumber = styled.div`
  font-weight: bold;
  font-size: 36px;
  padding: 5px 15px;
`

export const TotalText = styled.div`
  font-size: 18px;
  text-align: left;
  padding-left: 15px;
  line-height: 1.2;
`

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  width: 200px;
  :not(:first-child) {
    margin-left: 20px;
  }
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    :not(:first-child) {
      margin-left: 0;
    }
    margin: 10px 0;
    flex-basis: 47%;
    overflow: hidden;
    ${TotalText} {
      font-size: 4vw;
    }
    ${TotalNumber} {
      font-size: 5vw;
    }
  }
`