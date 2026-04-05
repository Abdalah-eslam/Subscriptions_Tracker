import mongoose from "mongoose";
import { DATABASE_URL } from "../config/env.js";
const conectDB = async () => {
try {
    await mongoose.connect(DATABASE_URL)            
    console.log("Database connected successfully");
} catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
}  
};
export default conectDB

