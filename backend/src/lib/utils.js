import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>
{
    const {jWT_SECRET}=process.env;
    if(!jWT_SECRET)throw new error("JWT Secret is not set.");
    const token=jwt.sign({userId:userId},jWT_SECRET,
        {
            expiresIn:"7d",
        }
    );

    res.cookie("jwt",token,
        {
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="development"?false:true,
        }
    );
    return token;
}