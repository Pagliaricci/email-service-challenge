import express from 'express';
import { statsController } from '../controllers/statsController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = express.Router();
router.get('/', authMiddleware, adminMiddleware, statsController);

export default router;
