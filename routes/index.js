const express = require('express');
const router = express.Router();

const commentsRouter = require('./comments.routes');
router.use('/comments', commentsRouter);

const authRouter = require('./auth.routes');
router.use('/auth', authRouter);

const itemRouter = require('./items.routes');
router.use('/items', itemRouter);

module.exports = router;
