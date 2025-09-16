import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // 移除实验性配置以避免构建问题
  // experimental: {
  //   reactCompiler: true,
  // },
  
  // 图片优化配置
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'evcarpartsglobal.com',
      'www.evcarpartsglobal.com'
    ],
    // 优化图片格式
    formats: ['image/avif', 'image/webp'],
  },
  
  // 国际化配置
  i18n: {
    locales: ['zh', 'en', 'ar', 'ru', 'es', 'pt'],
    defaultLocale: 'zh',
  },
  
  // 安全头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zh',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;