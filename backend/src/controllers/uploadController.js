const { uploadToCloud, deleteFromCloud } = require('../services/uploadService');
const { analyzeEwaste } = require('../services/aiService');
const Scan = require('../models/Scan'); // Import our new Database Model

// @desc    Handle image upload & AI Analysis
// @route   POST /api/upload
// @access  Public
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded or invalid file type');
    }

    // 1. Run Cloud Upload and AI Analysis in parallel
    const [cloudResponse, aiAnalysis] = await Promise.all([
      uploadToCloud(req.file.buffer, req.file.originalname),
      analyzeEwaste(req.file.buffer, req.file.mimetype)
    ]);

    // 2. PRODUCTION UPGRADE: Database Rollback Logic
    let savedScan;
    try {
      // Try to save the AI data into our MongoDB collection
      savedScan = await Scan.create({
        imageUrl: cloudResponse.url,
        cloudId: cloudResponse.fileId,
        componentName: aiAnalysis.componentName,
        category: aiAnalysis.category,
        reuseScore: aiAnalysis.reuseScore,
        hazardLevel: aiAnalysis.hazardLevel,
        repairable: aiAnalysis.repairable,
        resaleValue: aiAnalysis.resaleValue,
        diyIdeas: aiAnalysis.diyIdeas,
        safetyInstructions: aiAnalysis.safetyInstructions
      });
    } catch (dbError) {
      // If the database fails (e.g., Mongoose validation rejects it), 
      // we MUST trigger the cleanup logic to delete the orphaned image from ImageKit!
      await deleteFromCloud(cloudResponse.fileId);
      
      res.status(500);
      throw new Error('Database save failed. Image automatically cleaned up from cloud. Error: ' + dbError.message);
    }

    // 3. Return the fully saved database document to the user
    res.status(201).json({
      success: true,
      message: "Image uploaded, analyzed, and saved to database successfully!",
      data: savedScan
    });
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  uploadImage
};
