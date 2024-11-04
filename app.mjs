import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import './db.mjs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})

//mongoose stuff
const User = mongoose.model('User', UserSchema);
const Query = mongoose.model('Query', QuerySchema);

//login stuff


app.get('/', (req, res) => {
    res.render('login');
})
app.post('/', async(req,res) =>{
    //const user = await
    //need to implement auth.mjs first
    res.redirect('/dashboard');
})
//register stuff
app.get('/register', (req, res) => {
    res.render('register');
})
app.post('/register', async(req,res) =>{
    //const newUser = await
    //need to implement auth.mjs first
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})
app.get('/history', (req, res) => {
    res.render('history');
})
app.get('/profile', (req, res) => {
    res.render('profile');
})
app.listen(process.env.PORT ?? 3000);
