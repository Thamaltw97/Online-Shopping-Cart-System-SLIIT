const router = require('express').Router();
let StoreManager = require('../models/StoreManagerModel');

router.route('/').get((req, res) => {
    StoreManager.find()
        .then(storeManagers => res.json({success: true, storeManagers}))
        .catch(err => res.status(400).json({success: false, err }));
});

router.route('/add').post((req, res) => {
    const storeManagerFName = req.body.smFName;
    const storeManagerLName = req.body.smLName;
    const storeManagerEmail = req.body.smEmail;
    const storeManagerPhoneNo = req.body.smPhoneNo;
    const storeManagerPassword = req.body.smPassword;

    const newStoreManager = new StoreManager({
        storeManagerFName,
        storeManagerLName,
        storeManagerEmail,
        storeManagerPhoneNo,
        storeManagerPassword,
    });

    newStoreManager.save()
    .then(() => res.json('Successfully added thr Store Manager.'))
    .catch(err => res.status(400).json('Error from server: ' + err));
});

module.exports = router;