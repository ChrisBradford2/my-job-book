// pages/api/resend-confirmation.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { sendEmail } from '@/lib/nodemailer';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isConfirmed) {
      return res.status(400).json({ message: 'User is already confirmed' });
    }

  const confirmationToken = crypto.randomBytes(32).toString('hex');
    await prisma.user.update({
      where: { email },
      data: { confirmationToken },
    });

    const confirmationLink = `${process.env.BASE_URL}/api/confirm?token=${confirmationToken}`;
    const textContent = `Thank you for registering. Click the following link to confirm your email: ${confirmationLink}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #333;">Confirm your email</h2>
        <p>Thank you for registering. Click the following link to confirm your email:</p>
        <a
          href="${confirmationLink}"
          style="
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          Confirm Email
        </a>
        <p>If you did not register, please ignore this email.</p>
        <p>Thank you,<br>Your Company Name</p>
      </div>
    `;

    await sendEmail(email, 'Confirm your email', textContent, htmlContent);

    res.status(200).json({ message: 'Confirmation email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
