
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/User.routes.js'
import{body} from 'express-validator'
import { errorHandling } from './middlewares/error.middleware.js'
const app=express()

dotenv.config()
app.use(express.json())


const validation=[
    body('email').notEmpty().withMessage('it should nto be empty'),
    body('password').notEmpty().withMessage('password should nt be empty')
]



async function connectdb(){
    const MONGO_URL=process.env.MONGO_URI
if (!MONGO_URL) {
    throw new Error("MONGO_URI is not defined");
}
    await mongoose.connect(MONGO_URL)
    console.log("mongodb connection successfully done")
}

connectdb()

app.use("/api/v1",router)

app.use(errorHandling)

app.listen(3000)
