const express = require("express");
const router = express.Router();

const { sendMessage} = require('../controller/message.controller');


// Routes Mapping

router.post("/send/:id", sendMessage);

module.exports = router; 