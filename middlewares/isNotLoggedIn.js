const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    next();
  } else {
    try {
      const { userId } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
      Users.findByPk(userId).then((user) => {
        return res
          .status(401)
          .json({ errorMessage: '이미 로그인이 되어있습니다.', result: false });
      });
    } catch (err) {
      res.status(401).json({ errorMessage: 'token 정보가 다릅니다.' });
    }
  }
};
