import express from "express";
import dotenv from "dotenv";
import path from "path";
import { generateToken } from "./lib/utils.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();
import { connectDB } from "./lib/db.js";
const _dirname=path.resolve();

const PORT=process.env.PORT;
const app=express();
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

//making ready for deployment
if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(_dirname,"../frontend/dist")))

    app.get("*",(req,res)=>
    {
        res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));
    })
}
app.listen(PORT,()=>
{
    console.log("Your server is running on :"+PORT);
connectDB();
}
);

