import express from 'express';
const router = express.Router();
import { getBlogEntries, getBlogEntryById, createBlogEntry, updateBlogEntry, deleteBlogEntry } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js'; // Import the upload middleware

router.route('/').get(getBlogEntries).post(protect, upload.single('imageUrl'), createBlogEntry);
router.route('/:id').get(getBlogEntryById).put(protect, upload.single('imageUrl'), updateBlogEntry).delete(protect, deleteBlogEntry);


export default router;
