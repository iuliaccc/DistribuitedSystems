




export const addCategory=category=>({
    type:'ADD_CATEGORY',
    payload:category
})

export const addTransaction=(transaction)=>({
    type:'ADD_TRANSACTION',
    payload:transaction,
})

export const addCategoryType=(categoryType)=>({
    type:'ADD_CATEGORY_TYPE',
    payload:categoryType
})

export const updateCategoryType=(categoryType)=>({
    type:'UPDATE_CATEGORY_TYPE',
    payload:categoryType,
})

export const deleteCategoryType=(typeId)=>({
    type:'DELETE_CATEGORY_TYPE',
    payload:typeId
})

