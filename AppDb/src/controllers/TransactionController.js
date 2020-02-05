const db = require('../db');

exports.get = function (req, res) {
    const sql = `SELECT * from TransactionTable`;
    db.all(sql,{}, (err, row) => {
        console.log(sql);
        if (err) return res.status(500).send(err.message);
        if (row) {
            console.log(row);
            return res.status(200).send(row);
        } else {
            return res.status(400).send('Bad Request');
        }
    });
};

exports.getById = function (req, res) {
    const { id } = req.params;
    const sql = `SELECT * from TransactionTable WHERE transactionId = ?`;
    db.get(sql,[id], (err, row) => {
        console.log(sql);
        if (err) return res.status(500).send(err.message);
        if (row) {
            console.log(row);
            return res.status(200).send(row);
        } else {
            return res.status(400).send('Bad request');
        }
    });
};

exports.getByTypeId = function(req,res) {
    const {id} = req.params
    const sql= 'SELECT * FROM TransactionTable WHERE typeId = ?'
    db.all(sql,[id],(err,row)=>{
        if(err) return res.status(500).send(err.message)
        if(row) {
            console.log(row);
            return res.status(200).send(row)
        }
        else {
            return res.status(400).send('Bad Request')
        }
    })
}
exports.post=(req,res)=> {
    // res.json({requestBody: req.body})  

    console.log(req.body)

    const{sum, remarks, typeId}=req.body
    
    const transactionDate = req.body.transactionDate?req.body.transactionDate:new Date().toDateString()
    // const { sum, description, remarks, transactionDate, typeId} = req.body;
    const sql='INSERT INTO TransactionTable(sum, remarks, transactionDate, typeId) VALUES(?,?,?,?)'
    // const categoryTypeTableData = db.prepare("INSERT INTO CategoryType(name,description,typeId) VALUES (?,?,?)");
    db.run(sql,[sum, remarks, transactionDate, typeId], function (err,row){
        console.log(sql);
        if(err){
            console.log(' e in err')
        return res.status(500).send(err.message)
    }else{
        console.log(this.lastID);
        return res.status(200).send({...req.body, transactionDate, transactionId: this.lastID})
    }
    })
}

