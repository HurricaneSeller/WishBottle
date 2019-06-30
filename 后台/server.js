var express = require('express');
var mysql = require('mysql');
var app = express();
app.listen(3000);

var connection = mysql.createConnection({
    port: 3000,
    host: 'localhost',
    user: 'root', 
    password: 'moan0614',
    database: 'sample'
});
connection.connect();
var str = '';
connection.query('SELECT * FROM people', (error, results) => {
    str = JSON.stringify(results);
    console.log(results);
})

app.get('/', (request, response) => {
    response.send(str);
})

connection.end();