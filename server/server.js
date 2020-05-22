const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Express Middlewares
app.use(express.json());
app.use(cors());

//DB Config   //If cloning from git, include mongoURI in './config/keys'
//const mongoURI = require('./config/keys').MONGO_URI;
//Use process.env.MONGO_URI instead of uri if using .env file

//Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.log("ERROR: " + err));


//Import routers from routes directory
const productsRouter = require('./routes/ProductRoutes');
const discountsRouter = require('./routes/DiscountRoutes');
const categoryRouter = require('./routes/CategoryRoutes');
const wishlistsRouter = require('./routes/WishListRoutes');
const userRouter = require('./routes/UserRoutes');
const cartRouter = require('./routes/CartRoutes');
const commentsRouter = require('./routes/CommentRoutes');
const paymentRouter = require('./routes/PaymentRoutes');

//Use routers
app.use('/api/products', productsRouter);
app.use('/api/discounts', discountsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/wishlists',wishlistsRouter);
app.use('/api/users',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/comments',commentsRouter);
app.use('/api/payments',paymentRouter);

app.use('/uploads', express.static('uploads'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', index.html))
    })
}

// Start server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
