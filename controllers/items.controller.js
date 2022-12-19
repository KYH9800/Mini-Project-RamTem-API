const ItemsService = require('../services/items.service');
// image file form data 형식으로 받아옴
// 참고: https://biio-studying.tistory.com/207

class ItemsController {
  itemsService = new ItemsService();

  // 상품 추가, 이미지 추가
  createItem = async (req, res, next) => {
    try {
      const { title, price, content, category } = req.body;
      // 기존 주소와 리사이징된 주소를 보내주는 이유는 다음과 같다.
      // 이미지가 크거나 많으면 오래걸린다. 이미지 리사이징 시간이 조금 오래 걸릴 시
      // thumb 폴더에 결과물이 생기지 않은 경우 대비
      // 이를 방지하고자 임시 방편으로 기존 original 폴더 안에 이미지 원본을 보내준다.
      const originalFile = req.file.location;
      const resizingUrl = originalFile.replace(/\/original\//, '/thumb/');
      const user = res.locals.user;

      const createItemData = await this.itemsService.createItem(
        user,
        title,
        price,
        content,
        category,
        resizingUrl
      );

      return res.status(201).send({
        data: createItemData,
        message: '상품이 추가되었습니다.',
        result: true,
        originalFile: originalFile,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  // 전체 상품 목록 조회
  getItems = async (req, res, next) => {
    try {
      const { lastId } = req.query;
      console.log('lastId in controller: ', lastId);
      const allItems = await this.itemsService.getItems(lastId);

      return res.status(200).send({ data: allItems, result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        errorMessage: '상품 목록 조회에 실패하였습니다.',
        result: false,
      });
    }
  };

  // 메인페이지 상품 목록 조회 / 최상단 4개
  getMainItems = async (req, res, next) => {
    try {
      const mainItems = await this.itemsService.getMainItems();

      return res.status(200).json({
        data: mainItems,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        errorMessage: '상품 목록 조회에 실패하였습니다.',
        result: false,
      });
    }
  };

  // 상품 상세 정보 조회
  getItemDetail = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const detailItem = await this.itemsService.getItemDetail(itemId);

      return res.status(200).send({
        data: detailItem,
        result: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        errorMessage: '상세정보 조회에 실패하였습니다.',
        result: false,
      });
    }
  };

  // 상품 수정
  updateItem = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const imgFileInfo = req.file;
      const { title, price, content, category } = req.body;
      const user = res.locals.user;

      const updateItem = await this.itemsService.updateItem(
        user,
        itemId,
        title,
        price,
        content,
        category,
        imgFileInfo
      );

      return res.status(201).send({
        data: updateItem,
        message: '상품 수정에 성공했습니다.',
        result: true,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).send({
        error: error.message,
        errorMessage: '상품 수정에 실패했습니다.',
        result: false,
      });
    }
  };

  // 상품 삭제
  deleteItem = async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const user = res.locals.user;
      console.log('user: ', user);
      const deleteItem = await this.itemsService.deleteItem(user, itemId);

      return res.status(200).send({
        data: deleteItem,
        message: '상품이 삭제 되었습니다.',
        result: true,
      });
    } catch (error) {
      console.error(error);
      res.status(400).send({
        error: error.message,
        errorMessage: '상품 삭제에 실패했습니다.',
        result: false,
      });
    }
  };
}

module.exports = ItemsController;
