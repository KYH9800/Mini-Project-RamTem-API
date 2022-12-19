const ItemsRepository = require('../repositories/items.repository');
// 생성자 주입을 통한 의존성 주입
const { Items, Comments, Users } = require('../models');
//* dummyUserAdmin
const userAdmin = 0;

// Query를 쓰면은 대량의 데이터를 다룰 때 ORM 보다 빠르다.
// ORM이 생산성이 좋기 떄문에 쓰는 것
// express -> database -> express with database ->
class ItemsService {
  itemsRepository = new ItemsRepository(Items, Comments, Users); // 생성자 주입을 통한 의존성 주입

  // 상품 추가
  createItem = async (user, title, price, content, category, imgFileInfo) => {
    console.log('user: ', user);
    const imgPath = imgFileInfo.path;

    if (!title || !price || !content || !category || !imgFileInfo) {
      throw new Error('입력한 값이 바르지 않습니다.');
    }

    if (userAdmin) {
      throw new Error('관리자만 접근이 가능합니다.');
    } else {
      const item = await this.itemsRepository.createPost(
        title,
        price,
        content,
        category,
        imgPath
      );

      return item;
    }
  };

  // 전체 상품 목록 조회
  getItems = async (lastId) => {
    const findAllItems = await this.itemsRepository.findAllItems(lastId);

    return findAllItems;
  };

  // 메인페이지 상품 목록 조회: 최상단 4개만
  getMainItems = async () => {
    const mainItems = await this.itemsRepository.fundAllMainItems();

    return mainItems;
  };

  // 상품 상세 정보 조회
  getItemDetail = async (itemId) => {
    const detailItem = await this.itemsRepository.fundOneItemDetail(itemId);

    return detailItem;
  };

  //상품 수정
  updateItem = async (
    user,
    itemId,
    title,
    price,
    content,
    category,
    imgFileInfo
  ) => {
    const imgPath = imgFileInfo.path;
    const userId = user.userId;
    console.log('imgPath: ', imgPath);

    if (userAdmin) {
      throw new Error('관리자만 접근이 가능합니다.');
    } else {
      const updateItem = await this.itemsRepository.updateItem(
        userId,
        itemId,
        title,
        price,
        content,
        category,
        imgPath
      );
      return updateItem;
    }
  };

  // 상품 삭제
  deleteItem = async (user, itemId) => {
    const userId = user.userId;
    if (userAdmin) {
      throw new Error('관리자만 접근이 가능합니다.');
    } else {
      const deleteItem = await this.itemsRepository.deleteItem(userId, itemId);

      return deleteItem;
    }
  };
}

module.exports = ItemsService;
