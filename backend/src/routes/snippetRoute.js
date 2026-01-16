import express from 'express';
import { addComment, addSnippet, deleteSnippet, getSnippetById, getSnippets, star } from '../controllers/snippetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addSnippet);
router.get('/all', getSnippets);
router.get('/:snippetId', getSnippetById);
router.delete('/:snippetId', protect, deleteSnippet);

router.post('/comment/:snippetId', protect, addComment);
router.post('/star/:snippetId', protect, star);
export default router;