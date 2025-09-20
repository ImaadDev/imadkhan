import express from 'express';
const router = express.Router();
import { getCertificationEntries, getCertificationEntryById, createCertificationEntry, updateCertificationEntry, deleteCertificationEntry } from '../controllers/certificationController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js'; // Import the upload middleware

router.route('/').get(getCertificationEntries).post(protect, upload.single('imageUrl'), createCertificationEntry);
router.route('/:id').get(getCertificationEntryById).put(protect, upload.single('imageUrl'), updateCertificationEntry).delete(protect, deleteCertificationEntry);

export default router;
