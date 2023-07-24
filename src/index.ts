import 'dotenv/config';
import express, { Express } from 'express';
import cookieparser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import { allowedOrigins, credentials } from './middleware/credentials';
import route from './route';

const app: Express = express();
const port = process.env.PORT || 8080;

const uri = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(uri);
const db = mongoose.connection;

db.on('connected', () => {
	console.log('⚡️[database]: Mongoose is connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(cookieparser());

app.use('/api', route);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
