import { combineReducers } from 'redux'
import { userReducer } from '../login/login-store'
import { userRegisterReducer } from '../register/register-store'
import { productListReducer, productDetailsReducer } from '../product/product-store'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  userRegisterReducer,
})

export default rootReducer
