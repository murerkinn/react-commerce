import axios from 'axios'

const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

interface User {
  name: string
  email: string
  password: string
}

interface UserRegisterAction {
  type: String
  payload: Object
}

export const userRegisterReducer = (state = {}, action: UserRegisterAction) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const register = (user: User, history: any) => async (dispatch: Function) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    await axios.post('/api/account/register', { user })

    history.push('/login?registerSucces=1')
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    })
  }
}
