import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const middlewares = [thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export type AppState = ReturnType<typeof rootReducer>
export default store
