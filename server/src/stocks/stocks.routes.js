import { Router } from 'express';
import { getSupportedStocks } from './stocks.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from './watchlist.controller.js';

const router = Router();

router.get('/supported', getSupportedStocks);

// Watchlist endpoints (protected)
router.get('/watchlist', authMiddleware, getWatchlist);
router.post('/watchlist', authMiddleware, addToWatchlist);
router.delete('/watchlist/:symbol', authMiddleware, removeFromWatchlist);

export default router;
