import express from 'express';
import dotenv from 'dotenv-defaults';
import cors from 'cors';
import bodyParser from 'body-parser';
import expenseRoutes from './backend/routes/expense';
import mongo from './backend/mongo';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import http from 'http';

const port = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', expenseRoutes);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongo.connect();

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`🚀 Server Ready at ${port}! 🚀`);
});


// app.listen(port, () => {
//     console.log(`Server's listening on port ${port}.`);
// })
