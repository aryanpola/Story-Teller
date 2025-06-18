import express from 'express';
import { authenticateApiKey } from '../middleware/auth.js';
import { generateStory } from '../services/geminiService.js';
import { validateStoryGeneration, validateFeedback } from '../utils/validation.js';

// Import models conditionally to handle development mode without MongoDB
import Story from '../models/Story.js';
import Feedback from '../models/Feedback.js';

// Set up mock functionality
const mockModel = {
  find: () => ({ 
    sort: () => ({ 
      limit: () => Promise.resolve([]) 
    }),
    exec: () => Promise.resolve([])
  }),
  findById: () => Promise.resolve(null),
  create: (data) => Promise.resolve({...data, _id: 'mock-id-' + Date.now(), save: () => Promise.resolve() })
};

// Check if running without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';
if (isDevMode) {
  console.log('Running stories routes without MongoDB models');
  // Override model methods with mock implementations
  Object.assign(Story, mockModel);
  Object.assign(Feedback, mockModel);
}

const router = express.Router();

/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get all stories with metadata
 *     tags: [Stories]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Preferred language
 *       - in: query
 *         name: ageRange
 *         schema:
 *           type: string
 *         description: Age range filter
 *     responses:
 *       200:
 *         description: Stories retrieved successfully
 */
router.get('/', authenticateApiKey, async (req, res, next) => {
  try {
    const { category, language = 'en', ageRange, page = 1, limit = 20 } = req.query;
    
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (ageRange) filter.ageRange = ageRange;

    const stories = await Story.find(filter)
      .select(`
        title.${language} title.en
        summary.${language} summary.en
        thumbnailUrl category ageRange
        stats.views stats.averageRating
        tags createdAt
      `)
      .sort({ 'stats.views': -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Update user usage stats
    await req.user.updateUsage('viewed');

    const formattedStories = stories.map(story => ({
      id: story._id,
      title: story.title[language] || story.title.en,
      summary: story.summary[language] || story.summary.en,
      thumbnailUrl: story.thumbnailUrl,
      category: story.category,
      ageRange: story.ageRange,
      tags: story.tags,
      stats: {
        views: story.stats.views,
        rating: Math.round(story.stats.averageRating * 10) / 10
      },
      createdAt: story.createdAt
    }));

    res.json({
      stories: formattedStories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await Story.countDocuments(filter)
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get full story with content
 *     tags: [Stories]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Language preference
 *     responses:
 *       200:
 *         description: Story retrieved successfully
 */
router.get('/:id', authenticateApiKey, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lang = 'en' } = req.query;

    const story = await Story.findById(id);
    if (!story || !story.isPublished) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Increment view count
    await story.incrementViews();

    // Format story with language preferences
    const formattedStory = {
      id: story._id,
      title: story.title[lang] || story.title.en,
      summary: story.summary[lang] || story.summary.en,
      thumbnailUrl: story.thumbnailUrl,
      category: story.category,
      ageRange: story.ageRange,
      startNodeId: story.startNodeId,
      nodes: story.nodes.map(node => ({
        id: node.id,
        text: node.text[lang] || node.text.en,
        audioUrl: node.audioUrl?.[lang] || node.audioUrl?.en,
        imageUrl: node.imageUrl,
        choices: node.choices.map(choice => ({
          text: choice.text[lang] || choice.text.en,
          nextNodeId: choice.nextNodeId,
          emoji: choice.emoji
        })),
        isEnding: node.isEnding,
        tags: node.tags
      })),
      stats: story.stats,
      createdAt: story.createdAt
    };

    res.json(formattedStory);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/stories/{id}/feedback:
 *   post:
 *     summary: Submit feedback for a story
 *     tags: [Stories]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *               childAge:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 */
router.post('/:id/feedback', authenticateApiKey, async (req, res, next) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;
    const { rating, comment, childAge, tags } = req.body;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Check if user already provided feedback
    const existingFeedback = await Feedback.findOne({
      storyId: id,
      userId: req.user._id
    });

    if (existingFeedback) {
      return res.status(400).json({ error: 'Feedback already provided for this story' });
    }

    const feedback = new Feedback({
      storyId: id,
      userId: req.user._id,
      rating,
      comment,
      childAge,
      tags
    });

    await feedback.save();

    // Update story rating
    await story.addRating(rating);

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: {
        id: feedback._id,
        rating: feedback.rating,
        comment: feedback.comment,
        createdAt: feedback.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/stories/generate:
 *   post:
 *     summary: Generate a new interactive story
 *     tags: [Stories]
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *               - category
 *             properties:
 *               prompt:
 *                 type: string
 *               category:
 *                 type: string
 *               ageRange:
 *                 type: string
 *               language:
 *                 type: string
 *     responses:
 *       201:
 *         description: Story generated successfully
 */
router.post('/generate', authenticateApiKey, async (req, res, next) => {
  try {
    const { error } = validateStoryGeneration(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { prompt, category, ageRange = '5-8', language = 'en' } = req.body;

    // Generate story using OpenAI
    const generatedStory = await generateStory({
      prompt,
      category,
      ageRange,
      language
    });

    // Save generated story to database
    const story = new Story({
      ...generatedStory,
      createdBy: req.user._id,
      category,
      ageRange
    });

    await story.save();

    // Update user usage stats
    await req.user.updateUsage('generated');

    res.status(201).json({
      message: 'Story generated successfully',
      story: {
        id: story._id,
        title: story.title[language],
        summary: story.summary[language],
        category: story.category,
        nodes: story.nodes.length
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;