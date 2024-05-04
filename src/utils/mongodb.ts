import mongoose, { mongo } from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(String(process.env.MONGODB_URI));
        console.log("Connected to database");
        
    } catch (error) {
        console.log("Error connecting: ", error);
    }
}