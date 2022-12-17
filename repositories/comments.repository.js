class CommentRepository {
  // 생성자 주입을 통한 의존성 주입
  constructor(CommentModel) {
    this.commentModel = CommentModel;
  }

  // findAllComment = async () => {
  //   const comments = await this.commentModel.findAll();

  //   return comments;
  // };

  // findCommentById = async (commentId) => {
  //   const comment = await this.commentModel.findByPk(commentId);

  //   return comment;
  // };

  createComment = async (itemId, content, userId) => {
    const createCommentData = await this.commentModel.create({
      itemId,
      content,
      userId,
    });

    return createCommentData;
  };

  // updateComment = async (commentId, password, title, content) => {
  //   const updateCommentData = await this.commentModel.update(
  //     { title, content },
  //     { where: { commentId, password } }
  //   );

  //   return updateCommentData;
  // };

  // deleteComment = async (commentId, password) => {
  //   const updateCommentData = await this.commentModel.destroy({
  //     where: { commentId, password },
  //   });

  //   return updateCommentData;
  // };
}

module.exports = CommentRepository;
