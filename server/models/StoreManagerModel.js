const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeManagerSchema = new Schema({
    storeManagerFName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    storeManagerLName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    storeManagerEmail: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    storeManagerPhoneNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    storeManagerPassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
});

const StoreManager = mongoose.model('StoreManager', storeManagerSchema);

module.exports = StoreManager;