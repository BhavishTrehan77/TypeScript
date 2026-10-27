import  type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

interface CreateUserBody{
            name: string;
            email: string;
            password:string;
            role:"user"|"admin";
        }
export const CreateUser=async(req:Request<{},{},CreateUserBody>,res:Response,next:NextFunction)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.json({
                message:error.array().map((err)=>err.msg)
            })
        }
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
        next(err)
    }
}

export const GetUser=async(req:Request,res:Response)=>{
    try{
        
        const page=Number(req.query.page)||1
        const limit=Number(req.query.limit)||1
        const skip=(page-1)*limit
        const sortOptions={}
        const sortBy=typeof req.query.sortBy=="string"?req.query.sortBy:undefined
        if(sortBy){
            const[q,v]=sortBy.split(":")
            sortOptions[q]=v=='asc'?1:-1
            }
        const ans=await User.find({}).sort(sortOptions).skip(skip).limit(limit)
       
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
        //Currently typescirpt dont know what is present inside req.body  so we will create one interface and use it fruther

    interface CreateUserBody{
        name:string,
        email:string,
        password:string,
        role?:"user"|"admin"
    } 
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

interface SignupBody{
    name:String,
    email:String,
    password:String
}
export const Signup=async(req:Request<{},{},SignupBody>,res:Response)=>{
    try{
        const{name,email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        res.json({
            success:true,
            data:user
        })
    }catch(err){
        return res.json({
            message:"err"
        })
    }
}
interface loginBody{
    email:string,
    password:string
}
export const Login=async(req:Request<{},{},loginBody>,res:Response)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
   
    const isMatch=await bcrypt.compare(password,user?.password)
    if(!isMatch){
        throw new Error("password didnt match")
    }
    const jwtToken=jwt.sign({id:user._id},"AccSecKey")
    res.json({
        message:"Login successfull",
        jwtToken
    })

}

