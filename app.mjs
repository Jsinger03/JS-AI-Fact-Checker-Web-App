import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(process.env.PORT ?? 3000);
