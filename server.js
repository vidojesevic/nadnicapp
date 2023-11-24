const express = require('express');
const path = require('path')
const mariadb = require('mariadb')
const dbConfig = require('./config/db.config.js')

const app = express();
const port = 3000;

const pool = mariadb.createPool(dbConfig);
if (!pool) {
    console.log("Connection to database is not established!")
}

app.use(express.static('public'));
app.use(express.static('src'));

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

