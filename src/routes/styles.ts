import styled from 'styled-components'

export const RouteContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    align-items: flex-start;
  }
`

export const RouteContent = styled.div`
  display: flex;
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    flex-direction: column;
    align-items: center;
    [class*='col-'] {
      width: 80%;
    }
  }
`
