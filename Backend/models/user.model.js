const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    
    confirmpassword: {
        type: String,
        require: true,
    },
},

    {
       timestamps: true,  // user kyare create thayo and kyare update thayo 
    }

);


module.exports = mongoose.model("User", userSchema);



