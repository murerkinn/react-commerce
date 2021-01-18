import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSession } from '../login/login-store'
import Routes from './routes'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSession())
  }, [dispatch])

  return (
    <>
      <Routes />
    </>
  )
}

export default App
