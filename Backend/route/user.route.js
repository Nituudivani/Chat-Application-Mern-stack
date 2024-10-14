const express = require("express");
const router = express.Router();

const {signup, login, logout, getUserProfile} = require('../controller/user.controller');

const secureRoute = require("../middleware/secureRoute");

// Routes Mapping
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile", secureRoute, getUserProfile);






module.exports = router; 
