import express from "express";
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessagesByUserID } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getChatPartners } from "../controllers/message.controller.js";
import { arcjetProtection } from "../controllers/arcjet.controller.js";
const router=express.Router();
router.use(protectRoute);
router.get('/contacts',getAllContacts);
router.get('/chats',getChatPartners);
router.get('/:id',getMessagesByUserID);
router.post("/send/:id",sendMessage);

router.get("/receive",(req,res)=>
{
    res.send("The message is received.");
})

export default router;