const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./dbconnection/dbconnection")
connectDb()
const PORT = process.env.PORT || 5000;
const userroutes = require("./routes/user.routes")
app.use(express.json()) 
app.use("/api/user",userroutes)
app.get('/',(req,res)=>{
    res.send("get received");
})
app.listen(PORT,()=>{
    console.log("server is listen on port :",PORT);
    
})