require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

async function tokenVerify(req,res,next){
    try{
    const token = req.headers.token;
    // console.log(token)
    if(!token){
        return res.send("token not found!")
    }else{
        const decoded = jwt.verify(token,secret_key)
        if(decoded){
            console.log(decoded)
           req.user = decoded;

            next();
        }else{
            return  res.send("invalid token plase check!")
        }
    }

    }catch(err){
        console.log(err);
    }
    
}

module.exports = tokenVerify;