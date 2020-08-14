import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import { Header } from 'components'

import { Home, Leaderboard } from 'pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'

const App = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/leaderboard' component={Leaderboard} />
        <Redirect to='/' />
      </Switch>
    </Router>
  </>
)

export default App
