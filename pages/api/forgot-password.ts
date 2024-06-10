// pages/api/forgot-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Rechercher l'utilisateur dans la base de données par e-mail
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Créer un jeton de réinitialisation de mot de passe
    const resetToken = generateResetToken();
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // Enregistrer le jeton dans la base de données pour l'utilisateur
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(Date.now() + 3600000) // Expire dans 1 heure
      },
    });

    const textContent = `
      You requested a password reset. Click the following link to reset your password:
      ${resetLink}
      If you did not request a password reset, please ignore this email.
      Thank you, My Job Book
    `;

    // Contenu HTML de l'email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested a password reset. Click the following link to reset your password:</p>
        <a
          href="${resetLink}"
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
          Reset Password
        </a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you, <br>My Job Book</p>
      </div>
    `;

    // Envoyer l'email de réinitialisation de mot de passe
    await sendEmail(email, 'Password Reset Request', textContent, htmlContent);

    res.status(200).json({ message: 'If the email exists in our system, you will receive a password reset link.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function generateResetToken() {
  return Math.random().toString(36).substr(2);
}
