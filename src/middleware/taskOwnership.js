import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";


export const taskOwnership  = asyncHandler(
    async(req , res ,next)=>{
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);

        if(!task){
            res.status(404);
            throw new Error("Task does not exist");
        }

        if(req.user.role !== "admin" && req.user._id.toString() !== task.createdBy.toString()){
                res.status(403);
                throw new Error("Access denied");
        }

        req.task = task;
        next();
    })