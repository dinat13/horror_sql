const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const client = new Client({ connectionString: process.env.DATABASE_URL });
const app = express();

app.use(bodyParser.json());

app.post('/query', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console('getting request');
    
    if (req.body.query) {
        console.log(req.body.query)
        client.query(req.body.query, (err, r) => {
            if (err) throw err;
            rows = [];
            for (let row of r.rows){
                rows.push(row);
            };

            response = JSON.stringify(rows);
            console.log(response);
            res.end(response);
        });
    };
});

client.connect();

const server = app.listen(port, function() {
    console.log('listening to port')
});
