const Cart = require("../models/cart.model")
const Product = require("../models/product.model")

const addtoCart = async (req,res)=>{
    try {
        const {productId,quantity} = req.body;
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({user:req.user.id})
        if(!cart){
            cart = await Cart.create({
                user:req.user.id,
                items:[{product : productId,quantity}]
            });
        }
        else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );
    
        if(itemIndex>-1){
            cart.items[itemIndex].quantity += quantity;
        }
        else{
            cart.items.push({product:productId,quantity})
        }
        await cart.save();
    }
     res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCart = async (req,res)=>{
    try{
        let cart = await Cart.findOne({user:req.user.id}).populate("items.product")
        

        if(!cart){
            return res.status(404).json({ message: "Cart is empty" });
        }
        const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

        res.status(200).json({cart,totalAmount})
    }catch(error){
        res.status(500).json({
           message:error.message
        })
    }
}

const updateCart = async (req,res)=>
{
    try {
        const {quantity} = req.body;

        const cart = await Cart.findOne({ user: req.user.id });
        

        if (!cart) {
         return res.status(404).json({ message: "Cart not found" });
    }
    
    const item = cart.items.find(
      item => item.product.toString() === req.params.id
    );
    
    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }
    item.quantity = quantity

    await cart.save();

    res.status(200).json(cart)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}  

const removeCartItem = async (req,res)=>
{
    try {
        

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
         return res.status(404).json({ message: "Cart not found" });
    }
    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.id
    );
    
    if(cart.items.length === initialLength){
      return res.status(404).json({ message: "Product not in cart" });
    }
    await cart.save();

    res.status(200).json(cart)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {addtoCart,getCart,updateCart,removeCartItem}