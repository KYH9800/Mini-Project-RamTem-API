// awsMulterModule
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

//* AWS의 S3란?
// multer-s3는 multer를 통해 S3에 저장하기 위해서 사용하는 라이브러리
module.exports = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'chocheolhee321',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 실시간 채팅 이미지 -> S3
// 실시간 채팅 DB -> radis
