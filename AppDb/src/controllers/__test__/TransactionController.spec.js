const request = require('supertest');


describe(' Transactions test',()=>{
let app;

beforeEach(()=>{
    app = require('../../app');
})
    const transaction1={
            "transactionDate": 1563808820440,
            "sum": 213,
            "remarks": "World"
        }
    
    
    it(' should get all transactions', async ()=>{
        await request(app)
        .get('/getTransactions')
        .then((res)=>{
            expect(res.status).toEqual(200)
            expect(res.text).toBeDefined()
            expect(JSON.parse(res.text)).toHaveLength(0)
            expect(JSON.parse(res.text)).toEqual([])
        })
    })
    
    it(' should get  transaction 1 ', async ()=>{
        await request(app)
        .get('/getTransaction/1')
        .then((res)=>{
            expect(res.status).toEqual(400)
            // expect(res.text).toBeDefined(null)

        })
    })

    it('should create a transaction', async()=>{

        const newTransaction={
            "sum": 22,
            "remarks": "ceva",
            "typeId": 1,
        }

        await request(app)
        .post('/Transaction')
        .send(newTransaction)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(200)
            const ResponseWithModifiedDateFormat=Object.assign({},JSON.parse(res.text),{transactionDate:new Date(JSON.parse(res.text).transactionDate).toDateString()})
            expect(ResponseWithModifiedDateFormat).toStrictEqual(Object.assign({},newTransaction,{transactionDate:new Date().toDateString(),transactionId:1}))
        })
    })

    it('should return an error', async()=>{

        const newTransaction={
            "sum": 22,
            "remarks": "ceva",
            "typeId": 100,
        }

        await request(app)
        .post('/Transaction')
        .send(newTransaction)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(500)
        })
    })


    
    




})