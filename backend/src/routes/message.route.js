import express from "express";

const router=express.Router();

router.get("/send",(req,res)=>
{
res.send("The message is sent.");
});

router.get("/receive",(req,res)=>
{
    res.send("The message is received.");
})

export default router;