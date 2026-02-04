
const User = require("../models/users.model")
const bcrypt = require("bcryptjs");
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
    const {email,password}= req.body    
    const user = await User.findOne({email})
    user.isLogedin = true;
    await user.save();

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

    res.status(200).json({
        message:"user received",
        user:{
            id: user._id,
            name:user.name,
            email:user.email,
            isLogedin:user.isLogedin,
            role:user.role
        }
    })
}


//------ Logout Api ----------
const logout = async (req,res)=> {
    res.send("logout successfull")
}
module.exports = {signUp,login,logout}