const {ApolloServer ,gql} = require('apollo-server')
const request=require('request-promise')

const typeDefs = gql`
    type Category{
        categoryId:Int
        name:String
        types:[CategoryType]
    }

    type Transaction{
        transactionId:Int!
        transactionDate: String!
        sum: Int!
        remarks: String
        typeId:Int!
    }
    type CategoryType{
        typeId:Int!
        name:String!
        description:String
        categoryId:Int!
        category:Category
        transactions:[Transaction]
    }
    type Response{
        text:String
    }
   

    type Query{
        getCategoryTypeById(typeId:Int!):CategoryType,
        getCategoryTypes:[CategoryType],
        getTypesByCategoryId(categoryId:Int!):[CategoryType],
    }

    type Mutation {
        postCategoryType(name:String!,description:String,categoryId:Int!):CategoryType,
        updateCategoryType(typeId:Int!,name:String!,description:String,categoryId:Int!):CategoryType,
        deleteCategoryType(typeId:Int!):Response
    }

`
//Mutation si Query sunt fetch-uri spre server, dar e specific GRAPhQl
const resolvers={
    Query:{
       getCategoryTypeById:async (parent,args,context,info)=>{
            // console.log(args.typeId)
            const response = await request(`http://localhost:8080/CategoryType/`+args.typeId, { method: 'GET', json: true });
            // console.log(response);
            return response;
        },
        getCategoryTypes: ()=>{
            return request('http://localhost:8080/CategoryTypes',{method:'GET', json:true}).then((response)=>{
                console.log(response)
                return response
            })
        },
        getTypesByCategoryId: (parent,args,context,info)=>{
            return request('http://localhost:8080/getTypesByCategoryId/'+args.categoryId,{method:'GET',json:true}).then((response)=>{
                // console.log(response)
                return response
            })
        }
    },
    CategoryType:{
        category: (parent,args,context,info) =>{
            // console.log('parent',parent)
            // console.log('context',context)
            // console.log('args',args)
            // console.log('info',info)
            let res = request('http://localhost:4000',{
                method:'POST',json:true,body:{query: `{getCategory(categoryId:${parent.categoryId}){
                        categoryId
                        name
                    }
                    }`
                }
            }).then(response=>response.data)
            console.log("res",res)
            return res
        },
        //aici comunica cu alt microserviciu-cu transactions
        //categorytypes intreaba transactions, transactions face apel la server si dupa ce primeste raspuns il trimite la category
        transactions: (parent,args,context,info) => {
            console.log('parent',parent)
            console.log('args',args)
            return request('http://localhost:4002',{method:'POST',json:true, body:{query:`{
                        getTransactionsByTypeId(typeId:${parent.typeId}){
                            transactionId
                            transactionDate
                            sum
                            remarks
                            typeId
                        }
                    }`
                    //request de graphQL mai sus
            }}).then(response=>response.data.getTransactionsByTypeId)
        }
    },
    Mutation: {
        postCategoryType: async(parent,args,context,info)=>{
            console.log(args)
            const response = await request(`http://localhost:8080/CategoryType/`, { method: 'POST', json: true , body:args});
            console.log(response);
            return response;
        },
        updateCategoryType: async(parent,args,context,info)=>{
            console.log(args)

            const response = await request(`http://localhost:8080/CategoryType/`+args.typeId, { method: 'PUT', json: true ,
                body:{name:args.name,description:args.description,categoryId:args.categoryId}});
            console.log(response);
            return response;
        },
        deleteCategoryType: async (parent,args,context,info)=>{
            console.log(args.typeId)
            const response = await request(`http://localhost:8080/CategoryType/`+args.typeId, { method: 'DELETE', json: true });
            console.log(response);
            return {text:response};
        },
    },
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4003).then(({url})=>{
    console.log(`listening on port ${url}`)
    //aici e microserviciul de categoryTypes
})









































// type Category{
//     categoryId:ID!
//     name:String!
//     types:[CategoryType]
// }

// type Transaction{
//     transactionId:ID!
//     transactionDate: String!
//     sum: INT!
//     remarks: String
//     type:CategoryType
// }
// type CategoryType{
//     typeId:ID!
//     name:String!
//     description:String
//     category:Category
//     transactions:[Transaction]
// }
