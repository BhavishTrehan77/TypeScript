import express from 'express';
import { CreateUser, DeleteUser, GetUser, GetUserById, Login, PatchUser, Signup } from '../controllers/User.controllers.js';

const router=express.Router();

router.post("/createUser",CreateUser)
router.get("/get",GetUser)
router.get("/get/:id",GetUserById)
router.patch("/update/:id",PatchUser)
router.delete("/delete/:id",DeleteUser)
router.post("/signup",Signup)
router.post("/login",Login)

export default router


