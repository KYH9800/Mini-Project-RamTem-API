const ItemsRepository = require('../repositories/items.repository');
// 생성자 주입을 통한 의존성 주입
const { Items, ItemImages } = require('../models');

// Query를 쓰면은 대량의 데이터를 다룰 때 ORM 보다 빠르다.
// ORM이 생산성이 좋기 떄문에 쓰는 것
// express -> database -> express with database ->
class ItemsService {
  itemsRepository = new ItemsRepository(Items, ItemImages); // 생성자 주입을 통한 의존성 주입

  // 이미지 업로드, // req.file, req.files
  // uploadImage = async (file) => {
  //   console.log('req.files: ', file); // 업로드가 어떻게 됬는지 정보들이 담겨있음
  //   console.log('file: ', file.filename);

  //   return file.filename;
  // };

  // 상품 추가
  createItem = async (title, price, content, imgFileInfo) => {
    console.log('imgFileInfo: ', imgFileInfo);
    const imgPath = imgFileInfo.path;
    console.log('imgPath: ', imgPath);
    if (!title || !price || !content || !imgFileInfo) {
      throw new Error('입력한 값이 바르지 않습니다.');
    }
    // image.map((v) => v.filename);
    const item = await this.itemsRepository.createPost(
      title,
      price,
      content,
      imgPath
    );

    return item;
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

module.exports = ItemsService;
