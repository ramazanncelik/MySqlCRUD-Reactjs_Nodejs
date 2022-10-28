const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: your_host,
    user: your_user,
    database: your_database,
    password: your_password
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlGet = `select * from products`
    db.query(sqlGet, (err, result) => {
        res.send(result)
    });
});

app.post('/api/insert', (req, res) => {

    const name = req.body.name
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const description = req.body.description

    const sqlInsert = `insert into products (name,price,imageUrl,description) values (?,?,?,?)`
    db.query(sqlInsert, [name, price, imageUrl, description], (err, result) => {
        console.log(err)
    });

});

app.delete('/api/delete/:name', (req, res) => {
    const name = req.params.name;
    const sqlDelete = `delete from products where name=?`;
    db.query(sqlDelete, name, (err, result) => {
        console.log(err)
    });
});

app.put('/api/update/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const sqlUpdate = `update products set description=? where name=?`;
    db.query(sqlUpdate, [description, name], (err, result) => {
        console.log(err)
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});
