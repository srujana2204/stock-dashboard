import { Router } from 'express';
import { loginWithEmail } from './auth.controller.js';

const router = Router();

router.post('/login', loginWithEmail);

export default router;
