import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './common/header'
import Home from '../home/home'
import Login from '../login/login'
import Register from '../register/register'
import Dashboard from '../dashboard/dashboard'
import { AppState } from './store'

const Routes = () => {
  const { userInfo } = useSelector((state: AppState) => state.user)

  let isLoggedIn = userInfo !== null

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login">{!isLoggedIn ? <Login /> : <Redirect to="/dashboard" />}</Route>
        <Route path="/register">{!isLoggedIn ? <Register /> : <Redirect to="/dashboard" />}</Route>
        <Route path="/dashboard">{isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}</Route>
      </Switch>
    </Router>
  )
}

export default Routes
