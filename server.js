import express from 'express';
import dotenv from 'dotenv-defaults';
import cors from 'cors';
import bodyParser from 'body-parser';
import expenseRoutes from './backend/routes/expense.js';
import mongo from './backend/mongo.js';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 80;

dotenv.config();

const app = express();
app.listen(port, () => {
    console.log(`🚀 Server Ready at ${port}! 🚀`);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', expenseRoutes);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

mongo.connect();


// app.listen(port, () => {
//     console.log(`Server's listening on port ${port}.`);
// })

// "start": "node server.js"
// "start": "nodemon server.js --ext js --exec babel-node"