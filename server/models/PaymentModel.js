const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    fullName:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    zip:{
        type: Number,
        required: true,
    },



    nameOnCard:{
        type: String,
    },
    cardNo:{
        type: Number,
    },
    expMonth:{
        type: String,
    },
    expYear:{
        type: String,
    },
    cvv:{
        type: Number,
    },

    paymentUserId: {
        type: String,

    }
});

const PaymentItems = mongoose.model('payment', paymentSchema);

module.exports = PaymentItems;
