import { Router } from 'express';
import { getSupportedStocks } from './stocks.controller.js';

const router = Router();

router.get('/supported', getSupportedStocks);

export default router;
