import  type { Request, Response } from "express";

import User from "../model/User.model.js";


export const CreateUser=async(req:Request,res:Response)=>{
    try{
        const{name,email,password,role}=req.body
        const user=await User.create({
            name,email,password,role
        })
        res.status(201).json({
            success:true,
            message:"User created Successfully",
            data:user
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Failed to create a user"
        })
    }
}

export const GetUser=async(req:Request,res:Response)=>{
    try{
        const ans=await User.find({})
       
        res.status(200).json({
            data:ans
        })
    }catch(err){
        console.log(err)
        return res.json({
            message:"not done"
        })
    }
}

export const GetUserById=async(req:Request,res:Response)=>{
    try{
    const id=req.params.id
    const user=await User.findById(id)
    if(!user){
        throw new Error("user with this perticular id not dound")
    }
    res.status(200).json({
        data:user
    })
    }catch(err){
        return res.json({
            message:"not done"
        })
    }
}

export const PatchUser=async(req:Request,res:Response)=>{
    try{
    const id=req.params.id
    const user=await User.findByIdAndUpdate(id,req.body)
    res.json({
        ans:user
    })
    }catch(err){
        console.log(err)
    }
    
}

export const DeleteUser=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id
        const user=await User.findByIdAndDelete(id)
        res.json({
            ans:user
        })
    }catch(err){
        console.log(err)
    }
}


