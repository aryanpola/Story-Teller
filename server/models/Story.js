import mongoose from 'mongoose';
import { getMockModel } from '../utils/mockModels.js';

// Check if running without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';

const choiceSchema = new mongoose.Schema({
  text: {
    en: { type: String, required: true },
    fr: String,
    es: String,
    hi: String
  },
  nextNodeId: {
    type: String,
    required: true
  },
  emoji: String
});

const storyNodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    en: { type: String, required: true },
    fr: String,
    es: String,
    hi: String
  },
  audioUrl: {
    en: String,
    fr: String,
    es: String,
    hi: String
  },
  imageUrl: String,
  choices: [choiceSchema],
  isEnding: {
    type: Boolean,
    default: false
  },
  tags: [String]
});

const storySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    fr: String,
    es: String,
    hi: String
  },
  summary: {
    en: { type: String, required: true },
    fr: String,
    es: String,
    hi: String
  },
  thumbnailUrl: String,
  category: {
    type: String,
    enum: ['adventure', 'fantasy', 'educational', 'friendship', 'nature', 'family'],
    required: true
  },
  ageRange: {
    type: String,
    enum: ['5-6', '6-7', '7-8', '5-8'],
    default: '5-8'
  },
  nodes: [storyNodeSchema],
  startNodeId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'StoryBot AI'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  },
  stats: {
    views: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
storySchema.index({ category: 1, ageRange: 1 });
storySchema.index({ 'title.en': 'text', 'summary.en': 'text' });
storySchema.index({ tags: 1 });

// Update view count
storySchema.methods.incrementViews = async function() {
  this.stats.views += 1;
  return this.save();
};

// Add rating
storySchema.methods.addRating = async function(rating) {
  const totalScore = this.stats.averageRating * this.stats.totalRatings + rating;
  this.stats.totalRatings += 1;
  this.stats.averageRating = totalScore / this.stats.totalRatings;
  return this.save();
};

// Export either the real model or a mock model based on environment
const StoryModel = isDevMode ? getMockModel() : mongoose.model('Story', storySchema);
export default StoryModel;