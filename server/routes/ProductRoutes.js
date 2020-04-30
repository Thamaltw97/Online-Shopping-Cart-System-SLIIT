const router = require('express').Router();
let Product = require('../models/ProductModel');

//Get all products route
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).send('Error: ' + err));
});

//Add new product route
router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const productDesc = req.body.productDesc;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    const productColour = req.body.productColour;
    const productSize = req.body.productSize;
    const productImgUrl = req.body.productImgUrl;
    const productRemarks = req.body.productRemarks;

    const newProduct = new Product({
        productName,
        productDesc,
        productCategory,
        productBrand,
        productColour,
        productSize,
        productImgUrl,
        productRemarks
    });

    newProduct.save()
    .then(() => res.json('Successfully added the product.'))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;