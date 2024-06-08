import type { NextApiRequest, NextApiResponse } from 'next';
import { adminMiddleware } from '../../../lib/auth';

// Authenticated users with the role of 'admin' can access this route
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "You are an admin!" });
}

export default adminMiddleware(handler);
