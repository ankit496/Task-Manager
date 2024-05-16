const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        unique:true,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Done'],
        default:false
    }
})
const Task=mongoose.model('Task',taskSchema)
module.exports=Task