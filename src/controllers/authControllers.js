import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser  = asyncHandler(
    async(req , res)=>{
    
        const {name ,email , password} = req.body;
        if(!name||!email||!password){
            res.status(400);
            throw new Error("Email or Password missing");
        }

        
        if(password.length < 6){
            res.status(400);
            throw new Error(
                "Password must be at least 6 characters"
            );
            }
        if(!email.includes("@")){
            res.status(400);
            throw new Error(
                "Invalid email format"
            );
        }    
        const existingUser = await User.findOne({
            email,
        })
        if(existingUser){
            res.status(400);
            throw new Error("User already exists");
        }

        
        const user = await User.create({
            name,email,password
        });

        const token = generateToken(user._id)

        res.status(201).json({
            message:"User registered successfully",
            token,
            user:{
                id : user._id,
                name : user.name ,
                email : user.email ,
                role : user.role ,

            }

        })
    

}
);


export const loginUser = asyncHandler(
    async(req,res)=>{
        const {email,password} = req.body;
        if(!email||!password){
            res.status(400);
            throw new Error("Email or Password missing");
        }
        const user = await User.findOne({
            email,
        });


        if(!user){
            res.status(401);
            throw new Error("Invalid email or password");
        }

        const passwordMatch = await user.comparePassword(password);

        if(!passwordMatch){
            res.status(401);
            throw new Error("Invalid email or password");
        }

        res.status(200).json({
            message:"Login Successful",
            token:generateToken(user._id),
            user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            },     
        });

        
    }
);

export const getMe = asyncHandler(
    async(req,res,next)=>{
        res.status(200).json({
            user:req.user,
        });
    }
);