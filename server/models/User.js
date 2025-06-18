import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { getMockModel } from '../utils/mockModels.js';

// Check if running without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  parentName: {
    type: String,
    required: true,
    trim: true
  },
  childrenNames: [{
    type: String,
    trim: true
  }],
  apiKey: {
    type: String,
    unique: true,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['parent', 'admin'],
    default: 'parent'
  },
  usageStats: {
    storiesViewed: { type: Number, default: 0 },
    storiesGenerated: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: Date.now }
  },
  preferences: {
    preferredLanguages: [{
      type: String,
      enum: ['en', 'fr', 'es', 'hi'],
      default: ['en']
    }],
    ageRange: {
      type: String,
      enum: ['5-6', '6-7', '7-8'],
      default: '5-8'
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update usage stats
userSchema.methods.updateUsage = async function(action) {
  if (action === 'viewed') {
    this.usageStats.storiesViewed += 1;
  } else if (action === 'generated') {
    this.usageStats.storiesGenerated += 1;
  }
  this.usageStats.lastAccessed = new Date();
  return this.save();
};

// Export either the real model or a mock model based on environment
const UserModel = isDevMode ? getMockModel() : mongoose.model('User', userSchema);
export default UserModel;