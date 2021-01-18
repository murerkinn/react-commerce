import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../app/store'

const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL'

export const productListReducer = (state = productListInitialState, action: GetProductsAction): ProductListState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, error: '', products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { products: [], loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = productDetailsInitialState,
  action: GetProductDetailsAction
): ProductDetailsState => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: '' }
    case PRODUCT_DETAILS_FAIL:
      return { product: null, loading: false, error: action.payload }
    default:
      return state
  }
}

export const getProducts = (): ThunkAction<void, AppState, null, GetProductsAction> => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.response?.data?.message ? err.response?.data?.message : err.message,
    })
  }
}

export const getProductDetails = (
  id: string
): ThunkAction<void, AppState, null, GetProductDetailsAction> => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    console.log(data)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response?.data?.message ? err.response?.data?.message : err.message,
    })
  }
}

interface ReviewData {
  name: string
  rating: number
  comment: string
}

export interface ProductData {
  _id: string
  user: object
  name: string
  image: string
  brand: string
  category: string
  description: string
  reviews: ReviewData[]
  rating: number
  numReviews: number
  price: number
  countInStock: number
}

interface ProductListState {
  products: ProductData[] | null
  loading: boolean
  error: string
}

interface ProductDetailsState {
  product: ProductData | null
  loading: boolean
  error: string
}

interface GetProductsAction {
  type: string
  payload?: any
}

interface GetProductDetailsAction {
  type: string
  payload?: any
}

const productListInitialState: ProductListState = {
  products: [],
  loading: false,
  error: '',
}

const productDetailsInitialState: ProductDetailsState = {
  product: null,
  loading: false,
  error: '',
}
