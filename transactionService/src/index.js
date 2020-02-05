const {ApolloServer ,gql} = require('apollo-server')
const request=require('request-promise')
//aici definim tipul de date ptr microservicii, care sunt obiecte
const typeDefs = gql`
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
    }
    type Response{
        text:String
    }
   

    type Query{
        getTransactions:[Transaction],
        getTransactionById(transactionId:Int!):Transaction,
        getTransactionsByTypeId(typeId:Int!):[Transaction]
    }

    type Mutation {
        postTransaction(sum:Int,remarks:String,typeId:Int,transactionDate:String):Transaction,   
    }

`
//call-uri sau fetch-uri pentru a fi trimise la server
const resolvers={
    Query:{
        getTransactions: ()=>{
            return request('http://localhost:8080/getTransactions',{method:'GET', json:true}).then((response)=>{
                console.log(response)
                return response
            })
        },
        getTransactionById:async (parent,args,context,info)=>{
            console.log(args.transactionId)
            const response = await request(`http://localhost:8080/getTransaction/`+args.transactionId, { method: 'GET', json: true });
            console.log(response);
            return response;
        },
        getTransactionsByTypeId:async (parent,args,context,info)=>{
            console.log(args.typeId)
            const response = await request(`http://localhost:8080/getTransactionsByTypeId/`+args.typeId, { method: 'GET', json: true });
            console.log(response);
            return response;
        },
    },
    Mutation: {
        postTransaction: async(parent,args,context,info)=>{
            console.log(args)
            const response = await request(`http://localhost:8080/Transaction/`, { method: 'POST', json: true , body:args});
            console.log(response);
            return response;
        }
    },
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4002).then(({url})=>{
    console.log(`listening on port ${url}`)
    //aici se vede ca e portul 4002
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