import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import './db.mjs';
import {register, auth} from './auth.mjs';
import './config.mjs';
import cors from 'cors';



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(cors())//to allow for react axios api handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vite-project/dist')));

app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})

//mongoose stuff
const User = mongoose.model('User');
const Query = mongoose.model('Query');

//login stuff


app.get('/', (req, res) => {
    //res.render('login');
    res.json({message:"HIIII"})
})
app.post('/api/login', async(req,res) =>{
    const user = await auth(req, res);
    console.log(user);
    if (user) {
        res.json({ success: true, message: 'Login successful' });
        console.log("Login successful");
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        console.log("Invalid credentials");
    }
})
//register stuff
// app.get('/register', (req, res) => {
//     res.render('register');
// })
app.post('/register', async(req,res) =>{
    //const newUser = await
    //need to implement auth.mjs first
    register(req, res);
    res.redirect('/dashboard');

})
app.get('/api/dashboard', (req, res) => {
    res.json({message:"HIIII"})
})
app.get('/history', (req, res) => {
    res.render('history');
})
app.get('/profile', (req, res) => {
    res.render('profile');
})
app.post('/profile', (req, res) => {
    
});

app.get('/results', (req, res) => {
    res.render('results');
});
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
  });
  // Catch-all handler to serve React's index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'vite-project/dist', 'index.html'));
  });
app.listen(process.env.PORT ?? 3000);
