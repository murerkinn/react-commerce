import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './common/header'
import ProductList from '../product/product-list'
import Login from '../login/login'
import Register from '../register/register'
import Dashboard from '../dashboard/dashboard'
import ProductDetails from '../product/product-details'
import Cart from '../cart/cart'
import { AppState } from './store'

const Routes = () => {
  const { userInfo } = useSelector((state: AppState) => state.user)

  let isLoggedIn = userInfo !== null

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={ProductList} exact />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/login">{!isLoggedIn ? <Login /> : <Redirect to="/dashboard" />}</Route>
            <Route path="/register">{!isLoggedIn ? <Register /> : <Redirect to="/dashboard" />}</Route>
            <Route path="/dashboard">{isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}</Route>
            <Route path="/cart/:id?" component={Cart} />
          </Switch>
        </Container>
      </main>
    </Router>
  )
}

export default Routes
