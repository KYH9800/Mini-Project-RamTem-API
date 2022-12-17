const { Op } = require('sequelize');

class AuthRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }
  register = async (email, nickname, password) => {
    const registerUserData = await this.userModel.create({
      email,
      nickname,
      password,
    });
    return registerUserData;
  };

  findByEmail = async(email)=>{
    const isUser = await this.userModel.findOne({where:{email}})
    return isUser
  }
}

module.exports = AuthRepository;