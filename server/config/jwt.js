// backend/config/jwt.js
import { sign, verify } from 'jsonwebtoken';
require('dotenv').config(); // Load environment variables

const secretKey = process.env.JWT_SECRET || 'default-secret-key';

const generateToken = (userId) => {
  const token = sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

export default { generateToken, verifyToken };
