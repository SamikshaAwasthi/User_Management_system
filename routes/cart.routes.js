const express = require("express")
const router = express.Router()
const tokenVerify = require('../middleware/token.middleware')
const {addtoCart,getCart, updateCart, removeCartItem} = require('../controllers/cart.controllers')
router.post('/addcart',tokenVerify,addtoCart)
router.get('/getcart',tokenVerify,getCart)
router.put('/updatecart/:id',tokenVerify,updateCart)
router.delete('/removecart/:id',tokenVerify,removeCartItem)

module.exports = router;