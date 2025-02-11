import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return compare(password, hashedPassword);
};

// JWT handling
export const generateToken = (userId: string): string => {
  return sign({ userId }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
};

// Security headers
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://*.unsplash.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.stripe.com;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};