require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;
const adminVerify = async (req,res,next)=>{
    // console.log(req.user);
    
    try {
        if(!req.user){
            return res.status(401).json({
                message:"user is unauthrized"
            })

        }
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message:"Access Denied admin only login"
            })

        }
        next();
        
    } catch (error) {
            return res.status(500).json({
               message:"server error"
            })

        
    }
}

module.exports = adminVerify