import { Router } from 'express';
import auth from '../middlewares/authMiddleware.js';
const router = Router();
import {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
  voteReview
} from '../controllers/reviewController.js';

router.get('/:movieId', getReviewsByMovie);
router.post('/', auth, createReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);
router.post('/vote/:id', auth, voteReview);

export default router;
