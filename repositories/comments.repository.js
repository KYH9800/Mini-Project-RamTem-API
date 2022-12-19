class CommentRepository {
  // 생성자 주입을 통한 의존성 주입
  constructor(CommentModel) {
    this.commentModel = CommentModel;
  }

  findCommentById = async (commentId) => {
    const comment = await this.commentModel.findByPk(commentId);

    return comment;
  };

  createComment = async (itemId, content, userId) => {
    const createCommentData = await this.commentModel.create({
      itemId,
      content,
      userId,
    });

    return createCommentData;
  };

  updateComment = async (commentId, content) => {
    const updateCommentData = await this.commentModel.update(
      { content },
      { where: { commentId } }
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const updateCommentData = await this.commentModel.destroy({
      where: { commentId },
    });

    return updateCommentData;
  };
}

module.exports = CommentRepository;
