const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  register = async (req, res, next) => {
    const { email, nickname, password, passwordCheck } = req.body;
    // 기존 주소와 리사이징된 주소를 보내주는 이유는 다음과 같다.
    // 이미지가 크거나 많으면 오래걸린다. 이미지 리사이징 시간이 조금 오래 걸릴 시
    // thumb 폴더에 결과물이 생기지 않은 경우 대비
    // 이를 방지하고자 임시 방편으로 기존 original 폴더 안에 이미지 원본을 보내준다.
    const originalImage = req.file.location;
    const resizingUrl = originalImage.replace(/\/original\//, '/thumb/');

    if (password !== passwordCheck) {
      return res
        .status(412)
        .json({ errorMessage: '패스워드가 일치하지 않습니다.' });
    }
    try {
      await this.authService.register(email, nickname, password, originalImage);
      return res.status(201).json({
        message: '회원가입 성공',
        result: true,
        originalImage: originalImage,
      });
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

  tokenCheck = async (req, res, next) => {
    const user = res.locals.user;

    try {
      const data = await this.authService.findTokenUser(user);
      return res.status(201).json({ result: data });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
