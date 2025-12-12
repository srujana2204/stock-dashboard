import { getWatchlistByUserId, addSymbolToWatchlist, removeSymbolFromWatchlist } from '../models/watchlist.model.js';
import { SUPPORTED_STOCKS } from '../config.js';

export const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const symbols = await getWatchlistByUserId(userId);
    res.json({ symbols });
  } catch (err) {
    console.error('getWatchlist error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { symbol } = req.body;
    if (!symbol || !SUPPORTED_STOCKS.includes(symbol)) {
      return res.status(400).json({ message: 'Invalid symbol' });
    }
    await addSymbolToWatchlist(userId, symbol);
    res.status(201).json({ message: 'Added' });
  } catch (err) {
    console.error('addToWatchlist error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ message: 'Symbol required' });
    }
    await removeSymbolFromWatchlist(userId, symbol);
    res.json({ message: 'Removed' });
  } catch (err) {
    console.error('removeFromWatchlist error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
