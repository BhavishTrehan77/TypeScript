import { NextFunction } from "express";

export const errorHandling=(err:any,req:Request,res:Response,next:NextFunction)=>{
    return res.status(err.statusCode||500).json({
        success:false,
        message:err.message
    })
}

