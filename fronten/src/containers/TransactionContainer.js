import { addTransaction, updateCategoryType, deleteCategoryType } from "../actions";
import { connect } from 'react-redux';
import CategoryType from './../components/CategoryType';


const mapStateToProps = (state) => ({
    transactions:state.transactions
})

const mapDispatchToProps = dispatch => ({
    addTransactionToStore:(transaction)=>dispatch(addTransaction(transaction)),
    updateCategoryTypeToStore:(categoryType)=>dispatch(updateCategoryType(categoryType)),
    deleteCategoryTypeToStore:(typeId)=>dispatch(deleteCategoryType(typeId))
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryType)
