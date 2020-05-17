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
        .then(discount => res.json({ success: true, discount }))
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
        .catch(err => res.status(400).json('Error from server: ' + err));

});


//Update discount by id route
router.route('/update/:id').put((req, res) => {
    Discount.findById(req.params.id)
        .then(discount => {
            discount.discountCouponName = req.body.discountCouponName;
            discount.discountDesc = req.body.discountDesc;
            discount.discountAmount = req.body.discountAmount;
            //discount.discountProductId = req.body.discountProductId;
            //discount.discountProductCategory = req.body.discountProductCategory;
            //discount.discountProducts = req.body.discountProducts;
            discount.discountRemarks = req.body.discountRemarks;

            let successMsg = 'Successfully Updated. (Discount id: ' + req.params.id + ')';
            discount.save()
                .then(() => res.json({ success: true, successMsg }))
                .catch(err => res.status(400).json('Error from server: ' + err));
        })
        .catch(err => res.status(400).json(err));
});


//Delete discount by id route
router.route('/delete/:id').delete((req, res) => {
    let delSuccessMsg = 'Successfully Deleted. (Discount id: ' + req.params.id + ')';
    Discount.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true, delSuccessMsg }))
        .catch(err => res.status(400).json('Error from server: ' + err));
});


//Get discount by product id route
router.route('/productdiscount/:id').get((req, res) => {
    Discount.find({"discountProductId" : req.params.id})
        .then(discount => res.json(discount))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;