import express from 'express';
const router = express.Router();
import { getCertificationEntries, getCertificationEntryById, createCertificationEntry, updateCertificationEntry, deleteCertificationEntry } from '../controllers/certificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(getCertificationEntries).post(protect, createCertificationEntry);
router.route('/:id').get(getCertificationEntryById).put(protect, updateCertificationEntry).delete(protect, deleteCertificationEntry);

export default router;
