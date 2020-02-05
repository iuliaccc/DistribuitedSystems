import React from 'react'

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, ExpansionPanelActions } from "@material-ui/core";
import TransactionDialog from './TransactionDialog';
import CategoryTypeDialog from './CategoryTypeDIalog';
import { fetchCategoryTypes } from './Category';
const {createApolloFetch}=require('apollo-fetch')

export const fetchTransactionsFromCategoryType = createApolloFetch({
    uri:'http://localhost:4003/'
})

export default class CategoryType extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isLoaded:false,
            isTransactionDialogOpen:false,
            isCategoryDialogOpen:false
        }  
    this.handleShowTransactions=this.handleShowTransactions.bind(this)
    this.closeTransactionDialog=this.closeTransactionDialog.bind(this)
    this.CloseCategoryDialog=this.CloseCategoryDialog.bind(this)
    this.handleDeleteCategorytype=this.handleDeleteCategorytype.bind(this)
    }

    async componentDidMount(){
        console.log(this.props)
        //get transactions
       
    }
    closeTransactionDialog=()=>{
        this.setState({isTransactionDialogOpen:false})
    }

    CloseCategoryDialog=()=>{
        this.setState({isCategoryDialogOpen:false})
    }
    async handleShowTransactions(){
        if(!this.state.isLoaded)
        await fetchTransactionsFromCategoryType({
            query: `{
                getCategoryTypeById(typeId:${this.props.typeId}){
                typeId
                name
                transactions {
                    transactionId,
                    transactionDate,
                    sum,
                    remarks,
                    typeId
                }
                }
            }`
        }).then((response)=>{
            console.log(response.data)
            response.data.getCategoryTypeById.transactions&&response.data.getCategoryTypeById.transactions.map((transaction)=>{
                this.props.addTransactionToStore(transaction)

            })
        })
        this.setState({isLoaded:true})
    }

    async handleDeleteCategorytype(){

        await fetchCategoryTypes({
            query: `mutation
                        {deleteCategoryType(typeId:${this.props.typeId}){
                            text
                        }
            
                    }`
        }).then((response)=>{
            console.log(response);
            if(response.data.deleteCategoryType.text==='Item deleted')
                this.props.deleteCategoryTypeToStore(this.props.typeId)
        })
    }



    render() {

        return(
            <div style={{width:'85%',display:'flex'}} >
            <ExpansionPanel style={{width:'80%'}}>
                <ExpansionPanelSummary onClick={this.handleShowTransactions}>
                    <h3>{this.props.name}</h3>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display:'block'}}>
                <span>Description: {this.props.description}</span> <Divider/>
                        {/* {JSON.stringify(this.props.transactions)} */}
                        {this.props.transactions.filter(transaction=>transaction.typeId===this.props.typeId).map((transaction)=>(
                            <div>
                                
                                Sum: {transaction.sum}<br/>
                                Remarks: {transaction.remarks}<br/>
                                transactionDate: {new Date(transaction.transactionDate).toDateString()}
                                <Divider/>
                            </div>
                        ))}
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                            <button onClick={()=>{this.setState({isTransactionDialogOpen:true})}}>Add a Transaction</button>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <div style={{width:'20%',display:'flex'}}>
                <button onClick={this.handleDeleteCategorytype}>Delete this Type</button>
                <button onClick={()=>{this.setState({isCategoryDialogOpen:true})}}>Edit this Type</button>
            </div>
            <CategoryTypeDialog isCategoryDialogOpen={this.state.isCategoryDialogOpen} CloseCategoryDialog={this.CloseCategoryDialog}
            categoryTypeId={this.props.typeId} updateCategoryTypeToStore={this.props.updateCategoryTypeToStore}
            categoryTypeName={this.props.name} categoryTypeDescription={this.props.description} categoryTypeCategoryId={this.props.categoryId}/> 
             <TransactionDialog closeTransactionDialog={this.closeTransactionDialog} typeId={this.props.typeId}
            isTransactionDialogOpen={this.state.isTransactionDialogOpen} addTransactionToStore={this.props.addTransactionToStore}/> 
            </div>
        )
    }
}