import { FETCH_USER } from '../actions/types'

                  // null = it's still loading
export default function(state = null, action) {
  // console.log('action', action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false
    default:
      return state;
  }
}
