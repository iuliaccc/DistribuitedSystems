import {combineReducers} from "redux";
import categories  from './categories';
import categoryTypes from './categoryTypes'
import transactions from './transactions'

// export default combineReducers({
//     default: (state = [], action) => state,
// })
// types()
export default combineReducers({
    categories,
    categoryTypes,
    transactions
})