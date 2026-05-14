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

// PRODUCTION FEATURE: Delete file from cloud if DB fails
const deleteFromCloud = (fileId) => {
  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, function(error, result) {
      if(error) {
        console.error("Failed to delete orphaned image:", error);
        reject(error);
      } else {
        console.log("Orphaned image successfully deleted from ImageKit.");
        resolve(result);
      }
    });
  });
};

module.exports = {
  uploadToCloud,
  deleteFromCloud
};
