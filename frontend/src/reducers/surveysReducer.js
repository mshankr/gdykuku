import { FETCH_SURVEYS } from '../actions/types'

                  // null = it's still loading
export default function(state = [], action) {
  // console.log('action', action);
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload
    default:
      return state;
  }
}
