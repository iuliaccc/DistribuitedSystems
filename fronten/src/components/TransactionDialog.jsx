import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { fetch } from './CategoriesList';
import { isNullOrUndefined } from 'util';
const {createApolloFetch}=require('apollo-fetch')

export const fetchTransactions = createApolloFetch({
    uri:'http://localhost:4002/'
})
 const TransactionDialog =(props)=>{


    const [sum,setSum]=React.useState(null)
    const [remarks,setRemarks]=React.useState('')
    const [inputDate,setInputDate]=React.useState(null)
    const [inputTime,setInputTime]=React.useState(null)

    const handleChange=(e)=>{
    if(e.target.name==='sum')
        setSum(e.target.value)
    if(e.target.name==='remarks')
        setRemarks(e.target.value)
    if(e.target.name==='inputDate')
        setInputDate(e.target.value)
    if(e.target.name==='inputTime')
        {setInputTime(e.target.value)
        console.log(e.target.value)
}
    }

    const closeDialog=()=>{
        setInputDate(null)
            setInputTime(null)
            setRemarks('')
            setSum(null)
            props.closeTransactionDialog()
    }
//adaugare de tranzactie, cere request de la transactionmicroservice
    const SaveTransaction= async (transactionDate)=>{
        
         await fetchTransactions({
            query:` mutation {
                postTransaction(remarks:"${remarks}",sum:${sum},typeId:${props.typeId},
                transactionDate:"${transactionDate}"){
                    typeId,
                    remarks,
                    transactionDate,
                    sum,
                    transactionId
                }
            }
            `
        }).then((res)=>{
            console.log(res);
            props.addTransactionToStore(res.data.postTransaction)
            setInputDate(null)
            setInputTime(null)
            setRemarks('')
            setSum(null)
        })
        closeDialog()
    }
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input])

    return(
        <Dialog open={props.isTransactionDialogOpen}> 
            <DialogTitle>
                Add a new Transaction
            </DialogTitle>
            <DialogContent>
                    <TextField name="remarks" label="remarks" value={remarks} onChange={handleChange}/><br/>
                    <TextField type="number" name="sum" label="sum" value={sum} onChange={handleChange}/><br/>
                    <TextField type="date" name="inputDate" label="transactionDate" 
                    value={inputDate} onChange={handleChange}/>
                    <TextField type="time" name="inputTime" label="transactionTime" 
                    value={inputTime} onChange={handleChange}/>
            </DialogContent>
            <DialogActions>
                    <button onClick={()=>{
                        let transactionDate=new Date()
                        if(!isNullOrUndefined(inputTime))
                            transactionDate=new Date(inputDate+' '+inputTime.toString())
                        else if(!isNullOrUndefined(inputDate))
                                {console.log(inputDate)
                                transactionDate=new Date(inputDate)}
                        SaveTransaction(transactionDate)
                    }}>Save Transaction</button>
                    <button onClick={()=>{closeDialog()}}>Close</button>
            </DialogActions>
        </Dialog>
    )


}
export default TransactionDialog