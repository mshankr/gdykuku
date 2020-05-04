import { combineReducers } from 'redux'
import authReducer from './authReducer'

export default combineReducers ({
  auth: authReducer,
  // auth piece of state is manufactured / produced by the authReducer
})
