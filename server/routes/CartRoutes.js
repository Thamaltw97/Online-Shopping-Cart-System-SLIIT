const router = require('express').Router();
let CartItems = require('../models/CartModel');

//Get all products route
router.route('/').get((req, res) => {
    CartItems.find()
        .then(cart => res.json({ success: true, cart }))
        .catch(err => res.status(400).json({ success: false, err }));
});


//Add new product route
router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const productDesc = req.body.productDesc;
    //const productBrand = req.body.productBrand;
    const productColour = req.body.productColour;
    const productSize = req.body.productSize;
    const productUnitPrice = req.body.productUnitPrice;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const cartUserId = req.body.cartUserId;

    const newItem = new CartItems({
        productName,
        productDesc,
        //productBrand,
        productColour,
        productSize,
        productUnitPrice,
        quantity,
        totalPrice,
        cartUserId
    });

    newItem.save()
        .then(() => res.json('Successfully Saved the product to Shopping Cart List.'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Get Item by id route
router.route('/:id').get((req, res) => {
    CartItems.findById(req.params.id)
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update Item by id route
router.route('/update/:id').put((req, res) => {
    CartItems.findById(req.params.id)
        .then(newItem => {
            newItem.quantity = req.body.quantity;
            newItem.totalPrice = req.body.totalPrice;
            newItem.save()
                .then(() => res.json('Successfully Updated. (Item id: ' + req.params.id + ')'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete product by id route
router.route('/delete/:id').delete((req, res) => {
    CartItems.findByIdAndDelete(req.params.id)
        .then(() => res.json('Successfully Deleted. (id: ' + req.params.id + ')'))
        .catch(err => res.status(400).json('Error: ' + err));
});



//Get ShoppingCart by User id
router.route('/cartbyuser/:id').get((req, res) => {
    CartItems.find({"cartUserId" : req.params.id})
        .then(cart => res.json({ success: true, cart }))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
