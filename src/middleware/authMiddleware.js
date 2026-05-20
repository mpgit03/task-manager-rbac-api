import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const protect  = asyncHandler(
    async(req,res,next)=>{
        let token ;

        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            res.status(401);
            throw new Error("Not authorized , no token");
        }

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            res.status(401);
            throw new Error("User Not Found");
        }
        req.user = user;
        next();
        }catch(error){
            res.status(401);
            throw new Error("Invalid or expired token");
        }

        
    }
);

export const authorize = (...roles)=>{
      return (req,res,next)=>{
        const user = req.user;
        if(!roles.includes(user.role)){
            res.status(403);
            throw new Error("Access Denied");
        }
        next();
      };
};