const router = require('express').Router();
let Product = require('../models/ProductModel');
const multer = require('multer');


//Get all products route
router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json({ success: true, products }))
        .catch(err => res.status(400).json({ success: false, err }));
});


//Add new product route
router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const productDesc = req.body.productDesc;
    const productCategory = req.body.productCategory;
    const productBrand = req.body.productBrand;
    const productColour = req.body.productColour;
    const productSize = req.body.productSize;
    const productQuantity = req.body.productQuantity;
    const productUnitPrice = req.body.productUnitPrice;
    const productImages = req.body.productImages;
    const productRemarks = req.body.productRemarks;

    const newProduct = new Product({
        productName,
        productDesc,
        productCategory,
        productBrand,
        productColour,
        productSize,
        productQuantity,
        productUnitPrice,
        productImages,
        productRemarks
    });

    newProduct.save()
    .then(() => res.json('Successfully Saved the product.'))
    .catch(err => res.status(400).json('Error: ' + err));

});


//Get product by id route
router.route('/:id').get((req, res) => {
   Product.findById(req.params.id)
       .then(product => res.json({ success: true, product }))
       .catch(err => res.status(400).json('Error: ' + err));
});


//Update product by id route
router.route('/update/:id').put((req, res) => {
   Product.findById(req.params.id)
       .then(product => {
           product.productName = req.body.productName;
           product.productDesc = req.body.productDesc;
           //product.productCategory = req.body.productCategory;
           product.productBrand = req.body.productBrand;
           //product.productColour = req.body.productColour;
           //product.productSize = req.body.productSize;
           product.productQuantity = req.body.productQuantity;
           product.productUnitPrice = req.body.productUnitPrice;
           //product.productImages = req.body.productImages;
           //product.productRemarks = req.body.productRemarks;

           let successMsg = 'Successfully Updated. (Product id: ' + req.params.id + ')';
           product.save()
               .then(() => res.json({ success: true, successMsg }))
               .catch(err => res.status(400).json({ success: false, err }));
       })
       .catch(err => res.status(400).json('Error: ' + err));
});


//Delete product by id route
router.route('/delete/:id').delete((req, res) => {
    let delSuccessMsg = 'Successfully Deleted. (Product id: ' + req.params.id + ')';
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true, delSuccessMsg }))
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
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true)
        }
        else{
            return cb(res.status(400).json('Only jpg, jpeg, png are allowed'), false);
        }
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