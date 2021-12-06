import styled from 'styled-components'

export const IconContainer = styled.div`
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
  padding: 12px;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  height: 24px;
  width: 24px;
  flex: 0 0 auto;
  :hover {
    background-color: rgba(60, 64, 67, 0.08);
    outline: none;
  }
  svg {
    fill: ${(props) => props.theme.palette.secondary.main};
    opacity: 1;
  }
`
