const CommentRepository = require('../repositories/comments.repository');
// 생성자 주입을 통한 의존성 주입
const { Comments } = require('../models');

class CommentService {
  commentRepository = new CommentRepository(Comments); // 생성자 주입을 통한 의존성 주입

  // findAllComment = async () => {
  //   const allComment = await this.commentRepository.findAllComment();

  //   allComment.sort((a, b) => {
  //     return b.createdAt - a.createdAt;
  //   });

  //   return allComment.map((comment) => {
  //     return {
  //       commentId: comment.commentId,
  //       nickname: comment.nickname,
  //       title: comment.title,
  //       createdAt: comment.createdAt,
  //       updatedAt: comment.updatedAt,
  //     };
  //   });
  // };

  // findCommentById = async (commentId) => {
  //   const findComment = await this.commentRepository.findCommentById(commentId);

  //   return {
  //     commentId: findComment.commentId,
  //     nickname: findComment.nickname,
  //     title: findComment.title,
  //     content: findComment.content,
  //     createdAt: findComment.createdAt,
  //     updatedAt: findComment.updatedAt,
  //   };
  // };

  createComment = async (itemId, content, userId) => {
    const createCommentData = await this.commentRepository.createComment(
      itemId,
      content,
      userId
    );

    return {
      content: createCommentData.content,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  // updateComment = async (commentId, password, title, content) => {
  //   const findComment = await this.commentRepository.findCommentById(commentId);
  //   if (!findComment) throw new Error("Comment doesn't exist");

  //   await this.commentRepository.updateComment(commentId, password, title, content);

  //   const updateComment = await this.commentRepository.findCommentById(commentId);

  //   return {
  //     commentId: updateComment.commentId,
  //     nickname: updateComment.nickname,
  //     title: updateComment.title,
  //     content: updateComment.content,
  //     createdAt: updateComment.createdAt,
  //     updatedAt: updateComment.updatedAt,
  //   };
  // };

  // deleteComment = async (commentId, password) => {
  //   // console.log('commentId, password: ', commentId, password);
  //   const findComment = await this.commentRepository.findCommentById(commentId);
  //   if (!findComment) throw new Error("Comment doesn't exist");

  //   await this.commentRepository.deleteComment(commentId, password);

  //   return {
  //     commentId: findComment.commentId,
  //     nickname: findComment.nickname,
  //     title: findComment.title,
  //     content: findComment.content,
  //     createdAt: findComment.createdAt,
  //     updatedAt: findComment.updatedAt,
  //   };
  // };
}

module.exports = CommentService;
