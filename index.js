import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes.js';


const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).send('Server is alive');
})

app.use('/api/user', userRoutes)


app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})