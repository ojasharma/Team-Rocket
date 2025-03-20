import { Router } from 'express';
import { validateIdea } from '../controllers/validateIdeaController';

const router = Router();

router.post('/idea', validateIdea);

export default router;