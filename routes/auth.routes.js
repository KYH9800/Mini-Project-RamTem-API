const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// AWS.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'react-nodebird',
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
// });

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads');
      },
      filename(req, file, done) { // 제로초.png
        const ext = path.extname(file.originalname); // 확장자 추출(.png)
        const basename = path.basename(file.originalname, ext); // 제로초
        done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  });

router.post('/signup', authController.register);
router.post('/login', authController.login);

module.exports = router;
