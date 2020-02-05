import { connect } from 'react-redux'
 import CategoriesList from '../components/CategoriesList'
import { addCategory } from './../actions/index';

const mapStateToProps = (state) => ({
    categories: state.categories,
    // categoryTypes: state.categoryTypes
})

const mapDispatchToProps = dispatch => ({
        addCategoryToStore:(category)=>dispatch(addCategory(category))
})



export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
