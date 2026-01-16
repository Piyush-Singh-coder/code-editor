import express from 'express';
import {deleteExecution, execute, getExecutionById, getExecutions, saveExecution } from '../controllers/executionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { userRateLimiter } from '../config/limiter.js';

const router = express.Router();
router.post('/execute', protect, userRateLimiter, execute);

router.post('/', protect , saveExecution);
router.get('/', protect , getExecutions);
router.get('/:executionId', protect , getExecutionById);
router.delete('/:executionId', protect , deleteExecution);

export default router;


