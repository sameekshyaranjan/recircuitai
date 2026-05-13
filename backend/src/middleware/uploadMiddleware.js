const multer = require('multer');
const path = require('path');

// PRODUCTION UPGRADE: Memory Storage vs Disk Storage
// Instead of saving files to the local 'uploads/' folder (which fails on cloud providers like Render/Vercel that wipe local files),
// we hold the file in a temporary RAM buffer. In the next phase, we will stream this buffer directly to Cloudinary.
const storage = multer.memoryStorage();

// PRODUCTION UPGRADE: Strict File Validation
const fileFilter = (req, file, cb) => {
  // Only allow specific image formats
  const allowedFileTypes = /jpeg|jpg|png|webp/;
  
  // Verify the extension
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  // Verify the MIME type (to prevent someone renaming a .exe to .jpg)
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Accept the file
  } else {
    // Reject with a custom error message
    cb(new Error('Security Error: Invalid file type. Only JPEG, PNG, and WEBP images are allowed.'));
  }
};

// Initialize Multer
const upload = multer({
  storage,
  limits: {
    // PRODUCTION UPGRADE: Prevent DDoS by limiting file size to 5MB
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter,
});

module.exports = upload;
