import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: User): string => {
  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string): UserPayload => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret') as UserPayload;
};