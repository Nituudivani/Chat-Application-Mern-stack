const express = require("express");
const router = express.Router();

const {signup} = require('../controller/user.controller');



// Routes Mapping
router.post("/signup", signup);




module.exports = router; 
