const mongoose = require("mongoose");
const User = require('../models/user.model');
const  Message = require('./message.model');


const conversationSchema = new mongoose.Schema({
    paerticipants: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: User,
        },
    ],

    message: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: Message,
          default: [],

        },
    ],
},

{timestamps: true}

);


module.exports = mongoose.model("conversation", conversationSchema);