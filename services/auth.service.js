const { Users, Images } = require('../models');
const AuthRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');

class AuthService {
  authRepository = new AuthRepository(Users, Images);

  register = async (email, nickname, password, imageSrc) => {
    const isUser = await this.authRepository.findByEmail(email);
    if (isUser !== null) {
      if (isUser.nickname === nickname) {
        throw new Error('이미 사용중인 닉네임입니다.');
      }
      throw new Error('이미 사용중인 email입니다.');
    }

    const registerUser = await this.authRepository.register(
      email,
      nickname,
      password
    );

    if (imageSrc) {
      await this.authRepository.imageCreate(imageSrc, registerUser);
    }
    return registerUser;
  };

  login = async (email, password) => {
    const isUser = await this.authRepository.findByEmail(email);
    const isImage = await this.authRepository.findByUserAndImage(isUser.userId);

    if (isUser === null) {
      throw new Error('닉네임 또는 패스워드를 확인해주세요.');
    }

    if (isUser.password !== password) {
      throw new Error('비밀번호가 다릅니다.');
    }

    const token = jwt.sign({ userId: isUser.userId }, process.env.JWT_SECRET_KEY);
    return { token, isUser, isImage };
  };
}

module.exports = AuthService;
