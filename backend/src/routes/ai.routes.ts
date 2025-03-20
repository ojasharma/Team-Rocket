import { Router } from 'express';
import { getAIResponse } from '../controllers/aiController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   POST /api/ai
 * @desc    Get AI response
 * @access  Private
 */
router.post('/response', getAIResponse);

export default router;