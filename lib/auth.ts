import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { prisma } from './prisma';

declare module 'next' {
  interface NextApiRequest {
    user?: any;
  }
}

export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const token = cookies.auth;

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      req.user = decoded;
      return handler(req, res);
    } catch (error: any) {
      return res.status(403).json({ message: error.message });
    }
  };
};

export const adminMiddleware = (handler: NextApiHandler) => {
  return authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied." });
    }

    return handler(req, res);
  });
};
