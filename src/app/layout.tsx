import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { Suspense } from 'react';
import Loading from './loading';
import SecurityBanner from '@/components/SecurityBanner';

const inter = Inter({ subsets: ['latin'] });

// 更新metadata以包含安全相关的meta标签
export const metadata: Metadata = {
  title: 'EV Car Parts Global - 新能源汽车和零件全球交易平台',
  description: '全球最大的新能源汽车和零件交易平台，提供VIN码查询、零件号查询、品牌车型查询、图片识别等多种搜索方式',
  keywords: ['新能源汽车', '电动汽车', '汽车零件', 'EV Parts', 'VIN查询', '零件号查询'],
  authors: [{ name: 'EV Car Parts Global' }],
  creator: 'EV Car Parts Global',
  publisher: 'EV Car Parts Global',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: 'https://www.evcarpartsglobal.com'
  },
  openGraph: {
    title: 'EV Car Parts Global - 新能源汽车和零件全球交易平台',
    description: '全球最大的新能源汽车和零件交易平台，提供VIN码查询、零件号查询、品牌车型查询、图片识别等多种搜索方式',
    url: 'https://www.evcarpartsglobal.com',
    siteName: 'EV Car Parts Global',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200',
        width: 1200,
        height: 630,
        alt: 'EV Car Parts Global Platform'
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Car Parts Global - 新能源汽车和零件全球交易平台',
    description: '全球最大的新能源汽车和零件交易平台，提供VIN码查询、零件号查询、品牌车型查询、图片识别等多种搜索方式',
    images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 安全相关的meta标签 */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "EV Car Parts Global",
              "url": "https://www.evcarpartsglobal.com",
              "description": "全球最大的新能源汽车和零件交易平台",
              "publisher": {
                "@type": "Organization",
                "name": "EV Car Parts Global",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.evcarpartsglobal.com/logo.png"
                }
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <SecurityBanner />
        <AnalyticsProvider>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </AnalyticsProvider>
      </body>
    </html>
  );
}