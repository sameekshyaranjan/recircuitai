const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  // Links this scan to the specific user who uploaded it
  // (We are keeping it optional for now until we build the Auth system in Phase 14)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false 
  },
  
  // The ImageKit URL of the uploaded image
  imageUrl: {
    type: String,
    required: true
  },
  
  // The ImageKit ID so we can delete it from the cloud if the user deletes their scan
  cloudId: {
    type: String,
    required: true
  },

  // --- AI Generated Fields Below ---
  
  componentName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  reuseScore: {
    type: Number,
    required: true,
    min: 1,      // Prevents the AI from hallucinating a negative score
    max: 100     // Prevents the AI from hallucinating a score over 100
  },
  hazardLevel: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'] // Strict validation: Only accepts these 3 exact words
  },
  repairable: {
    type: Boolean,
    required: true
  },
  resaleValue: {
    type: String
  },
  diyIdeas: {
    type: [String], // Array of strings
    default: []
  },
  safetyInstructions: {
    type: String
  }
}, {
  timestamps: true // Automatically tracks exactly when the item was scanned
});

module.exports = mongoose.model('Scan', scanSchema);
