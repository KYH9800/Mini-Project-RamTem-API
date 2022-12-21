const CommentRepository = require('../repositories/comments.repository');
// 생성자 주입을 통한 의존성 주입
const { Comments } = require('../models');

class CommentService {
  commentRepository = new CommentRepository(Comments); // 생성자 주입을 통한 의존성 주입

  createComment = async (itemId, content, userId) => {
    const createCommentData = await this.commentRepository.createComment(
      itemId,
      content,
      userId
    );
  };

  updateComment = async (commentId, content, userId) => {
    const findComment = await this.commentRepository.findCommentById(commentId);

    console.log('commentId: ', commentId);
    console.log('content: ', content);
    console.log('userId: ', userId);

    if (userId !== findComment.userId) {
      throw { message: '작성자가 다릅니다.', code: 400, result: 'false' };
    } else {
      await this.commentRepository.updateComment(commentId, content);
    }
  };

  deleteComment = async (commentId, userId) => {
    const findComment = await this.commentRepository.findCommentById(commentId);
    if (userId !== findComment.userId) {
      throw { message: '작성자가 다릅니다.', code: 400, result: 'false' };
    } else {
      await this.commentRepository.deleteComment(commentId);
    }
  };
}

module.exports = CommentService;
