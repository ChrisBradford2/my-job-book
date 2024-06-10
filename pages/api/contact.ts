// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/nodemailer';
import i18n from '../../i18n';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await i18n.changeLanguage(req.headers['accept-language'] || 'en');
  const { t } = i18n;
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
      t('new_message_from_your_website'),
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

    res.status(200).json({ message: t('message_sent_successfully') });
  } catch (error) {
    res.status(500).json({ message: t('message_failed_to_send') });
  }
}
