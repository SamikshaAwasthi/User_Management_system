const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./dbconnection/dbconnection")
connectDb()
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const authroutes = require("./routes/auth.routes")
const userroutes = require("./routes/user.routes")
const productroutes = require("./routes/product.routes")
const cartroutes = require("./routes/cart.routes")
const orderroutes = require("./routes/order.routes")
app.use("/api/user",userroutes)
app.use("/api/authentication",authroutes)
app.use("/api/products",productroutes)
app.use("/api/carts",cartroutes)
app.use("/api/order",orderroutes)
app.get('/',(req,res)=>{
    res.send("get received");
})
app.listen(PORT,()=>{
    console.log("server is listen on port :",PORT);
    
})