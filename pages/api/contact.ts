// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, message, captcha } = req.body;

  if (process.env.NODE_ENV === 'production') {
    if (!captcha) {
      return res.status(400).json({ message: 'Captcha is required' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    const captchaRes = await fetch(captchaVerifyUrl, { method: 'POST' });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return res.status(400).json({ message: 'Invalid captcha' });
    }
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await sendEmail(
      process.env.EMAIL_USER as string,
      'New message from your website',
      `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      `
        <h1>New message from your website</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    );

    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while sending your message' });
  }
}
