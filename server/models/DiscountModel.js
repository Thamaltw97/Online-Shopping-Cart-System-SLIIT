const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema({
    discountType: {
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
    discountCoupon: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    discountProductCategory: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    discountProducts :[
        {
            productID :  {
                type : String,
                required : true,
                trim: true,
            }
        }
    ],
    discountImgUrl: {
        type : String,
        default: ""
    },
    discountRemarks: {
        type : String,
        default: "",
        maxlength: 50
    }
});

const Discount = mongoose.model('Product', discountSchema);

module.exports = Discount;