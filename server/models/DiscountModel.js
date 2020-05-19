const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema({
    discountCouponName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    discountDesc: {
        type: String,
        maxlength: 100,
    },
    discountAmount: {
        type: Number,
        required: true,
        min: 1
    },
    discountProductId: {
        type : String,
        required : true,
        trim: true,
    },
    discountRemarks: {
        type : String,
        default: "",
        maxlength: 50
    }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;