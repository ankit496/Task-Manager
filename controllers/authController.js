const mongoose=require('mongoose')
const User=require("../models/User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET=process.env.JWT_SECRET
const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username:username});
        if(!user){
            return res.status(403).json({success:false,"message":"Invalid username or password"});
        }
        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid)
            return res.status(403).json({"message":"Invalid username or password"});
        const token = jwt.sign({ userId: user._id }, JWT_SECRET,{ expiresIn: '7d' });
        // req.user=token;
        res.status(200).json({success:true,token});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const signup=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username:username});
        if(user){
            return res.status(403).json({success:false,"message":"Username already exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET,{ expiresIn: '7d' });
        return res.status(200).json({success:true,token});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports={
    login,
    signup
}