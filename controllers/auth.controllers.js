const User = require("../models/users.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config();
const jwt_secretkey = process.env.JWT_SECRET_KEY;
// ------ signUp Api ----------
const signUp = async (req, res) => {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(400).json({ message: "user already exits in management" })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    })
    res.status(201).json({
        message: "user registered successfully",
        data: user
    }
    )
}

// ------ Login Api ----------

const login = async (req,res)=>{
    console.log(req.body);
    const {email,password}= req.body; 
      
    const user = await User.findOne({email})
    console.log("before add logged_in value.......",user);
    user.isLoggedIn = true;
    console.log("after add logged_in value.......",user.isLoggedIn);

    if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
         return res.status(400).json({
            message: "Invalid credentials"
        })
    }



    await User.updateOne(
        { email: email },              // filter
        { $set: { isLoggedIn: true } } // update
    )


    // generate jwt token
    const token = jwt.sign({
    id: user._id,
    email:user.email,
    role: user.role
  }, jwt_secretkey, { expiresIn: '1d' }
        
    )

    res.status(200).json({
        message:"user received",
        user:{
            id: user.id,
            name:user.name,
            email:user.email,
            isLoggedIn:user.isLoggedIn,
            role:user.role,
            token:token
        }
    })
}
//verify user
const getProfile = async (req, res) => {
    try {
           console.log("Decoded user from token:", req.user);
           
            const user = await User.findById(req.user.id).select("-password")
    
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
    
        }
        
        res.json(user)
    
        } catch (error) {
            res.status(500).json({
                error:error.message
            })
        }
};

//------ Logout Api ----------
const logout = async (req,res)=> {
    // res.send("logout successfull")
    try {
        const {email} = req.body
        const user = await User.findOne({email});
    if(!user){
        res.status(404).json({
            message: "User not found"
        })
    }

    user.isLoggedIn = false;
    await user.save();

    res.status(200).json({
        message:"User logedout succuessfully"
    })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
   


}

module.exports={signUp,login,logout,getProfile}
