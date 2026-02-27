
const User = require("../models/users.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
// const authcontroller = require("./auth.controllers")
require('dotenv').config();
const jwt_secretkey = process.env.JWT_SECRET_KEY;


//------- GET USER ----- 

const getUser = async (req, res)=>{
    try {
        console.log("start get user api......")
        const users = await User.find().select("-password");
        console.log("users>>>>",users)
         res.send(users)
    } catch (error) {
       res.status(500).json({
        error:error.message
       }) 
    }
}

// -------- Get User By Id------

const getUserById = async (req,res) =>{
    try {
        
        console.log("Data fetching by user:::::",req.fetch_user_name)

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.query);

        const id = req.query.id;
        console.log(id);
        const user = await User.findById(id).select("-password")

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })

    }
    if(!user.isLoggedIn){
        return res.status(404).json({
            message:"user not logged in"
        })
    }
    res.json(user)

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
    
}

// -------- Update User ------

const updateUser = async (req, res) => {
    try {
        if (!req.query.email) {
            // return
            return res.status(400).json({ message: "email is mandatory!" })
        }
       
        // const keys = Object.keys(req.body.data);
        // const values = Object.values(req.body.data);
        // console.log("kesy>>>>>>>>>>>", keys);
        // console.log("values>>>>>>>>>>>", values);
        const email = req.query.email;
        await User.updateOne({email},{ $set:req.body.data});
        res.status(202).json({ message: "Data updated successfully!" })
    } catch (e) {
        console.log(e);
        return res.json({ "message": e.message })
    }
}

const deleteUser = async (req,res)=>{
    const email = req.query.email;
    const  deleteuser = await User.deleteOne({email});

    if(!deleteuser){
        res.status(400).json({
            message:"user not found"

        })
    }

    res.status(200).json({
        message:"user deletesuccessfully",
        data:deleteuser
    })
}

module.exports = {getUser,getUserById,updateUser,deleteUser}


 