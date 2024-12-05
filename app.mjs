import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import './db.mjs';
import {register, auth, changePassword} from './auth.mjs';
import './config.mjs';
import cors from 'cors';
import session from 'express-session';
import saveQuery from './chat.mjs';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(cors())//to allow for react axios api handling --> now using fetch, but will use axios later for url submissions
//cors sets headers appropriately to allow fetch requests from react
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'vite-project/dist')));

app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})

//mongoose stuff
const User = mongoose.model('User');
const Query = mongoose.model('Query');

//routes

app.get('/', (req, res) => {
    res.json({message:"HIIII"})
})
app.post('/api/login', async (req, res) => {
    const user = await auth(req, res);
    if (user) {
        res.json({ success: true, message: 'Login successful', userId: user._id });
        console.log("Login successful");
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        console.log("Invalid credentials");
    }
});

app.post('/api/register', async(req,res) =>{
    const user = await register(req, res);
    console.log(user);
    if (user) {
        res.json({ success: true, message: 'Account created successfully', userId: user._id });
        console.log("Account created successfully");
    } else {
        res.status(401).json({ success: false, message: 'Account creation failed' });
        console.log("Account creation failed");
    }

})

app.get('/api/dashboard', (req, res) => {
    res.json({message:"HIIII"})
})
app.post('/api/dashboard', async (req, res) => {
    try {
        const queryId = await saveQuery(req.body.prompt, req.body.userId);
        res.json({ message: 'Query submitted successfully', queryId });
    } catch (error) {
        console.error('Error saving query:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
});


app.get('/api/history/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const queries = await Query.find({ user: userId }).sort({ createdAt: -1 });
        res.json(queries);
    } catch (error) {
        console.error('Error fetching user queries:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/profile', (req, res) => {
    res.json({message:"HIIII"})
})
app.post('/api/profile', (req, res) => {
    res.json({message:"HIIII"})
});

app.get('/api/results/:queryId', async (req, res) => {
    try {
        const queryId = req.params.queryId;
        const query = await Query.findById(queryId).populate('user');
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }
        console.log(query);
        res.json(query);
    } catch (error) {
        console.error('Error fetching query:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//https://www.geeksforgeeks.org/express-js-app-put-function/
app.put('/api/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, password } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) {
            updateData.password = await changePassword(password);
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/search/:userId', async (req, res) => {
    const filt = req.query.filterText;
    console.log(filt);
    let queries = await Query.find({ user: req.params.userId });
    //console.log(queries);
    queries = queries.filter(query => query.originalText.toLowerCase().includes(filt.toLowerCase()));
    console.log(queries);
    res.json(queries);
});

//handle URL submissions
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

app.post('/api/extract', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    try {
        console.log("trying to fetch url ", url);
        const response = await fetch(url);
        if (!response.ok) {
            console.log("error fetching url ", response.statusText);
            throw new Error(`Unable to fetch URL: ${response.statusText}`);
        }
        console.log("successfully fetched url");
        const html = await response.text();
        //console.log(html);
        //https://www.npmjs.com/package/@mozilla/readability
        const dom = new JSDOM(html);
        const reader = new Readability(dom.window.document);
        const article = reader.parse();

        if (!article) {
            throw new Error('Could not extract content from the URL');
        }

        // Send the extracted content back to the client
        const queryId = await saveQuery(article.textContent, req.body.userId);
        res.json({ content: article.textContent, queryId });
    } catch (error) {
        console.error('Error fetching or parsing URL:', error);
        res.status(500).json({ message: error.message || 'Failed to extract content' });
    }
});


  // Catch-all handler to serve React's index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'vite-project/dist', 'index.html'));
  });
app.listen(process.env.PORT ?? 3000);
