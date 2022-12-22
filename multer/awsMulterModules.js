// awsMulterModule
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
console.log('path: ', path);

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

//* AWS의 S3란? - simple, storage, service
// multer-s3는 multer를 통해 S3에 저장하기 위해서 사용하는 라이브러리
module.exports = multer({
  storage: multerS3({
    s3: new AWS.S3(), // config 통해 접근
    bucket: 'kyh-my-bucket', // 나의 버킷 이름
    Fields: {
      key: req.queery.file,
      ContentType: 'image/png',
    },
    key(req, file, cb) {
      //! string.trim 통해 파일명의 공백 제거 / 참고: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
      // original 폴더 안에 업로드한 파일을 넣을 것이다.
      // 이름이 겹치지 않게 파일 이름에 타임스템프를 더해준다.
      // 이렇게 s3 버켓에 저장한다.
      const filiname = path.basename(file.originalname).trim();
      let newFilename = '';
      for (value of filiname) {
        if (value === ' ') {
          value = '-';
        }
        newFilename += value;
      }
      // console.log('console.log filiname in multerS3: ', newFilename);
      cb(null, `original/${Date.now()}_${newFilename}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 실시간 채팅 이미지 -> S3
// 실시간 채팅 DB -> radis
