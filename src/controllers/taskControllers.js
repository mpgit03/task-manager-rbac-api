
import { errorHandler } from "../middleware/errorMiddleware.js";
import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTask = asyncHandler(
    async(req,res)=>{
        const {title,description,status} = req.body;
        const createdBy = req.user._id;

        if(!title){
            res.status(400);
            throw new Error("Title Missing");
        }

        const task = await Task.create({
            title,
            description,
            status,
            createdBy,
        });
        

        res.status(201).json({
            message:"Task Created",
            task,
        });
    }
);

export const getTasks = asyncHandler(
    async(req,res)=>{
         
        let tasks ;
        if(req.user.role === "admin"){
            tasks = await Task.find();
        }
        else{
            tasks = await Task.find({createdBy:req.user._id});
        }
        res.status(200).json({
            tasks,
        });
    }
);

export const getTask = asyncHandler(
        async(req,res)=>{
            const task = req.task ;
            res.status(200).json({
                task,
            })
        }
);

export const updateTask = asyncHandler(
    async(req,res)=>{
        const {title,description,status} = req.body;
        if(!title && !description && !status){
            res.status(400);
            throw new Error("Nothing to update");
        }

        const task = req.task ;

        if(title) task.title  = title;
        if(description) task.description = description;
        if(status) task.status = status ;

        await task.save();

        res.status(200).json({
            message:"Task updated successfully",
            task,
        })

    }
);

export const deleteTask = asyncHandler(
    async(req,res)=>{
        const task = req.task ;

        await task.deleteOne();

        res.status(200).json({
            message:"Task Deleted Successfully",
        });
        
    }
);




