import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { findUserByEmail, createUser } from '../models/user.model.js';

export const loginWithEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user = await findUserByEmail(email);
    if (!user) {
      user = await createUser(email);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('loginWithEmail error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
