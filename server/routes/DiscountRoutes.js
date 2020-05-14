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
        .then(discount => res.json(discount))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Add new discount route
router.route('/add').post((req, res) => {
    const discountCouponName = req.body.discountCouponName;
    const discountDesc = req.body.discountDesc;
    const discountAmount = req.body.discountAmount;
    const discountProductId = req.body.discountProductId;
    //const discountProductCategory = req.body.discountProductCategory;
    //const discountProducts = req.body.discountProducts;
    const discountRemarks = req.body.discountRemarks;

    let newDiscount = new Discount({
        discountCouponName,
        discountDesc,
        discountAmount,
        discountProductId,
        //discountProductCategory,
        //discountProducts,
        discountRemarks
    });

    newDiscount.save()
        .then(() => res.json('Successfully Saved the discount.'))
        .catch(err => res.status(400).json('Error: ' + err));

});


//Update discount by id route
router.route('/update/:id').put((req, res) => {
    Discount.findById(req.params.id)
        .then(discount => {
            discount.discountType = req.body.discountType;
            discount.discountDesc = req.body.discountDesc;
            discount.discountAmount = req.body.discountAmount;
            discount.discountCoupon = req.body.discountCoupon;
            discount.discountProductCategory = req.body.discountProductCategory;
            discount.discountProducts = req.body.discountProducts;
            discount.discountRemarks = req.body.discountRemarks;

            discount.save()
                .then(() => res.json('Successfully Updated. (Discount id: ' + req.params.id + ')'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//Delete discount by id route
router.route('/delete/:id').delete((req, res) => {
    Discount.findByIdAndDelete(req.params.id)
        .then(() => res.json('Successfully Deleted. (Discount id: ' + req.params.id + ')'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Get discount by product id route
router.route('/productdiscount/:id').get((req, res) => {
    Discount.find({"discountProductId" : req.params.id})
        .then(discount => res.json(discount))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;