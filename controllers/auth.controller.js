const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  register = async (req, res, next) => {
    const { email, nickname, password, passwordCheck } = req.body;
    const image = req.file.location;

    if (password !== passwordCheck) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    }
    try {
      await this.authService.register(email, nickname, password, image);
      return res.status(201).json({ message: '회원가입 성공', result: true });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const data = await this.authService.login(email, password);
      
      return res.status(201).json({ result: data });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
