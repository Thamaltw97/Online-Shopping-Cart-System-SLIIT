const router = require('express').Router();
let WishlistItems = require('../models/WishlistModel');

//Get all products route
router.route('/').get((req, res) => {
    WishlistItems.find()
        .then(wishlist => res.json({ success: true, wishlist }))
        .catch(err => res.status(400).json({ success: false, err }));
});


//Add new product route
router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const productDesc = req.body.productDesc;
    const productBrand = req.body.productBrand;
    const productColour = req.body.productColour;
    const productSize = req.body.productSize;
    const productQuantity = req.body.productQuantity;
    const productUnitPrice = req.body.productUnitPrice;

    const newItem = new WishlistItems({
        productName,
        productDesc,
        productBrand,
        productColour,
        productSize,
        productQuantity,
        productUnitPrice,
    });

    newItem.save()
        .then(() => res.json('Successfully Saved the product.'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Get Item by id route
router.route('/:id').get((req, res) => {
    WishlistItems.findById(req.params.id)
        .then(wishlist => res.json(wishlist))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update product by id route
router.route('/update/:id').put((req, res) => {
    WishlistItems.findById(req.params.id)
        .then(newItem => {
            newItem.productName = req.body.productName;
            newItem.productDesc = req.body.productDesc;
            newItem.productBrand = req.body.productBrand;
            newItem.productColour = req.body.productColour;
            newItem.productSize = req.body.productSize;
            newItem.productQuantity = req.body.productQuantity;
            newItem.productUnitPrice = req.body.productUnitPrice;

            newItem.save()
                .then(() => res.json('Successfully Updated. (Product id: ' + req.params.id + ')'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete product by id route
router.route('/delete/:id').delete((req, res) => {
    WishlistItems.findByIdAndDelete(req.params.id)
        .then(() => res.json('Successfully Deleted. (Product id: ' + req.params.id + ')'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
