import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRoute from './routes/user.routes.js';
import { connectToMongoDB } from './db/connectToMongoDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);
app.get('/', (req, res) => res.status(200).json({message: 'express home.'}));

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});