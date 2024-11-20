import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Connected to database ', process.env.MONGO_DB_URL);
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error.message);
    }
}