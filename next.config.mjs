import path from 'path'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Enable more detailed error messages in development
  webpack: (config, { dev, isServer }) => {
    // Add alias for '@' to resolve to 'src' directory
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    config.resolve.alias['@'] = resolve(__dirname, 'src');
    if (dev && !isServer) {
      config.devtool = 'source-map';
    }
    
    // Optimize vendor chunks
    if (!dev && !isServer) {
      // Ensure framer-motion is properly chunked
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for framer-motion
          framerMotion: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'vendor-framer-motion',
            priority: 20,
            chunks: 'all',
          },
          // Other vendor packages
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/](?!framer-motion)/,
            priority: 10,
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
}

export default nextConfig