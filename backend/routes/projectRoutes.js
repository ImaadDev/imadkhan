import express from 'express';
const router = express.Router();
import { getProjectEntries, getProjectEntryById, createProjectEntry, updateProjectEntry, deleteProjectEntry } from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(getProjectEntries).post(protect, createProjectEntry);
router.route('/:id').get(getProjectEntryById).put(protect, updateProjectEntry).delete(protect, deleteProjectEntry);

export default router;
