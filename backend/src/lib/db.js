import mongoose from "mongoose";
const {MONGO_URL}=process.env;
if(!MONGO_URL) throw new error("MongURl is not set.");
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("MONGODB connected:", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};