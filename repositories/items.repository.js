class ItemsRepository {
  // 생성자 주입을 통한 의존성 주입
  constructor(ItemModel, ItemImagesModel) {
    this.itemModel = ItemModel;
    this.itemImagesModel = ItemImagesModel;
  }

  createPost = async (title, price, content, imagePath) => {
    console.log('imagePath: ', imagePath);

    if (imagePath) {
      if (Array.isArray(imagePath)) {
        throw new Error('상품의 이미지는 한장만 추가가 가능합니다.');
      } else {
        await this.itemModel.create({
          title: title,
          price: price,
          content: content,
          image: imagePath,
          userId: 1,
        });
      }
    }

    const fullItems = await this.itemModel.findAll({});

    return fullItems;
  };

  findAllPost = async () => {
    // TODO
  };

  findPostById = async (postId) => {
    // TODO
  };

  updatePost = async (postId, password, title, content) => {
    // TODO
  };

  deletePost = async (postId, password) => {
    // TODO
  };
}

module.exports = ItemsRepository;
