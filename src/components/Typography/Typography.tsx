import React from 'react'

import { Container } from './styles'

export interface Props {
  className?: string
  variant?: 'h1' | 'h2' | 'body' | 'inputLabel'
}

const Typography: React.FC<Props> = ({ children, variant = 'body', ...props }) => (
  <Container variant={variant} {...props}>
    {children}
  </Container>
)

export default Typography
