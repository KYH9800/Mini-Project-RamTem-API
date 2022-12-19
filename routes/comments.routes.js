const express = require('express');
const router = express.Router();
const authIsLoggedIn = require('../middlewares/isLoggedIn');

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:itemId', authIsLoggedIn, commentsController.createComment);
router.patch('/:commentId', authIsLoggedIn, commentsController.updateComment);
router.delete('/:commentId', authIsLoggedIn, commentsController.deleteComment);

module.exports = router;
