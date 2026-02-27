const Product = require("../models/product.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config();
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            createdBy: req.user.id
        })

        res.status(201).json({
            message: "product created successfully",
            product: product
        })

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }

}

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json({
            mesage: "product received",
            product: products
        })
        console.log('api hit');

    } catch (error) {

        res.status.json({
            message: "server error",
            error: error.message
        })
    }
}
//get product using id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        res.status(200).json({
            message:"product received",
            product
        })
    } catch (error) {
             console.log("ERROR:", error.message);
                return res.status(500).json({
                message: "server error"
            })
    }

}

//update Product
const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body,{new:true})
        if(!product){
        return res.status(404).json({
            message:"product not found"   
        })}
        res.status(200).json({
            message:"product update successfully",
            product
        })
    }
    catch (error) {
        return res.status(500).json({
            message:"server error",
            error:error.message
        })
    } 
    
}

const deleteProduct = async (req,res)=>{
    try{
        const id = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
        return res.status(404).json({
            message:"product not found"   
        })}
        res.status(200).json({
            message:"product Delete successfully",
            product
        })
    }
    catch{
         return res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
}
// delete particular feild

module.exports = { createProduct, getAllProduct ,getProductById,updateProduct,deleteProduct}