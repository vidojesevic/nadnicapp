import express from 'express';
import * as path from 'path';
import routes from './src/routes/routes.js';
import multer from 'multer';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const upload = multer();

app.use(express.static('public'));
app.use(express.static('src'));

app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (_req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('*', function(_req, res){
    res.status(404).sendFile(path.join(__dirname, 'src/views', '404.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
