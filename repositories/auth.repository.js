const { Op } = require('sequelize');

class AuthRepository {
  constructor(UserModel, ImageModel) {
    this.userModel = UserModel;
    this.imageModel = ImageModel;
  }
  register = async (email, nickname, password) => {
    const registerUserData = await this.userModel.create({
      email,
      nickname,
      password,
    });
    return registerUserData;
  };

  findByEmail = async (email) => {
    const isUser = await this.userModel.findOne({
      where: { email },
    });
    return isUser;
  };

  findByUserAndImage = async (userId) => {
    const isUser = await this.imageModel.findOne({
      where: { userId },
    });
    return isUser;
  };

  imageCreate = async (image, registerUser) => {
    const createImageData = await this.imageModel.create({
      userId: registerUser.userId,
      src: image,
    });
    return createImageData;
  };
}

module.exports = AuthRepository;
