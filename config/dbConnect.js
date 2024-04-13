import mongoose from 'mongoose';

async function dbConnect() {
    console.log("Connecting to the database...");
    try {
        await mongoose.connect(process.env.DB);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

export default dbConnect;
