import React from 'react'

import { SectionContainer, SectionBody } from './styles'

interface Props {
  className?: string
  title?: React.ReactNode
}

const Section: React.FC<Props> = ({ className, title, children, ...restTitleProps }) => (
  <SectionContainer className={className}>
    {title}
    <SectionBody>{children}</SectionBody>
  </SectionContainer>
)

export default Section
