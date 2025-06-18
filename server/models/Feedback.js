import mongoose from 'mongoose';
import { getMockModel } from '../utils/mockModels.js';

// Check if running without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';

const feedbackSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    maxlength: 500
  },
  childAge: {
    type: Number,
    min: 5,
    max: 8
  },
  tags: [{
    type: String,
    enum: ['funny', 'educational', 'exciting', 'too-easy', 'too-hard', 'loved-it', 'boring']
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate feedback from same user for same story
feedbackSchema.index({ storyId: 1, userId: 1 }, { unique: true });

// Export either the real model or a mock model based on environment
const FeedbackModel = isDevMode ? getMockModel() : mongoose.model('Feedback', feedbackSchema);
export default FeedbackModel;