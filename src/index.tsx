import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'

import App from './App'

loadableReady(() => {
  const root = document.getElementById('root')
  hydrate(<App />, root)
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  module.hot.accept()
}
