import axios from 'axios';
import { FETCH_USER } from './types'

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
