const request=require('supertest')
const initalData=require('AppDb/src/init/initialData.js')


describe(' CategoryTypeController tests ', () => {
let app

    beforeEach(()=>{
        app=require('../../app')
    })
    it( 'should get the Type using an id', async ()=>{

        const type1={
            "typeId": 1,
            "name": "salary",
            "description": "monthly salary",
            "categoryId": 1
        }
        await request(app)
        .get('/CategoryType/1')
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(JSON.parse(res.text)).toStrictEqual(type1)
        })
    })
    it( 'should return Bad Request ', async ()=>{

        const type1={
            "typeId": 1,
            "name": "salary",
            "description": "monthly salary",
            "categoryId": 1
        }
        await request(app)
        .get('/CategoryType/100')
        .then((res)=>{
            expect(res.status).toBe(400)
            expect(res.text).toBe('Bad Request')
        })
    })

    it( 'should get the all categoryTypes using an an categoryId', async ()=>{

        await request(app)
        .get('/getTypesByCategoryId/1')
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(JSON.parse(res.text)).toStrictEqual(initalData.incomeTypes)
        })
    })
    it( 'should return Bad Request', async ()=>{

        await request(app)
        .get('/getTypesByCategoryId/100')
        .then((res)=>{
            console.log(res.text)
            expect(res.status).toBe(400)
            expect(res.text).toBe('Bad Request')
        })
    })

    it( 'should get the all categoryTypes using an an categoryName', async ()=>{

        await request(app)
        .get('/getTypesByCategoryName/Expense')
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(JSON.parse(res.text)).toStrictEqual(initalData.expenseTypes)
        })
    })
    it( 'should return Bad Request', async ()=>{

        await request(app)
        .get('/getTypesByCategoryName/Expensedsgdfgd')
        .then((res)=>{
            expect(res.status).toBe(400)
            expect(res.text).toBe('Bad Request')
        })
    })

    it( 'should create a type ' , async()=>{

        const newType={
            name: "dividende",
            description: "actiuni",
            categoryId: 1
        } 

        await request(app)
        .post('/CategoryType')
        .send(newType)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(200)
            const {typeId,name,description,categoryId}=JSON.parse(res.text)
            expect(typeId).toBeGreaterThan(0)
            expect(typeId).toBe(10)
            expect({name,description,categoryId}).toStrictEqual(newType)
        })
    })


    it( 'should return an error message from Sqlite (FK constraint)' , async()=>{

        const newType={
            name: "dividende",
            description: "actiuni",
            categoryId: 111
        } 

        await request(app)
        .post('/CategoryType')
        .send(newType)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(500)
           
        })
    })

    it( 'should return a Bad Request ' , async()=>{

        const newType={
            "name": "dividende",
            "description": "actiuni",
            "categoryId": 1
        } 

        await request(app)
        .put('/CategoryType/100')
        .send(newType)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(400)
           expect(res.text).toBe('Bad Request')
        })
    })


    it( 'should return a error message beacause of foreign key constraints' , async()=>{

        const newType={
            "name": "dividende",
            "description": "actiuni",
            "categoryId": 100
        } 

        await request(app)
        .put('/CategoryType/1')
        .send(newType)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(500)
        })
    })

    

    it( 'should update a type by its id ' , async()=>{

        const newType={
            "name": "dividende",
            "description": "actiuni",
            "categoryId": 1
        } 

        await request(app)
        .put('/CategoryType/1')
        .send(newType)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(200)
            const {id,name,description,categoryId}=JSON.parse(res.text)
            expect(id).toBe(1)
            expect({name,description,categoryId}).toStrictEqual(newType)
        })
    })

    it( 'should delete the type of the id', async ()=>{

        await request(app)
        .delete('/CategoryType/1')
        .then((res)=>{
            expect(res.status).toBe(200)
            expect(res.text).toBe('Item deleted')
        })
    })

    it( 'should return Bad Request', async ()=>{

        await request(app)
        .delete('/CategoryType/100')
        .then((res)=>{
            expect(res.status).toBe(400)
            expect(res.text).toBe('Bad Request')
        })
    })



})
