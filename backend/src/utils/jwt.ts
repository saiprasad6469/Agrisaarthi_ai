import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'agrisaarthi_super_secret_key_2026';

export const generateToken = (userId: string, mobile?: string, email?: string): string => {
  return jwt.sign({ userId, mobile, email }, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
