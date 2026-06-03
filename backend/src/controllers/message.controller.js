import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts=async(req,res)=>
{
try
{
const loggedInUser=req.user._id;
const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password")
res.status(200).json(filteredUsers);
}
catch(error)
{
console.log("Error in getALlcontacts",error);
return res.status(500).json({messsage:"Internal Server error."});
}
}

export const getMessagesByUserID = async(req,res)=>
{
    try{
const myId=req.user._id;
const {id:userToChatId}=req.params;

const messages= await Message.find(
    {
        $or:[
            {senderId:myId,receiverId:userToChatId},
            {senderId:userToChatId,receiverId:myId}
        ]
    }
);
res.status(200).json(messages)
    }
    catch(error)
    {
        console.log("Error in getMessages controller..",error.messsage);
        return res.status(500).json({error:"Internal Server Error."})
    }
}

export const sendMessage=async(req,res)=>
{
    try{
const {text,image}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user._id;
let imageUrl;
if(image)
{
    const uploadResponse=await cloudinary.uploader.upload(image);
    imageUrl=uploadResponse.secure_url;
}
const newMessage=new Message({
    senderId,
    receiverId,
    text,
    image:imageUrl
})
await newMessage.save();
res.status(201).json(newMessage);
    }
    catch(error)
    {
        console.log("Error in sending message",error.messsage);
        return res.status(500).json("Internal Server Error.");
    }
}

export const getChatPartners=async(req,res)=>
{
try{
const loggedInUserId=req.user._id;
const messages=await Message.find(
    {
        $or:[
            {senderId:loggedInUserId},
            {receiverId:loggedInUserId}
        ]
    }
);
const chatPartnerIds=[
    ...new Set(
    messages.map((msg)=>
msg.senderId.toString()===loggedInUserId.toString()?msg.receiverId.toString()
:msg.senderId.toString())
)];
const chatPartners=await User.find({_id:{$in:chatPartnerIds}}).select("-password")
res.status(200).json(chatPartners);
}
catch(error)
{
console.log(error.message);
res.status(500).json("Internal Server Error.");
}
};