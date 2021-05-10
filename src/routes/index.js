import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import LoanPurpose from '../pages/LoanPurpose'
import TimeToBuyHome from '../pages/TimeToBuyHome'
import Results from '../pages/Results'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cadastro" component={SignUp} />
      <Route path="/tempo" component={TimeToBuyHome} />
      <Route path="/finalidade" component={LoanPurpose} />
      <Route path="/resultado" component={Results} />
    </Switch>
  )
}
