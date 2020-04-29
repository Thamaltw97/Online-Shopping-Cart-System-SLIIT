const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    productCategory: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    productBrand: {
        type : String,
        required : true,
        trim: true,
        minlength : 3,
        maxlength : 30
    },
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
    productQuantity: {
        type: Number,
        required: true,
        min: 1
    },
    productUnitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    productImgUrl: {
        type : String,
        required : true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;