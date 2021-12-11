import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

import Section from 'src/components/Section'
import Hamburger from 'src/components/Icons/Hamburger'
import Typography from 'src/components/Typography'
import { navLinks } from 'src/routes/config'

import GlobalStyles from './GlobalStyles'
import { AppContainer, RouteContainer, RouteContent, AppBar, IconContainer } from './styles'

interface Props {}

const DefaulLayout: React.FC<Props> = ({ children }) => (
  <AppContainer>
    <GlobalStyles />
    <RouteContainer>
      <RouteContent>
        <Section>
          <AppBar>
            <IconContainer>
              <Hamburger />
            </IconContainer>
            <Typography variant="h1">PerfAnalytics Dashboard</Typography>
          </AppBar>
          <AppBar>
            {navLinks.map((config) => (
              <RouterLink key={config.path as string} to={config.path as string}>
                <Typography variant="h2">{config.displayName}</Typography>
              </RouterLink>
            ))}
          </AppBar>
          {children}
        </Section>
      </RouteContent>
    </RouteContainer>
  </AppContainer>
)

export default DefaulLayout
