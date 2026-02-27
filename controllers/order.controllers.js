const Order = require("../models/order.model")
const Cart = require("../models/cart.model")
const Product = require("../models/product.model")

const createOrder = async (req,res)=>{
    try {
        //fetech Cart
        const cart = await Cart.findOne({user:req.user.id}).populate("items.product")
        if(!cart || cart.items.length === 0){
            return res.status(404).json({
                message:"cart is empty"
            })
        }
        let totalAmount = 0;

        for(let item of cart.items){
            if(item.quantity > item.product.stock){
                return res.status(400).json({
                    message: `Not enough stock for ${item.product.name}`
                })
            }
        totalAmount += item.product.price * item.quantity;}
        // Create order (for staore price snapshot )
        const order = await Order.create({
            user:req.user.id,
            items: cart.items.map((item)=>({
                product:item.product._id,
                quantity:item.quantity,
                price: item.product.price
            })),
             totalAmount,
             status: "pending"
        })
        

        //Reduce Stock
        for(let item of cart.items){
            await Product.findByIdAndUpdate(
                item.product._id,
        { $inc: { stock: -item.quantity } }
            )
        }
        // clear cart 
        cart.items =[],
        await cart.save();
        res.status(201).json({
            message:"order placed succeessfully",
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMyOrders = async (req,res)=>{
    try {
        const orders = await Order.find({user:req.user.id}).populate("items.product");

        if(!orders.length){
            return res.status(404).json({mesage:"No fount order"})
        }
        res.status(200).json({orders})
    } catch (error) {
        res.status(500).json({mesage:error.message})
    }
}

const updateorderstatus = async (req,res)=>{
    try {
        const {status} = req.body;
        if(!["pending","completed"].includes(status)){
            return res.status(400).json({ message: "Invalid status" });
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id,
             { status },
             { new: true }
        )
        console.log(req.params.id);

        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({message:"order update successfully",order})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports ={createOrder,getMyOrders,updateorderstatus}
