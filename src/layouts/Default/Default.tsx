import React from 'react'

import { AppContainer, AppContentContainer, GlobalStyles } from './styles'

interface Props {}

const DefaulLayout: React.FC<Props> = ({ children }) => (
  <AppContainer>
    <GlobalStyles />
    <AppContentContainer>{children}</AppContentContainer>
  </AppContainer>
)

export default DefaulLayout
