const express = require("express")
const tokenVerify = require("../middleware/token.middleware")
const adminVerify = require("../middleware/admin.middleware");
const router = express.Router();
const { getUser, updateUser,deleteUser} = require("../controllers/users.controllers");

router.get('/getusers',tokenVerify,adminVerify,getUser)  
router.put('/updateuser',tokenVerify,adminVerify,updateUser);
router.delete('/deleteuser',tokenVerify,adminVerify,deleteUser);


module.exports = router