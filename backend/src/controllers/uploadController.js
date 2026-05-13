const { uploadToCloud } = require('../services/uploadService');
const { analyzeEwaste } = require('../services/aiService');

// @desc    Handle image upload & AI Analysis
// @route   POST /api/upload
// @access  Public
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded or invalid file type');
    }

    // Phase 10D: Parallel Execution
    // Instead of waiting 3 seconds for ImageKit, and THEN waiting 4 seconds for Gemini,
    // we use Promise.all to run both at the exact same time. Total wait time = ~4 seconds instead of 7.
    const [cloudResponse, aiAnalysis] = await Promise.all([
      uploadToCloud(req.file.buffer, req.file.originalname),
      analyzeEwaste(req.file.buffer, req.file.mimetype)
    ]);

    res.status(200).json({
      success: true,
      message: "Image uploaded and analyzed successfully!",
      imageUrl: cloudResponse.url,
      cloudId: cloudResponse.fileId,
      originalName: cloudResponse.name,
      analysis: aiAnalysis
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage
};
