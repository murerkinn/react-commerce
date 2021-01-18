import axios from 'axios'

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'

const USER_LOGOUT_REQUEST = 'USER_LOGOUT'
const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
const USER_LOGOUT_FAIL = 'USER_LOGOUT_FAIL'

const USER_FETCH_SESSION_REQUEST = 'FETCH_SESSION_REQUEST'
const USER_FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS'
const USER_FETCH_SESSION_FAIL = 'FETCH_SESSION_FAIL'

interface UserStateType {
  userInfo: {
    _id: string
    name: string
    email: string
    password: string
  } | null
}

interface UserCredentials {
  email: string
  password: string
}

interface IAction {
  type: String
  payload: UserStateType | null
}

const initialStateUser: UserStateType = {
  userInfo: null,
}

export const userReducer = (state = initialStateUser, action: IAction) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGOUT_REQUEST:
    case USER_FETCH_SESSION_REQUEST:
      return { loading: true }
    case USER_FETCH_SESSION_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
    case USER_LOGOUT_FAIL:
    case USER_FETCH_SESSION_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT_SUCCESS:
      return { loading: false, userInfo: null }
    default:
      return state
  }
}

export const login = (credentials: UserCredentials) => async (dispatch: Function) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const { data } = await axios.post('/api/account/session', credentials)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    })
  }
}

export const logout = () => async (dispatch: Function) => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    })

    await axios.delete('/api/account/session')

    dispatch({
      type: USER_LOGOUT_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    })
  }
}

export const fetchSession = () => async (dispatch: Function) => {
  try {
    dispatch({
      type: USER_FETCH_SESSION_REQUEST,
    })

    const { data } = await axios.get('/api/account/session')

    dispatch({
      type: USER_FETCH_SESSION_SUCCESS,
      payload: data || null,
    })
  } catch (err) {
    dispatch({
      type: USER_FETCH_SESSION_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    })
  }
}
