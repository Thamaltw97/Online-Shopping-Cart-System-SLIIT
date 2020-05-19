const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    productDesc: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    // productBrand: {
    //     type : String,
    //     required : true,
    //     trim: true,
    //     minlength : 3,
    //     maxlength : 30
    // },
    productColour: {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 30
    },
    productSize: {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 20
    },
    quantity: {
         type: Number,
         required: true,
         min: 1
    },
    productUnitPrice: {
        type: Number,
        required: true,
        min: 0
    },

    totalPrice: {
        type: Number,
        // required: true,
        min: 0
    },

    cartUserId: {
        type: String,
        required: true
    }
});

const CartItems = mongoose.model('cart', cartSchema);

module.exports = CartItems;
