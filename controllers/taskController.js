const Task=require('../models/Task')
const addTask=async(req,res)=>{
    // try{
        const userId=req.id
        const {title,description,due_date,status}=req.body
        const task=await Task.findOne({description:description})
        if(task)
            return res.status(403).json("Task already exist")
        const newtask=await Task.create({user:userId,title:title,description:description,due_date:due_date,status:status})
        return res.status(200).json(newtask)
    // }
    // catch(err){
        // return res.status(500).json(err)
    // }
}
const updateTask=async(req,res)=>{
    const { title, description, status } = req.body
    const newData = {};
    if (title) { newData.title = title }
    if (description) { newData.description = description }
    if (status) { newData.status = status }
    try {
        let task = await Task.findById(req.params.id)
        if (!task)
            res.status(404).send('Note not found')
        if (task.user.toString() !== req.id)
            res.status(401).send('Not allowed')
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })
        return res.status(200).json(task)
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}
const deleteTask=async(req,res)=>{
    try{
        let task = await Task.findById(req.params.id)
        if (!task)
            return res.status(404).send('Task not found')
        if (task.user.toString() !== req.id)
            return res.status(401).send('Not allowed')
        task = await Task.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: 'successfully deleted the task' })
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
const fetchAllTasks=async(req,res)=>{
    try{
        const userId=req.id;
        if(!userId)
            return res.status(403).json("User not authorized")
        const tasks=await Task.find({user:userId})
        return res.status(200).json(tasks)
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
const getTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await Task.findById(id)
        return res.status(200).json(task)
    }
    catch(error){
        return res.status(500).json({message:'Internal server error'})
    }
}
module.exports={
    addTask,
    updateTask,
    deleteTask,
    fetchAllTasks,
    getTask
}