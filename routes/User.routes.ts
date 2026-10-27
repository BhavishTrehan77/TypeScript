import express from 'express';
import { CreateUser, DeleteUser, GetUser, GetUserById, PatchUser } from '../controllers/User.controllers.js';

const router=express.Router();

router.post("/createUser",CreateUser)
router.get("/get",GetUser)
router.get("/get/:id",GetUserById)
router.patch("/update/:id",PatchUser)
router.delete("/delete/:id",DeleteUser)


export default router


