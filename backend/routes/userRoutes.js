import express from 'express';
import { registerUser, loginUser, logoutUser, getMe, updateUserImage, getUserAboutImage } from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js'; // Import the upload middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/me', protect, getMe);
router.route('/profileimage').put(protect, upload.single('imageUrl'), updateUserImage);
router.get('/aboutimage', getUserAboutImage);

export default router;
