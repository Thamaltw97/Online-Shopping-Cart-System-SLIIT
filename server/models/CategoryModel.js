const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    categoryDescription: {
        type: String,
        trim: true,
        default: ""
    },
});

const Product = mongoose.model('Category', categorySchema);

module.exports = Product;