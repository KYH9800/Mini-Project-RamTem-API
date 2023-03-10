const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const port = 3000;
const fs = require('fs');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// error
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/errors-hander.middleware');
// 유용한 라이브러리
const cors = require('cors');
// router
const routes = require('./routes');
// db 연결
const db = require('./models');

// db 연결 확인
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// sequelize model sync() 수정하기
db.sequelize.sync({
  force: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // content type이 urlencoded type의 경우 parser 해준다

app.use(morgan('combined'));

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: true,
    credentials: true, // default: false
  })
);

app.use('/api', routes);
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
