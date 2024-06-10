// lib/nodemailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nico.bar2012@gmail.com',
    pass: 'hjdl taei dess ninv',
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html: string, from?: string) => {
  await transporter.sendMail({
    from: from || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};
