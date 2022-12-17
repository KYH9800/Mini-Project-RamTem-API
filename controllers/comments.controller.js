const CommentService = require('../services/comments.service');

const { Comments } = require('../models');

class CommentsController {
  commentService = new CommentService();

  // getComments = async (req, res, next) => {
  //   const comments = await this.commentService.findAllComment();

  //   res.status(200).json({ data: comments });
  // };

  // getCommentById = async (req, res, next) => {
  //   const { commentId } = req.params;
  //   const comment = await this.commentService.findCommentById(commentId);

  //   res.status(200).json({ data: comment });
  // };

  createComment = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const { content } = req.body;
      const { userId } = res.locals.user;

      const createCommentData = await this.commentService.createComment(
        itemId,
        content,
        userId
      );

      res.status(201).json({ data: createCommentData });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };

  // updateComment = async (req, res, next) => {
  //   const { commentId } = req.params;
  //   const { password, title, content } = req.body;

  //   const updateComment = await this.commentService.updateComment(
  //     commentId,
  //     password,
  //     title,
  //     content
  //   );

  //   res.status(200).json({ data: updateComment });
  // };

  // deleteComment = async (req, res, next) => {
  //   const { commentId } = req.params;
  //   const { password } = req.body;

  //   const deleteComment = await this.commentService.deleteComment(commentId, password);

  //   res.status(200).json({ data: deleteComment });
  // };
}

module.exports = CommentsController;
