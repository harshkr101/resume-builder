import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
import authRoutes from './routers/auth.js';

const app = express();
env.config();
 
app.use('/api', authRoutes);

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6zioh.mongodb.net/<dbname>?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database Connected...');
});
    
app.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}...`);
});