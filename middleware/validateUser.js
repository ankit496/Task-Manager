const JWT=require('jsonwebtoken')
const JWT_SECRET=process.env.JWT_SECRET
const validateUser=async(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).json({
            error:"Please authenticate using a valid token"
        })
    }
    try{
        const data=JWT.verify(token,JWT_SECRET)
        req.id=data.userId
        next()
    }
    catch(error){
        res.status(401).json({
            error:"Please authenticate using a valid token"
        })
    }
}
module.exports=validateUser