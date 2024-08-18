import express from 'express';
import { sendEmailController } from '../controllers/emailController';

const router = express.Router();

router.post('/', sendEmailController);

export default router;
