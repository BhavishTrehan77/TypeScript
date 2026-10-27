
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/User.routes.js'
const app=express()

dotenv.config()
app.use(express.json())






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

app.listen(3000)
