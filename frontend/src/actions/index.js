// expects us to return an action
// by direct execute OR an object specifying action type!
import axios from 'axios';
import { FETCH_USER } from './types'
import { FETCH_SURVEYS } from './types'

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user')
    // console.log('axios response', res);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.log(err)
  }
  }

export const handleToken = (token) => async dispatch => {
  try {
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)
  history.push('/surveys')
  // res.data = current user n credits left!
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
try {
    const res = await axios.get('/api/surveys')
    console.log(res);
    dispatch({ type: FETCH_SURVEYS, payload: res.data })
  } catch (err) {
    console.log(err);
  }
}
