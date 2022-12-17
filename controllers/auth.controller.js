const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  register = async (req, res, next) => {
    const { email, nickname, password, passwordCheck } = req.body;
    console.log(
      'email, nickname, password, passwordCheck : ',
      email,
      nickname,
      password,
      passwordCheck
    );

    if (password !== passwordCheck) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    }
    try {
      await this.authService.register(email, nickname, password);
      return res.status(201).json({ message: '회원가입 성공', result: true });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({
          errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
          result: false,
        });
    }
  };
}

module.exports = AuthController;
