import { withPWA } from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
};

export default withPWA(nextConfig);
