const {ApolloServer ,gql} = require('apollo-server')
const request=require('request-promise')

const typeDefs = gql`
    type Category{
        categoryId:Int
        name:String
        categoryTypes:[CategoryType]
    }
    type CategoryType{
        typeId:Int!
        name:String!
        description:String
        categoryId:Int!
        category:Category
        transactions:[Transaction]
    }
    type Transaction{
        transactionId:Int!
        transactionDate: String!
        sum: Int!
        remarks: String
        typeId:Int!
    }
    type Response{
        text:String
    }
   

    type Query{
        getCategories:[Category],
        getCategory(categoryId:Int):Category!
    }
`

const resolvers={
    Query:{
        getCategories: ()=>{
            return request('http://localhost:8080/Categories',{method:'GET', json:true}).then((response)=>{
                console.log(response)

                return response

            })
        },
        // getCategory: (parent,args,context,info) =>{
        //     console.log('saa', args.categoryId)
        //     let res = resolvers.Query.getCategories().filter(category=>category.categoryId===args.categoryId)
        //     console.log(res)
        //     return res
        // }

    },
    Category: {
        categoryTypes (parent,args,context,info){

            return request('http://localhost:4003/',{method:'POST',json:true,body:{query:`
                { getTypesByCategoryId(categoryId:${parent.categoryId}){
                    name
                    typeId
                    description
                    categoryId
                }
                }
            `}}).then(response=>response.data.getTypesByCategoryId)
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
                }}).then(response=>response.data.getTransactionsByTypeId)
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url})=>{
    console.log(`listening on port ${url}`)
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
