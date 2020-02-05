import React from 'react'
import { DialogContent, DialogActions, DialogContentText, DialogTitle,Dialog } from '@material-ui/core';
import { fetch } from './CategoriesList';
import { fetchCategoryTypes } from './Category';
import { isNullOrUndefined } from 'util';

const CategoryTypeDialog =(props)=>{


   const [name,setName]=React.useState(props.categoryTypeName||'')
   const [description,setDescription]=React.useState(props.categoryTypeDescription||'')

   const handleChange=(e)=>{
       if(e.target.name==='name')
            setName(e.target.value)
        if(e.target.name==='description')
            setDescription(e.target.value)
   }

    const SaveCatgeoryType= async ()=>{
        
        if(isNullOrUndefined(props.categoryTypeId))
            await fetchCategoryTypes({
                query:` mutation {
                    postCategoryType(name:"${name}",description:"${description}",categoryId:${props.categoryId}){
                        typeId,
                        name,
                        description,
                        categoryId
                    }
                }
                `
            }).then((res)=>{
                console.log(res);
                props.addCategoryTypeToStore(res.data.postCategoryType)
            })
        else await fetchCategoryTypes({
            query:` mutation {
                updateCategoryType(name:"${name}",description:"${description}",categoryId:${props.categoryTypeCategoryId},typeId:${props.categoryTypeId}){
                    typeId,
                    name,
                    description,
                    categoryId
                }
            }
            `
        }).then((res)=>{
            console.log(res);
            props.updateCategoryTypeToStore(res.data.updateCategoryType)
        })
            

        props.CloseCategoryDialog()
    }


    return(
        <Dialog open={props.isCategoryDialogOpen}>
                    <DialogTitle>
                        Add a new {props.name}Type
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Name: <input type="text" name="name" required="true" onChange={handleChange} value={name}></input>
                            Description: <input type="text" name="description" required="true" onChange={handleChange} value={description}></input>
                            {/* <br>{JSON.stringify(props.category)}</br> */}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={()=>{
                            props.CloseCategoryDialog()
                        }}>Cancel</button>
                        <button type="submit" onClick={()=>{SaveCatgeoryType()}}>Save {props.name}Type</button>
                    </DialogActions>
                </Dialog>
    )
}
export default CategoryTypeDialog