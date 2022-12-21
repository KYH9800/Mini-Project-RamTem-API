const { Op } = require('sequelize');

class ItemsRepository {
  // 생성자 주입을 통한 의존성 주입
  constructor(ItemModel, CommentsModel, UsersModel) {
    this.itemModel = ItemModel;
    this.commentModel = CommentsModel;
    this.usersModel = UsersModel;
  }

  createPost = async (userId, title, price, content, category, imagePath) => {
    console.log('imagePath: ', imagePath);
    if (imagePath) {
      if (Array.isArray(imagePath)) {
        throw new Error('상품의 이미지는 한장만 추가가 가능합니다.');
      } else {
        const postItem = await this.itemModel.create({
          userId: userId,
          title: title,
          price: price,
          content: content,
          category: category,
          image: imagePath,
        });
        return postItem;
      }
    }
    // const fullItems = await this.itemModel.findAll({});
    // return fullItems;
  };

  // 전체 상품 목록 조회
  findAllItems = async (lastId) => {
    console.log('lastId in repository: ', lastId);
    const where = {};
    // query로 받아온 lastId로 찾은 게시글이 있으면(초기 로딩이 아닐때) 20개 받아오기
    // where.id = { [Op.lt]: req.query.lastId, 10 -> (10진수) } // Op: Operater
    // limit: 20, // 20개만 가져와라
    //* next token: 게시글이 마지막인 경우 false를 보내줘야한다.
    if (parseInt(lastId, 10)) {
      where.itemId = { [Op.lt]: parseInt(lastId, 10) }; // Op: Operater
    } // 21, 20 , 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5 ...
    const allItems = await this.itemModel.findAll({
      where,
      limit: 20, // 20개만 가져오세요
      order: [['createdAt', 'DESC']],
    });

    console.log('allItems: ', allItems.length);
    return allItems;
  };

  // 메인페이지 상품 목록 조회: 최상단 4개만
  fundAllMainItems = async () => {
    const fourItems = await this.itemModel.findAll({
      limit: 4,
      order: [['userId', 'DESC']],
    });

    return fourItems;
  };

  // 상품 상세 정보 조회
  fundOneItemDetail = async (itemId) => {
    const detailItem = await this.itemModel.findOne({
      where: {
        itemId: itemId,
      },
      include: [
        {
          model: this.commentModel,
          attributes: ['commentId', 'content'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: this.usersModel,
              attributes: ['nickname'],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
      ],
    });

    return detailItem;
  };

  //상품 수정
  updateItem = async (
    userId,
    itemId,
    title,
    price,
    content,
    category,
    imagePath
  ) => {
    console.log('updateItem: ', itemId, title, price, content, category);

    await this.itemModel.update(
      {
        title: title,
        price: price,
        content: content,
        category: category,
        image: imagePath,
      },
      {
        where: {
          itemId: itemId,
          userId: userId,
        },
      }
    );

    const findOneUpdateItems = await this.itemModel.findOne({
      where: {
        itemId: itemId,
      },
    });

    return findOneUpdateItems;
  };

  // 상품 삭제
  deleteItem = async (userId, itemId) => {
    const deleteItem = await this.itemModel.destroy({
      where: {
        itemId: itemId,
        userId: userId,
      },
    });

    return deleteItem;
  };

  /**
   * 검색 기능
   */
  searchItems = async (title) => {
    const searchItems = await this.itemModel.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${title}%` } }],
      },
    });

    return searchItems;
  };

  /**
   * 카테고리 기능구현
   */
  categoryItems = async (category) => {
    const date = await this.itemModel.findAll({
      where: { category },
    });

    return date;
  };
}

module.exports = ItemsRepository;
