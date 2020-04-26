import React, { Component } from 'react'
import Home from './Home'
import TopBar from '../components/Bar/TopBar'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Router >
          <TopBar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <Route path="/sign-up" component={Signup} />
          </Switch>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
          <Switch>
            <Route path="/profile/:username" component={Profile} />
          </Switch>
         
        </Router>
      </div>
    )
  }
}
