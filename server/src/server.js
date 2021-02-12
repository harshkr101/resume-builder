import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routers/auth.js';
import {config} from './config/config.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', authRoutes);

const connect = async (url) => {
    await mongoose.connect(
        url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log('Database Connected...');
    }).catch(err => {
        console.error(err);
    });
}



export const start = async () => {
    await connect(config.DB_URL);

    app.listen(config.PORT, () => {
        console.log(`Server has started on port ${config.PORT}...`);
    });
}