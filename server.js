const express = require('express');
const path = require('path')
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
    // res.send('Hello World')
    res.sendFile(path.joun(__dirname, 'public', 'index.html'));
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(path.joun(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
