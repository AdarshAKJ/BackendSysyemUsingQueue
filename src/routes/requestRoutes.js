const express = require('express');
const { enqueueRequest } = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/enqueue', authMiddleware, enqueueRequest);

module.exports = router;
