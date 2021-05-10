import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalStyle from './styles/global'

import Routes from './routes'

export default function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="container" id="main-container">
          <Routes />
        </div>
      </div>

      <GlobalStyle />
    </Router>
  )
}
