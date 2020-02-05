

const initialState = []

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "ADD_TRANSACTION":
        return [ ...state, Object.assign({},payload,{transactionDate:new Date(payload.transactionDate)}) ]

    default:
        return state
    }
}
