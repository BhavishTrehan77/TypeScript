import type{Request,Response,NextFunction} from "express"
import jwt from 'jsonwebtoken';


interface jwtPayload{
    id:string,
    role:"user"|"admin"
}
export const AuthMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const AuthHeader=req.headers.authorization
        if(!AuthHeader){
            throw new Error("headers not defined")
        }
        const token=AuthHeader.split(" ")[1]
        const decoded=jwt.verify(token,"AccSecKey")
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"invalid or expired token"
        })
    }
}