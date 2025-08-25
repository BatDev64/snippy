import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isVercelProd = process.env.VERCEL_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: !(isVercelProd && isProd)
  }
};

export default nextConfig;
