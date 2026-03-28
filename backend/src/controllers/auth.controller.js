import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
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
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({message:"The user is created successfully..",
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic

            })

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