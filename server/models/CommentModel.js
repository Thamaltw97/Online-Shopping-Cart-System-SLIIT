const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    comment: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    suggestions: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    productId: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    userId: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
