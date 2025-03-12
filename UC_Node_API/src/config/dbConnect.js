import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mongoose from 'mongoose';


const dbConnect = async () => {
    try {
        // console.log("Mongo URI",process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}   

export default dbConnect;
