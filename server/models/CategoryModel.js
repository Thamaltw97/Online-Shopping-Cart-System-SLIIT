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
    categoryDesc: {
        type: String,
        trim: true,
        default: ""
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;