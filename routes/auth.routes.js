const express = require('express');
const router = express.Router();
const upload = require('../multer/awsMulterModules');
const isLoggedIn = require('../middlewares/isLoggedIn');

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.post('/signup', upload.single('image'), authController.register);
router.post('/login', authController.login);
router.get('/', isLoggedIn, authController.tokenCheck);

module.exports = router;
