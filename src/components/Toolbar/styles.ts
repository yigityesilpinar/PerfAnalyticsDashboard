import styled from 'styled-components'

export const ToolbarContainer = styled.div`
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  @media screen and (max-width: ${({ theme }) => theme.mobileBreakPoint}) {
    flex-direction: column;
    align-items: flex-start;
    > * {
      margin: 10px 0;
      width: 100%;
    }
    > :last-child {
      margin-top: 10px;
      margin-left: auto;
    }
    > :first-child {
      margin-left: 0;
    }
  }
`
