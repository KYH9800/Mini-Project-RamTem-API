const express = require('express');
const router = express.Router();
const upload = require('../multer/awsMulterModules');
const fs = require('fs');

const isLoggedin = require('../middlewares/isLoggedIn');

const ItemsController = require('../controllers/items.controller');
const itemsController = new ItemsController();

// HTTP /api/items
router
  .post('/', isLoggedin, upload.single('image'), itemsController.createItem) // 상품 추가
  .get('/', itemsController.getItems) // 전체 상품 목록 조회
  .get('/main', itemsController.getMainItems) // 메인페이지 상품 목록 조회
  .get('/detail/:itemId', itemsController.getItemDetail) // 상품 상세 정보 조회
  .patch(
    '/:itemId',
    isLoggedin,
    upload.single('image'),
    itemsController.updateItem
  ) // 상품 수정
  .delete('/:itemId', isLoggedin, itemsController.deleteItem) // 상품 삭제
  .get('/search', itemsController.itemsSearch) // 검색 기능
  .get('/category/:category', itemsController.categoryItems); //카테고리

module.exports = router;
