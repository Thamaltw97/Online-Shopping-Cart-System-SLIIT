const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeManagerSchema = new Schema({
    
});

const StoreManager = mongoose.model('StoreManager', storeManagerSchema);

module.exports = StoreManager;