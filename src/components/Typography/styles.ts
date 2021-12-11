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
  color: ${(props) => props.theme.palette.text.primary};
  line-height: 1.2;
  margin: 0;
  ${(props) =>
    props.variant === 'h1' &&
    css`
      font-size: max(1.2vw, 18px);
      line-height: max(1.4vw, 20px);
      font-weight: 700;
    `};
  ${(props) =>
    props.variant === 'h2' &&
    css`
      font-size: max(0.9vw, 15px);
      font-weight: 500;
    `};

  ${(props) =>
    props.variant === 'body' &&
    css`
      font-size: max(0.7vw, 13px);
      font-weight: 300;
    `};

  ${(props) =>
    props.variant === 'inputLabel' &&
    css`
      font-size: max(0.7vw, 13px);
      font-weight: 700;
    `};
`
