import mongoose from 'mongoose'
import "dotenv/config";

const db = await mongoose.connect(process.env.MONGO_URL)

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Connected')
    } catch(e) {
        console.log(e)
    }
} 

export { db, connectDB }