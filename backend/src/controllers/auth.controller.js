import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import 'dotenv/config';
export const signup=async(req,res)=>
{
    const {fullName,email,password}=req.body;
    try{
        if(!fullName||!email||!password)
        {
            return res.status(400).json({message:"All fields are required..."});
        }
        if(password.length<6)
        {
            return res.status(400).json({mesasge:"Password length should be greater than 6 characters .."})
        }
        const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailregex.test(email))
        {
            return res.status(400).json({message:"Invalid Email format."});
        }
        const user=await User.findOne({email:email});
        if(user) return res.status(400).json({message:"The user already existed."})
const salt=await bcrypt.genSalt(10);
        const hashedPassowrd= await bcrypt.hash(password,salt);
        const newUser=new User(
            {
                fullName,
                email,
                password:hashedPassowrd
            }
        )
        if(newUser)
        {
            const savedUser=await newUser.save();
             generateToken(savedUser._id,res);

            res.status(201).json({message:"The user is created successfully..",
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic

            });

            try{
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,process.env.CLIENTURL);

            }
            catch(error)
            {
                console.error("Failed to send welcome email",error);
            }

        }
        else{
            return res.status(400).json({message:"User is not created.Invalid Data...Try Again.."
            })
        }


    }
    catch(error)
    {
        console.error("Error while signup",error)
        return res.status(400).json({message:"Internal Server Error"})
    }
}

export const login =async(req,res)=>
{
const {email,password}=req.body;
try
{
const user=await User.findOne({email})
if(!user) return res.status(400).json({message:"invalid Credentials"});

const isPasswordCorrect=await bcrypt.compare(password,user.password)
if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials..."});

generateToken(user._id,res)

res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilePic:user.profilePic
});
}
catch(error)
{
    console.error("Error loggin in the user....",error)
}
};

export const logout =async(_,res)=>
{
res.cookie("jwt","",{maxAge:0})
res.status(200).json({message:"Logged out successfully"});

};