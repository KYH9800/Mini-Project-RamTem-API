const { Users } = require('../models');
const AuthRepository = require('../repositories/auth.repository');

class AuthService {
  authRepository = new AuthRepository(Users);

  register = async (email, nickname, password) => {
    const isUser = await this.authRepository.findByEmail(email);
    if (isUser !== null) {
      if (isUser.nickname === nickname) {
        return res
          .status(412)
          .json({ errorMessage: '이미 사용중인 닉네임입니다.', result: false });
      }
      return res
        .status(412)
        .json({ errorMessage: '이미 사용중인 email입니다.', result: false });
    }

    const registerUser = await this.authRepository.register(
      email,
      nickname,
      password
    );
    return registerUser;
  };
}

module.exports = AuthService;
