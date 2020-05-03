const router = require('express').Router();
let Discount = require('../models/DiscountModel');


//Get all discounts route
router.route('/').get((req, res) => {
    Discount.find()
        .then(discounts => res.json(discounts))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Get discount by id route
router.route('/:id').get((req, res) => {
    Discount.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Add new discount route
router.route('/add').post((req, res) => {
    const discountType = req.body.discountType;
    const discountDesc = req.body.discountDesc;
    const discountAmount = req.body.discountAmount;
    const discountCoupon = req.body.discountCoupon;
    const discountProductCategory = req.body.discountProductCategory;
    const discountProducts = req.body.discountProducts;
    const discountRemarks = req.body.discountRemarks;

    let newDiscount = new Discount({
        discountType,
        discountDesc,
        discountAmount,
        discountCoupon,
        discountProductCategory,
        discountProducts,
        discountRemarks
    });

    newDiscount.save()
        .then(() => res.json('Successfully Saved the discount.'))
        .catch(err => res.status(400).json('Error: ' + err));

});