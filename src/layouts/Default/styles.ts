import styled from 'styled-components'

export const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`

export const AppBar = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: center;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  > *:not(:first-child) {
    margin-left: 20px;
  }
`

export const RouteContainer = styled.div`
  display: flex;
  height: 100vh;
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    align-items: flex-start;
  }
`

export const RouteContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  max-height: 100%;
  overflow: auto;
`

export const IconContainer = styled.div`
  display: inline-block;
  margin: 0 4px;
  padding-top: 4px;
  vertical-align: middle;
  svg {
    width: max(1.6vw, 24px);
    height: max(1.6vw, 24px);
    fill: ${({ theme }) => theme.palette.text.primary};
    opacity: 1;
  }
`
