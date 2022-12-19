// awsMulterModule
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

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
