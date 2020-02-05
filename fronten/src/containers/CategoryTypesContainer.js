import { connect } from 'react-redux'
import Category from '../components/Category'
import { addCategoryType, updateCategoryType } from './../actions/index';



const mapStateToProps = (state) => ({
    categoryTypes: state.categoryTypes    
})

const mapDispatchToProps = dispatch=> ({
    addCategoryTypeToStore:(categoryType)=>dispatch(addCategoryType(categoryType)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Category)
