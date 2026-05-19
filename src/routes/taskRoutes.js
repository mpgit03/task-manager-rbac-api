import express from "express";
import { taskOwnership } from "../middleware/taskOwnership.js";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskControllers.js";

const router = express.Router();

router.post(
    "/",
    protect,
    createTask
);


router.get(
    "/",
    protect,
    getTasks,

);

router.get(
    "/:taskId",
    protect,
    taskOwnership,
    getTask,
);

router.put(
    "/:taskId",
    protect,
    taskOwnership,
    updateTask,
);

router.delete(
    "/:taskId" ,
    protect,
    taskOwnership,
    deleteTask,
);

export default router;