import express from 'express';
const router = express.Router();
import { getTechnologyEntries, createTechnologyEntry, updateTechnologyEntry, deleteTechnologyEntry } from '../controllers/technologyController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(getTechnologyEntries).post(protect, createTechnologyEntry);
router.route('/:id').put(protect, updateTechnologyEntry).delete(protect, deleteTechnologyEntry);

export default router;
