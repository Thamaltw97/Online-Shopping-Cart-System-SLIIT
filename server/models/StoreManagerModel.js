const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeManagerSchema = new Schema({
    smFName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    smLName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    smEmail: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    smPhoneNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    smPassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
});

const StoreManager = mongoose.model('StoreManager', storeManagerSchema);

module.exports = StoreManager;