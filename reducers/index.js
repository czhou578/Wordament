
import { combineReducers } from "redux";

export const allReducers = combineReducers({
  didFileUpload = reducer
})

const reducer = (state = {value: false}, action) => {
  switch(action.type) {
    case 'FILE_UPLOADED':
      return {value: state.value = true}
    default:
      return state
  }
}