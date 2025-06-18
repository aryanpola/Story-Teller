import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth.js';
import { validateRegistration, validateLogin } from '../utils/validation.js';

// Import models
import User from '../models/User.js';

// Set up mock functionality
const mockUserModel = {
  findOne: () => Promise.resolve(null),
  create: (data) => Promise.resolve({
    ...data, 
    _id: 'mock-user-' + Date.now(),
    apiKey: 'dev-api-key-' + uuidv4(),
    save: () => Promise.resolve()
  })
};

// Check if running without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';
if (isDevMode) {
  console.log('Running auth routes without MongoDB User model');
  // Override model methods with mock implementations
  Object.assign(User, mockUserModel);
}

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new parent account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - parentName
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               parentName:
 *                 type: string
 *               childrenNames:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', async (req, res, next) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, parentName, childrenNames = [] } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate unique API key
    const apiKey = `sk_${uuidv4().replace(/-/g, '')}`;

    const user = new User({
      email,
      password,
      parentName,
      childrenNames,
      apiKey
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      apiKey,
      user: {
        id: user._id,
        email: user.email,
        parentName: user.parentName,
        childrenNames: user.childrenNames
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to parent account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      apiKey: user.apiKey,
      user: {
        id: user._id,
        email: user.email,
        parentName: user.parentName,
        childrenNames: user.childrenNames,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get('/profile', authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      parentName: req.user.parentName,
      childrenNames: req.user.childrenNames,
      role: req.user.role,
      apiKey: req.user.apiKey,
      usageStats: req.user.usageStats,
      preferences: req.user.preferences
    }
  });
});

export default router;