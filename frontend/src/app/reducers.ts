import { combineReducers } from 'redux'
import { userReducer } from '../login/login-store'
import { userRegisterReducer } from '../register/register-store'

const rootReducer = combineReducers({
  user: userReducer,
  userRegisterReducer,
})

export default rootReducer
