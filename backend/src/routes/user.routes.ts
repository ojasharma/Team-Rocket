import { Router } from 'express';
import { getCurrentUser, getUsers } from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, getCurrentUser);

/**
 * @route   GET /api/users
 * @desc    Get users (can filter by role)
 * @access  Private - Admin, Founder, Investor
 */
router.get('/', authenticate, authorize('FOUNDER', 'INVESTOR'), getUsers);

export default router;