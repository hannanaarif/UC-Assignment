import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import dbConnect from './config/dbConnect.js';
import apiRouter from './routes/index.js';
const app = express();
const PORT = process.env.PORT||3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text())

app.use('/api', apiRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
