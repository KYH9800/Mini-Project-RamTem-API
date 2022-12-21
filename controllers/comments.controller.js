const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

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

      res
        .status(201)
        .json({ result: 'true', message: '댓글이 작성 되었습니다.' });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ result: 'false', errorMessage: '댓글 작성에 실패했습니다.' });
    }
  };

  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const { userId } = res.locals.user;

    console.log('commentId: ', commentId);
    console.log('content: ', content);
    console.log('userId: ', userId);

    try {
      const updateComment = await this.commentService.updateComment(
        commentId,
        content,
        userId
      );
      res
        .status(200)
        .json({ result: 'true', message: '댓글이 수정 되었습니다.' });
    } catch (error) {
      console.log(error);
      if (error.code) {
        return res
          .status(error.code)
          .json({ result: error.result, errorMessage: error.message });
      } else {
        return res
          .status(400)
          .json({ result: 'false', errorMessage: '댓글 수정에 실패했습니다.' });
      }
    }
  };

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const deleteComment = await this.commentService.deleteComment(
        commentId,
        userId
      );

      res
        .status(200)
        .json({ result: 'true', message: '댓글이 삭제 되었습니다.' });
    } catch (error) {
      console.log(error);
      if (error.code) {
        return res
          .status(error.code)
          .json({ result: 'false', errorMessage: error.message });
      } else {
        return res
          .status(400)
          .json({ result: 'false', errorMessage: '댓글 삭제에 실패했습니다.' });
      }
    }
  };
}

module.exports = CommentsController;
