const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
