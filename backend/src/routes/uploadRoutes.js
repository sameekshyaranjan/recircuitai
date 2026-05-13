const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');

// The string 'image' is the key the frontend must use when sending the form data
router.post('/', upload.single('image'), uploadImage);

module.exports = router;
