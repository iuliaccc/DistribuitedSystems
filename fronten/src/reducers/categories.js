// export const CATEGORIES=[
//     {name:"Income",categoryId:1},
//     {name:"Expense",categoryId:2}
// ]
const initialState = []

export default (state=initialState,{ type , payload })=>{
    switch(type){
        case 'ADD_CATEGORY':
            console.log(payload);
            return [
                ...state,
                payload    
            ];
        default :
            return state
    }
}


