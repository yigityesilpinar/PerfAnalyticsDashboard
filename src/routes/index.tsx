import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import defaultTheme from 'src/styles/theme'
import Layout from 'src/layouts/Default'
import appRoutes from 'src/routes/config'
import { AppStateProvider } from 'src/context/AppStateContext'

const AppRoutes: React.FC<unknown> = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppStateProvider>
      <Layout>
        <Switch>
          {appRoutes.map((routeProps, index) => (
            <Route key={index} {...routeProps} />
          ))}
        </Switch>
      </Layout>
    </AppStateProvider>
  </ThemeProvider>
)

export default AppRoutes
