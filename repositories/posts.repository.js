class PostRepository {
  // 생성자 주입을 통한 의존성 주입
  constructor(PostModel) {
    this.postModel = PostModel;
  }

  findAllPost = async () => {
    const posts = await this.postModel.findAll();

    return posts;
  };

  findPostById = async (postId) => {
    const post = await this.postModel.findByPk(postId);

    return post;
  };

  createPost = async (nickname, password, title, content) => {
    const createPostData = await this.postModel.create({
      nickname,
      password,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (postId, password, title, content) => {
    const updatePostData = await this.postModel.update(
      { title, content },
      { where: { postId, password } }
    );

    return updatePostData;
  };

  deletePost = async (postId, password) => {
    const updatePostData = await this.postModel.destroy({
      where: { postId, password },
    });

    return updatePostData;
  };
}

module.exports = PostRepository;
