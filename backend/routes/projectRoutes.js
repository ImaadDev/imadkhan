import express from 'express';
const router = express.Router();
import { getProjectEntries, getProjectEntryById, createProjectEntry, updateProjectEntry, deleteProjectEntry } from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js'; // Import the upload middleware

router.route('/').get(getProjectEntries).post(protect, upload.single('imageUrl'), createProjectEntry);
router.route('/:id').get(getProjectEntryById).put(protect, upload.single('imageUrl'), updateProjectEntry).delete(protect, deleteProjectEntry);

export default router;
