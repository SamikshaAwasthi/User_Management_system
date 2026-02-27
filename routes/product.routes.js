const express = require("express")
const router = express.Router()
const tokenVerify = require('../middleware/token.middleware')
const adminVerify = require('../middleware/admin.middleware');
const {createProduct, getAllProduct, getProductById, updateProduct ,deleteProduct} = require('../controllers/product.controllers')
router.post('/createproduct',tokenVerify,adminVerify,createProduct)
router.get('/getproducts',getAllProduct)
router.get('/getproduct/:id',getProductById)
router.put('/updateproduct/:id',tokenVerify,adminVerify,updateProduct)
router.delete("/deleteproduct/:id",tokenVerify,adminVerify,deleteProduct);

module.exports = router;

// 