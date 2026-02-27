const express = require("express");
const router = express.Router();
const tokenVerify = require('../middleware/token.middleware');
const { createOrder, getMyOrders, updateorderstatus } = require("../controllers/order.controllers");
const adminVerify = require("../middleware/admin.middleware");

router.post('/createorder',tokenVerify, createOrder)
router.get('/getorder',tokenVerify, getMyOrders)
router.put('/updateorder/:id',tokenVerify,adminVerify,updateorderstatus)
module.exports = router