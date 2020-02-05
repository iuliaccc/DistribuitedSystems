import React, { Component } from 'react'
import CategoryTypeDialog from './CategoryTypeDIalog';
import { fetch } from './CategoriesList';
import { addCategoryType } from './../actions/index';
import CategoryType from '../containers/TransactionContainer';

const {createApolloFetch}=require('apollo-fetch')

export const fetchCategoryTypes = createApolloFetch({
    uri:'http://localhost:4003/'
})

export default class Category extends Component{

    constructor(props){
        super(props)
        this.state={
            isLoaded:false,
            isCategoryDialogOpen:false
            
        }
    
        
    }
    CloseCategoryDialog=()=>{
        this.setState({isCategoryDialogOpen:false})
    }
    async componentDidMount(){
        console.log(this.props);
        await fetchCategoryTypes({
            query: `{getTypesByCategoryId(categoryId:${this.props.category.categoryId}){
                    typeId,
                    name,
                    description,
                    categoryId
                }}`
            })
        .then((response)=>{
            console.log(response.data);
            response.data.getTypesByCategoryId.map((categoryType)=>{
                console.log(categoryType);
                this.props.addCategoryTypeToStore(categoryType)})
        })
        console.log('inside graphql fetch');
        this.setState({isLoaded:true})
    }

    render(){

        if(this.state.isLoaded)
        return(
            <div style={{width:'50%',height:'100vh'}} >
                <h3>{this.props.category.name}</h3>
                <button onClick={()=>{this.setState({isCategoryDialogOpen:true})}}>Add a new {this.props.category.name}Type</button>
                <CategoryTypeDialog isCategoryDialogOpen={this.state.isCategoryDialogOpen} CloseCategoryDialog={this.CloseCategoryDialog}
                categoryId={this.props.category.categoryId} name={this.props.category.name} addCategoryTypeToStore={this.props.addCategoryTypeToStore}
                />
                
                <div>
                    {/* map pe types creare componenta noua , cu filtru*/}
                    {console.log(this.props.categoryTypes)}
                    {this.props.categoryTypes.filter((categoryType)=>{
                        return categoryType.categoryId===this.props.category.categoryId}
                        ).map((categoryType)=>(
                        
                            <CategoryType name={categoryType.name} typeId={categoryType.typeId}
                             description={categoryType.description} categoryId={categoryType.categoryId}> 
                                {/* <CategoryType category={categoryType}/> */}
                                
                            </CategoryType>
                            
                    ))}
                </div>
            </div>
        )
        else return <p>Loading</p>
    }
}
