import express from 'express';
const router = express.Router();
import { getTechnologyEntries, createTechnologyEntry, updateTechnologyEntry, deleteTechnologyEntry } from '../controllers/technologyController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js'; // Import the upload middleware

router.route('/').get(getTechnologyEntries).post(protect, upload.single('iconUrl'), createTechnologyEntry);
router.route('/:id').put(protect, upload.single('iconUrl'), updateTechnologyEntry).delete(protect, deleteTechnologyEntry);

export default router;
