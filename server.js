import express from 'express';
import * as path from 'path';
import routes from './src/routes/routes.js'

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('src'));

app.use('/api', routes)

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (_, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
