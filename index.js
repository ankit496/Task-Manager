const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())

const authRoute=require('./routes/authRoute')
const taskRoute=require('./routes/taskRoute')
const mongoUrl = process.env.DB_URL
const connectMongoose=()=>{
    mongoose.connect(mongoUrl)
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error"))
    db.once("open", () => {
        console.log('Database connected')
    })
}
app.use('/auth',authRoute)
app.use('/task',taskRoute)
const port=process.env.PORT
connectMongoose()
app.listen(port,()=>{
    console.log("App started on port",port)
})