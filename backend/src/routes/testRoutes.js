const express = require('express');
const router = express.Router();
const { testGet, testPost } = require('../controllers/testController');

router.route('/')
  .get(testGet)
  .post(testPost);

module.exports = router;
