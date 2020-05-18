const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },

    password: {
        type: String,
        required: true,
        minlength:5
    },

    // passwordCheck: {
    //     type: String,
    //     required: true,
    //     minlength:5
    // },

    userRole: {
        type:String,
        default:'user'
    },

    displayName: {
        type:String
    }

});

module.exports = mongoose.model("Users", userSchema);