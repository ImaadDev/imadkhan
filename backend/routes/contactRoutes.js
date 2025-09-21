import express from 'express';
import { sendMessage } from '../controllers/contactController.js';

const router = express.Router();

router.post('/send-email', sendMessage);

export default router;
