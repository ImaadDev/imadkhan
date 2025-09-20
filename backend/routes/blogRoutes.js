import express from 'express';
const router = express.Router();
import { getBlogEntries, getBlogEntryById, createBlogEntry, updateBlogEntry, deleteBlogEntry } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(getBlogEntries).post(protect, createBlogEntry);
router.route('/:id').get(getBlogEntryById).put(protect, updateBlogEntry).delete(protect, deleteBlogEntry);


export default router;
