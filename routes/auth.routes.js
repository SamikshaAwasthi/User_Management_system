const express = require("express");
const tokenverify = require("../middleware/token.middleware")
const {signUp,login,logout,getProfile}= require("../controllers/auth.controllers");
const adminVerify = require("../middleware/admin.middleware");
const router = express.Router();
console.log(tokenverify);

router.post("/signup",signUp );
router.post("/login", login);
router.get("/profile",tokenverify,getProfile);
router.post("/logout",  logout);
// router.put("/change-password", tokenverify, changePassword);

module.exports = router