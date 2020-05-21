const router = require('express').Router();
let Comment = require('../models/CommentModel');


//Get comment by id
router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comments => res.json({ success: true, comments }))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Get all comments by product id route
router.route('/allcomments/:id').get((req, res) => {
    Comment.find({"productId": req.params.id})
        .then(comments => res.json({ success: true, comments }))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get comments by both user id and product id route
//to show only user's comment
router.route('/mycomments/:id').post((req, res) => {
    Comment.find({"productId": req.params.id, "userId": req.body.userId})
        .then(comments => res.json({ success: true, comments }))
        .catch(err => res.status(400).json('Error: ' + err));
});

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
        .catch(err => res.status(400).json('Error from server: ' + err));
});

// Delete comment by user id route
router.route('/delete/:id').delete((req, res) => {
    let delSuccessMsg = 'Successfully Deleted. (Comment id: ' + req.params.id + ')';
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true, delSuccessMsg }))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
