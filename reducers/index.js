
import { combineReducers } from "redux";
// const allReducers =   

const reducer = (state = {value: false}, action) => {
  switch(action.type) {
    case 'FILE_UPLOADED':
      return {value: state.value = true}
    default:
      return state
  }
}