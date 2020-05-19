const router = require('express').Router();
let Category = require('../models/CategoryModel');

//get all categories
router.route('/').get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json({success: false, err }));
});

//add category
router.route('/add').post((req, res) => {
    const categoryName = req.body.categoryName;
    const categoryDesc = req.body.categoryDesc;

    const newCategory = new Category({
        categoryName,
        categoryDesc,
    });

    newCategory.save()
    .then(() => res.json('Successfully added the Category.'))
    .catch(err => res.status(400).json('Error from server: ' + err));
});

//get category by id
router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update category
router.route('/update/:id').put((req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category.categoryName = req.body.categoryName;
            category.categoryDesc = req.body.categoryDesc;
 
            category.save()
                .then(() => res.json('Successfully Updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
 });

 //delete category
 router.route('/delete/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json('Successfully Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;