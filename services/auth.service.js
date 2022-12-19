const { Users, Images } = require('../models');
const AuthRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');
const {
  ValidationError,
  InvalidParamsError,
} = require('../exceptions/index.exception');
const bcrypt = require("bcrypt")

class AuthService {
  authRepository = new AuthRepository(Users, Images);

  register = async (email, nickname, password, image) => {
    const isUser = await this.authRepository.findByEmail(email);
    if (isUser !== null) {
      if (isUser.nickname === nickname) {
        throw new ValidationError('이미 사용중인 닉네임입니다.');
      }
      throw new ValidationError('이미 사용중인 email입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 6)

    const registerUser = await this.authRepository.register(
      email,
      nickname,
      hashedPassword,
      image
    );

    return registerUser;
  };

  login = async (email, password) => {
    const isUser = await this.authRepository.findByEmail(email);
    
    if (isUser === null) {
      throw new ValidationError('닉네임을 확인해주세요.');
    }
    
    const checkPassword = await bcrypt.compare(password, isUser.password)
    if (!checkPassword) {
      throw new ValidationError('비밀번호가 다릅니다.');
    }

    const UserData = await this.authRepository.findByUserId(isUser.userId);

    const token = jwt.sign(
      { userId: isUser.userId },
      process.env.JWT_SECRET_KEY
    );

    const data = {
      token: token,
      result: true,
      admin: UserData.admin,
      email: UserData.email,
      nickname: UserData.nickname,
      imageSrc: UserData.image,
    };
    return data;
  };
}

module.exports = AuthService;
