const { Op } = require('sequelize');

class AuthRepository {
  constructor(UserModel, ImageModel) {
    this.userModel = UserModel;
    this.imageModel = ImageModel;
  }
  register = async (email, nickname, hashedPassword, image) => {
    const registerUserData = await this.userModel.create({
      email,
      nickname,
      password: hashedPassword,
      image,
    });
    return registerUserData;
  };

  findByEmail = async (email) => {
    const isUser = await this.userModel.findOne({
      where: { email },
    });
    return isUser;
  };

  findByUserId = async (userId) => {
    const isUser = await this.userModel.findOne({
      where: { userId },
    });
    return isUser;
  };
}

module.exports = AuthRepository;
