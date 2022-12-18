const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/'); // destination: 어디에, uploads/ 경로에
    }, // filename: 어떤 이름으로, 저장할지 path module 통해 파일 분해 추출
    filename(req, file, done) {
      console.log('file in multer: ', file);
      // path.extname(filePath)); 파일확장자 추출후 출력
      const ext = path.extname(file.originalname); // filename: 고윤혁.png > 확장자 추출(.png)
      console.log('ext: ', ext);
      // path.basename(filePath)); 파일명 추출후 출력
      const basename = path.basename(file.originalname, ext); // 고윤혁
      console.log('basename: ', basename);
      done(null, basename + new Date().getTime() + ext); // 고윤혁2021070424239281.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 파일크기: 20MB
});
