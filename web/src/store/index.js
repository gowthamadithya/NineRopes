// index.js (STORE)
import { createStore } from 'redux'
import postDataReducer from './reducers/postData.reducers'


export default createStore(postDataReducer)