import user from "./user";
import { combineReducers } from 'redux'
import cart from './cart'

const rootReducer = combineReducers({
    user, cart
})

export default rootReducer;