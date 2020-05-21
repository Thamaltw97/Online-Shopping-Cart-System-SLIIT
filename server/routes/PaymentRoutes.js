const router = require('express').Router();
let PaymentItems = require('../models/PaymentModel');


router.route('/').get((req, res) => {
    PaymentItems.find()
        .then(payment => res.json({ success: true, payment }))
        .catch(err => res.status(400).json({ success: false, err }));
});


//Add new payment route
router.route('/add').post((req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const zip = req.body.zip;
    const nameOnCard = req.body.nameOnCard;
    const cardNo = req.body.cardNo;
    const expMonth = req.body.expMonth;
    const expYear = req.body.expYear;
    const cvv = req.body.cvv;
    // const paymentUserId = req.body.paymentUserId;

    const newItem = new PaymentItems({
        fullName,
        email,
        address,
        city,
        country,
        zip,
        nameOnCard,
        cardNo,
        expMonth,
        expYear,
        cvv
        // paymentUserId

    });

    newItem.save()
        .then(() => res.json('Successfully Saved the Payment Details.'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Get Item by id route
router.route('/:id').get((req, res) => {
    PaymentItems.findById(req.params.id)
        .then(cart => res.json(payment))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/cartbyuser/:id').get((req, res) => {
    CartItems.find({"cartUserId" : req.params.id})
        .then(cart => res.json({ success: true, cart }))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
