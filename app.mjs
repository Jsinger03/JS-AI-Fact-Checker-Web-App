import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import './db.mjs';
import {register, auth} from './auth.mjs';
import './config.mjs';
import cors from 'cors';
import session from 'express-session';
import saveQuery from './chat.mjs';


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
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})
// const isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//         return next();
//     }
//     res.status(401).send('Unauthorized');
// };
//mongoose stuff
const User = mongoose.model('User');
const Query = mongoose.model('Query');

//login stuff


app.get('/', (req, res) => {
    //res.render('login');
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
//register stuff

app.post('/api/register', async(req,res) =>{
    const user = await register(req, res);
    console.log(user);
    if (user) {
        res.json({ success: true, message: 'Account created successfully' });
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
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/api/history', (req, res) => {
    res.json({message:"HIIII"})
})
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

app.put('/api/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, password } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            updateData.password = await bcryptjs.hash(password, salt);
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

  // Catch-all handler to serve React's index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'vite-project/dist', 'index.html'));
  });
app.listen(process.env.PORT ?? 3000);
