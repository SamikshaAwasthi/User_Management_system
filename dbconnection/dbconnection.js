const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log("mongodb connected");
        
    } catch (error)
     {
        console.log(error.message);
        process.exit(1)
    }
}
module.exports= connectDb;