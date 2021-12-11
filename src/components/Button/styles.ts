import styled, { css } from 'styled-components'
import LoadingIconOutlined from 'src/components/Icons/LoadingIcon'
import { isTouchScreen } from 'src/utils/responsiveness'

import { StyledButtonProps } from './types'

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  line-height: 1;
  font-weight: 700;
  font-size: max(0.7vw, 15px);
  padding: max(0.3vw, 8px) max(0.3vw, 8px);
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  svg {
    fill: ${({ theme }) => theme.palette.primary.contrastText};
    width: max(0.8vw, 15px);
    margin-right: max(0.3vw, 8px);
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: inherit;
    word-spacing: inherit;
    line-height: inherit;

    width: 100%;
    font-family: inherit;
    ${({ $isLoading }) =>
      $isLoading &&
      css`
        opacity: 0;
      `}
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    line-height: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    font-family: inherit;
    padding: inherit;
    word-spacing: inherit;
  }
  &:hover,
  &:active,
  &:focus {
    outline: 0px transparent !important;
  }
  ${!isTouchScreen() &&
  css`
    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.light};
      color: ${({ theme }) => theme.palette.primary.contrastText};
      border-color: ${({ theme }) => theme.palette.primary.light};
    }
  `}

  ${({ disabled }) =>
    disabled
      ? css`
          &,
          &:hover,
          &:active,
          &:focus {
            cursor: not-allowed;
            opacity: 0.6;
          }

          > * {
            pointer-events: none;
          }
        `
      : css`
          cursor: pointer;
        `}
`

export const LoadingIcon = styled(LoadingIconOutlined)`
  position: absolute;
`
