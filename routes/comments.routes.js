const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

// router.get('/', commentsController.getcomments);
// router.get('/:commentId', commentsController.getCommentById);
router.post('/:itemId', commentsController.createComment);
// router.put('/:commentId', commentsController.updateComment);
// router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;