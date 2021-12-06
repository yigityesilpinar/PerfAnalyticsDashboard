import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppRoutes from 'src/routes'

const App: React.FC<unknown> = () => (
  <Router>
    <AppRoutes />
  </Router>
)

export default App
