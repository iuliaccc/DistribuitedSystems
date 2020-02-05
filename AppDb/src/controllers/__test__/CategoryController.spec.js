const request = require('supertest')


describe(' CategoryController ',()=>{
let app

    beforeEach(()=>{
         app = require('../../app')
    })

    const defaultCategories=[
        {
            categoryId:1,
            name:'Income'
        },
        {
            categoryId:2,
            name:'Expense'
        }
    ]
    it(' should get Income and Expense categories', async ()=>{
        await request(app)
        .get('/Categories')
        .then((res)=>{

            expect(res.status).toBe(200)
            expect(JSON.parse(res.text)).toStrictEqual(defaultCategories)
        })

    })
    it(' should return Bad Request', async ()=>{
        await request(app)
        .get('/Categories')
        .then((res)=>{

            expect(res.status).toBe(200)
            expect(JSON.parse(res.text)).toStrictEqual(defaultCategories)
        })

    })
})