import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRoute from './routes/user.routes.js';
import { connectToMongoDB } from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';


const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});