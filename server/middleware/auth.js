import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Check if running in development mode without MongoDB
const isDevMode = process.env.SKIP_MONGODB === 'true';

export const authenticateToken = async (req, res, next) => {
  try {
    // If in development mode, skip authentication
    if (isDevMode) {
      req.user = { 
        _id: 'dev-user-123', 
        email: 'dev@example.com', 
        parentName: 'Dev User',
        isAdmin: true,
        isActive: true,
        apiKey: 'dev-api-key',
        usageStats: { 
          storiesViewed: 0,
          storiesGenerated: 0,
          lastAccessed: new Date()
        }
      };
      return next();
    }
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid or inactive user' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const authenticateApiKey = async (req, res, next) => {
  try {
    // If in development mode, skip authentication
    if (isDevMode) {
      req.user = { 
        _id: 'dev-user-123', 
        email: 'dev@example.com', 
        parentName: 'Dev User',
        isAdmin: true,
        isActive: true,
        apiKey: 'dev-api-key',
        usageStats: { 
          storiesViewed: 0,
          storiesGenerated: 0,
          lastAccessed: new Date()
        }
      };
      return next();
    }
    
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    const user = await User.findOne({ apiKey, isActive: true }).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Update last accessed time
    user.usageStats.lastAccessed = new Date();
    await user.save();

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Authentication error' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};