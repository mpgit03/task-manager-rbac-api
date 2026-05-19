import express from "express"
import { registerUser,loginUser,getMe } from "../controllers/authControllers.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/register" ,
    registerUser);


router.post(
    "/login" ,
    loginUser);

router.get(
    "/me",
    protect,
    getMe

);

router.get(
    "/admin",
    protect,
    authorize("admin"),
    (req,res,next)=>{
        res.json({
            message:"Admin Route working",
        })
    }

);



export default router;
