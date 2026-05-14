const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import the hashing library

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  }
}, {
  timestamps: true 
});

// ADVANCED/PRODUCTION: Mongoose Pre-Save Hook for Automatic Password Hashing
userSchema.pre('save', async function(next) {
  // If the password hasn't been modified (e.g. updating a username later), skip hashing
  if (!this.isModified('password')) {
    next();
  }
  // Generate a 'salt' (random characters) to make the hash totally unique and uncrackable
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
