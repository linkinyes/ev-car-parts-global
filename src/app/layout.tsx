import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EV Car Parts Global - 新能源汽车零件全球交易平台',
  description: '专业的新能源汽车零件交易平台，提供全球新能源汽车零件供应、汽车展厅、技术资讯和用户社群服务',
  keywords: '新能源汽车,电动汽车零件,EV零件,汽车配件,电池,充电器,电机',
  authors: [{ name: 'EV Car Parts Global' }],
  creator: 'EV Car Parts Global',
  publisher: 'EV Car Parts Global',
  robots: 'index, follow',
  openGraph: {
    title: 'EV Car Parts Global - 新能源汽车零件全球交易平台',
    description: '专业的新能源汽车零件交易平台，服务全球新能源用户',
    url: 'https://your-domain.com',
    siteName: 'EV Car Parts Global',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EV Car Parts Global',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Car Parts Global - 新能源汽车零件全球交易平台',
    description: '专业的新能源汽车零件交易平台，服务全球新能源用户',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EV Car Parts Global",
              "description": "专业的新能源汽车零件交易平台",
              "url": "https://your-domain.com",
              "logo": "https://your-domain.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+86-19866695358",
                "contactType": "customer service",
                "email": "linkinyes@gmail.com"
              },
              "sameAs": [
                "https://www.facebook.com/your-page",
                "https://www.linkedin.com/company/your-company"
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* 百度统计 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}