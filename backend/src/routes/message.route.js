import express from "express";

const router=express.Router();

router.get("/message",(req,res)=>
{
    console.log("Message router.");
})

export default router;