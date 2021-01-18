import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../login/login-store'
import { AppState } from '../store'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: AppState) => state.user)

  let isLoggedIn = userInfo !== null

  const doLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="mb-5">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <strong>React Node Starter</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginLeft: 'auto' }}>
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={doLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
