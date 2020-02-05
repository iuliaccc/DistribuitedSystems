import React from 'react'

import { CATEGORIES } from '../reducers/categories';
import Category from '../containers/CategoryTypesContainer'
import CategoryTypeDialog from './CategoryTypeDIalog';
import { ExpansionPanel } from '@material-ui/core';

const {createApolloFetch}=require('apollo-fetch')
export const fetch = createApolloFetch({
    uri:'http://localhost:4000/'
})



class CategoiesList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isCategoryDialogOpen:false,
            isLoaded:false
        }
        
    }
   

    async componentDidMount() {


        // ToDo: schimba in getCategoriesTypesByCategoryId sau name
        await fetch({
            query: `{getCategories{
                    name,
                    categoryId
                }}`
            })
        .then((response)=>{
            console.log(response.data);
            response.data.getCategories.map((category)=>{
                console.log(category);
                this.props.addCategoryToStore(category)})
        })
        // await Promise.all(getCategoriesFromGraphQL,getCategoryTypesFromGraphQL)
        
        this.setState({isLoaded:true})
    }

    


render(){
    if(this.state.isLoaded)
    return(
        <div style={{display:'flex'}}>
            {this.props.categories.map((category)=>(
                <Category category={category}/>
            ))}


        
        
        
        
        </div>
    )
    else return null 
}



}


export default CategoiesList