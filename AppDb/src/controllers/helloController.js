const db = require('../db');

exports.get = function (req, res) {

    const sql = 'SELECT name from hello where name = ?';

    db.get(sql, ['World'], (err, row) => {
        if (err) return res.status(500).send(err.message);

        if (row) {
            return res.status(200).send(`Hello ${row.name}`);
        } else {
            return res.status(400).send('Bad request');
        }
    });
};