const router = require('express').Router();
let Product = require('../models/ProductModel');
const multer = require('multer');

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

//Configure storage variable to uploads folder
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
});

let upload = multer({ storage: storage }).single("file");

//Add uploads to node server route (using multer) 
router.route('/uploadimage').post((req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

module.exports = router;