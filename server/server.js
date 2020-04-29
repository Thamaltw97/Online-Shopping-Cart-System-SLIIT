const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Express Middlewares
app.use(express.json());
app.use(cors());

//DB Config   //If cloning from git, include mongoURI in './config/keys'
const uri = require('./config/keys').MONGO_URI;
//Use process.env.MONGO_URI instead of uri if using .env file

//Connect to MongoDB
mongoose
    .connect(uri,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.log("ERROR: " + err));

// Start server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});