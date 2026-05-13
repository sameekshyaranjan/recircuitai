const imagekit = require('../config/imagekit');

// ADVANCED: Upload directly from Memory Buffer to ImageKit
const uploadToCloud = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    imagekit.upload({
      file: fileBuffer, // ImageKit natively supports buffers!
      fileName: originalName,
      folder: '/recircuit_uploads'
    }, function(error, result) {
      if (error) {
        reject(new Error('ImageKit Upload Failed: ' + error.message));
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  uploadToCloud
};
