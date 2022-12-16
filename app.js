const express = require('express');
const app = express();
const port = 3000;
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
  alter: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // content type이 urlencoded type의 경우 parser 해준다

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: true,
    credentials: true, // default: false
  })
);

app.use('/api', routes);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
