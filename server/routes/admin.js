import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

// Import models
import User from '../models/User.js';
import Story from '../models/Story.js';
import Feedback from '../models/Feedback.js';

// Setup mock functionality
const mockModel = {
  find: () => ({ 
    sort: () => ({ 
      skip: () => ({
        limit: () => Promise.resolve([]) 
      }),
      limit: () => Promise.resolve([]),
      exec: () => Promise.resolve([])
    }),
    countDocuments: () => Promise.resolve(0),
    exec: () => Promise.resolve([])
  }),
  findById: () => Promise.resolve(null),
  findByIdAndUpdate: () => Promise.resolve(null),
  findByIdAndDelete: () => Promise.resolve(null),
  create: (data) => Promise.resolve({...data, _id: 'mock-id-' + Date.now(), save: () => Promise.resolve() })
};

// Check if running without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';
if (isDevMode) {
  console.log('Running admin routes without MongoDB models');
  // Override model methods with mock implementations
  Object.assign(User, mockModel);
  Object.assign(Story, mockModel);
  Object.assign(Feedback, mockModel);
}

const router = express.Router();

// Apply authentication and admin requirement to all routes
router.use(authenticateToken, requireAdmin);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get('/users', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { email: { $regex: search, $options: 'i' } },
          { parentName: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/admin/users/{id}/api-key:
 *   post:
 *     summary: Generate new API key for user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: New API key generated
 */
router.post('/users/:id/api-key', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate new API key
    const newApiKey = `sk_${uuidv4().replace(/-/g, '')}`;
    user.apiKey = newApiKey;
    await user.save();

    res.json({
      message: 'New API key generated successfully',
      apiKey: newApiKey
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/admin/users/{id}/deactivate:
 *   post:
 *     summary: Deactivate/reactivate user account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User status updated
 */
router.post('/users/:id/deactivate', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/admin/stories:
 *   get:
 *     summary: Get all stories for admin management
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stories retrieved successfully
 */
router.get('/stories', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, published } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (published !== undefined) filter.isPublished = published === 'true';

    const stories = await Story.find(filter)
      .populate('createdBy', 'email parentName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Story.countDocuments(filter);

    res.json({
      stories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/admin/stories/{id}/publish:
 *   post:
 *     summary: Publish/unpublish a story
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story status updated
 */
router.post('/stories/:id/publish', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.isPublished = !story.isPublished;
    await story.save();

    res.json({
      message: `Story ${story.isPublished ? 'published' : 'unpublished'} successfully`,
      story: {
        id: story._id,
        title: story.title.en,
        isPublished: story.isPublished
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get platform analytics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data retrieved
 */
router.get('/analytics', async (req, res, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalStories,
      publishedStories,
      totalFeedback,
      averageRating
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Story.countDocuments(),
      Story.countDocuments({ isPublished: true }),
      Feedback.countDocuments(),
      Feedback.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ])
    ]);

    // Get popular categories
    const categoryStats = await Story.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 }, avgViews: { $avg: '$stats.views' } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent activity
    const recentUsers = await User.find()
      .select('email parentName createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentStories = await Story.find()
      .select('title.en category createdAt stats.views')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      overview: {
        totalUsers,
        activeUsers,
        totalStories,
        publishedStories,
        totalFeedback,
        averageRating: averageRating[0]?.avgRating || 0
      },
      categoryStats,
      recentActivity: {
        users: recentUsers,
        stories: recentStories
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;