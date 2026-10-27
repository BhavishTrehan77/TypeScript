import mongoose,{Schema,Document} from "mongoose";
interface IUser extends Document{
    name:String,
    email:String,
    password:String,
    role:"user"|"admin"
}

const UserSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"]
    }
})
const User=mongoose.model<IUser>("User",UserSchema)

export default User