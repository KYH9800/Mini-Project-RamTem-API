const ItemsService = require('../services/items.service');
// image file form data 형식으로 받아옴
// 참고: https://biio-studying.tistory.com/207

class ItemsController {
  itemsService = new ItemsService();

  // 상품 추가, 이미지 추가
  createItem = async (req, res, next) => {
    try {
      // console.log('title, price, content: ', title, price, content);
      const { title, price, content } = req.body;
      const imgFileInfo = req.file;

      const createItemData = await this.itemsService.createItem(
        title,
        price,
        content,
        imgFileInfo
      );

      return res
        .status(201)
        .send({ data: createItemData, message: '상품이 추가되었습니다.' });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  // 전체 상품 목록 조회
  getItems = async (req, res, next) => {
    res.status(200).send('get Items');
    // res.status(200).json({ data: posts });
  };

  // 메인페이지 상품 목록 조회 / 최상단 4개
  getMainItems = async (req, res, next) => {
    // TODO
    // res.status(201).json({ data: createPostData });
    // res.status(400).json({ errorMessage: error.message });
  };

  // 상품 상세 정보 조회
  getItemDetail = async (req, res, next) => {
    // TODO
    // res.status(200).json({ data: deletePost });
  };

  // 상품 수정
  updateItem = async (req, res, next) => {
    // TODO
    // res.status(200).json({ data: updatePost });
  };

  // 상품 삭제
  deleteItem = async (req, res, next) => {
    // TODO
    // res.status(200).json({ data: deletePost });
  };
}

module.exports = ItemsController;
