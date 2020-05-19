const router = require('express').Router();
let Comment = require('../models/CommentModel');


//Get all comments by product id route
router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json({ success: true, comment }))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get comments by both user id and product id route
//to show only user's comment
// router.route('/:id').get((req, res) => {
//     Product.findById(req.params.id)
//         .then(product => res.json({ success: true, product }))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

//Add new comment route
router.route('/add').post((req, res) => {

    const comment = req.body.comment;
    const suggestions = req.body.suggestions;
    const productId = req.body.productId;
    const userId = req.body.userId;

    const newComment = new Comment({
        comment,
        suggestions,
        productId,
        userId
    });

    newComment.save()
        .then(() => res.json('Successfully Saved the comment.'))
        .catch(err => res.status(400).json('Error from server: ' + err));

});

//Update Comment by user id route
router.route('/update/:id').put((req, res) => {
    Comment.findById(req.params.id)
        .then(newComment => {
            newComment.comment = req.body.comment;
            newComment.suggestions = req.body.suggestions;

            let successMsg = 'Successfully Updated. (Comment id: ' + req.params.id + ')';
            newComment.save()
                .then(() => res.json({ success: true, successMsg }))
                .catch(err => res.status(400).json({ success: false, err }));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete comment by user id route
router.route('/delete/:id').delete((req, res) => {
    let delSuccessMsg = 'Successfully Deleted. (Comment id: ' + req.params.id + ')';
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true, delSuccessMsg }))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
