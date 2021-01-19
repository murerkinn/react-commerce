import { combineReducers } from 'redux'
import { userReducer } from '../login/login-store'
import { userRegisterReducer } from '../register/register-store'
import { productListReducer, productDetailsReducer } from '../product/product-store'
import { cartReducer } from '../cart/cart-store'

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  userRegisterReducer,
})

export default rootReducer
