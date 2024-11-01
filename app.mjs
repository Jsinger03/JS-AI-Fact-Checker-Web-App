import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})

app.get('/', (req, res) => {
    res.render('dashboard');//currently just a skeleton
})
app.get('/history', (req, res) => {
    res.render('history');
})
app.get('/profile', (req, res) => {
    res.render('profile');
})
app.listen(process.env.PORT ?? 3000);
