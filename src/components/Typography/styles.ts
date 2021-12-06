import styled, { css } from 'styled-components'
import { Props } from './Typography'

const getElemtypeForVariant = (variant: Props['variant'] = 'body') => {
  if (['h1', 'h2', 'h3', 'h4'].includes(variant)) {
    return variant
  }
  return 'h5'
}

export const Container = styled.h4.attrs((props: Props) => ({
  ...props,
  as: getElemtypeForVariant(props.variant)
}))<Props>`
  color: ${(props) => props.theme.palette.text.main};
  margin: 0;
  ${(props) =>
    props.variant === 'h1' &&
    css`
      font-size: max(2.7vw, 36px);
      line-height: max(3.6vw, 48px);
      font-weight: 900;
      color: ${props.theme.palette.green.light};
    `};
  ${(props) =>
    props.variant === 'h2' &&
    css`
      font-size: 24px;
      line-height: 24px;
      font-weight: 300;
    `};

  ${(props) =>
    props.variant === 'body' &&
    css`
      font-size: max(1.5vw, 20px);
      line-height: max(2vw, 27px);
      font-weight: 300;
    `};

  ${(props) =>
    props.variant === 'inputLabel' &&
    css`
      font-weight: bold;
      font-size: max(1.5vw, 20px);
      line-height: max(2vw, 27px);
      font-weight: 300;
    `};
`
