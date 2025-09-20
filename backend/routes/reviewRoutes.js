import express from 'express';
const router = express.Router();
import { getReviewEntries, createReviewEntry, updateReviewEntry, deleteReviewEntry } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(getReviewEntries).post(protect, createReviewEntry);
router.route('/:id').put(protect, updateReviewEntry).delete(protect, deleteReviewEntry);

export default router;
