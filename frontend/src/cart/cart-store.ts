import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../app/store'

const CART_ADD_ITEM = 'CART_ADD_ITEM'
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'

const cartInitialState: CartInitialState = {
  cartItems: [],
}

export const cartReducer = (state = cartInitialState, action: CartAction): CartInitialState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existingItem = state.cartItems.find((x: CartItem) => x.product === (item as CartItem).product)

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: CartItem) => (x.product === existingItem.product ? item : x) as CartItem),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] as CartItem[] }
      }
    case CART_REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter((item: CartItem) => item.product !== action.payload) }
    default:
      return state
  }
}

export const addToCart = (id: string, qty: number): ThunkAction<void, AppState, null, AddToCartAction> => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: string): ThunkAction<void, AppState, null, RemoveFromCartAction> => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export interface CartItem {
  product: string
  name: string
  image: string
  price: number
  countInStock: number
  qty: number
}

interface AddToCartAction {
  type: string
  payload: CartItem
}

interface RemoveFromCartAction {
  type: string
  payload: string
}

type CartAction = AddToCartAction | RemoveFromCartAction

interface CartInitialState {
  cartItems: CartItem[]
}
