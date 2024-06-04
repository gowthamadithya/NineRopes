//post data reducer
import { ADDPOST } from '../actions/postData.actions'

const postDataReducer = (state = { postData: [] }, action) => {
    switch (action.type) {
      case ADDPOST: return { postData: [...state.postData, action.payload] }
      default: return state
    }
}

export default postDataReducer