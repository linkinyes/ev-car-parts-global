// SEO Head Component
import React from 'react';
import Head from 'next/head';
import { SeoConfig, defaultSeoConfig, generateOpenGraphTags, generateTwitterTags, generateStructuredData } from '@/lib/seo';

interface SEOHeadProps {
  config?: Partial<SeoConfig>;
}

export default function SEOHead({ config = {} }: SEOHeadProps) {
  const mergedConfig: SeoConfig = {
    ...defaultSeoConfig,
    ...config,
    keywords: config.keywords ? [...defaultSeoConfig.keywords, ...config.keywords] : defaultSeoConfig.keywords
  };

  const ogTags = generateOpenGraphTags(mergedConfig);
  const twitterTags = generateTwitterTags(mergedConfig);
  const structuredData = generateStructuredData(mergedConfig);

  return (
    <Head>
      <title>{mergedConfig.title}</title>
      <meta name="description" content={mergedConfig.description} />
      <meta name="keywords" content={mergedConfig.keywords.join(', ')} />
      
      {/* Open Graph */}
      {Object.entries(ogTags).map(([key, value]) => (
        <meta key={key} property={key} content={value} />
      ))}
      
      {/* Twitter */}
      {Object.entries(twitterTags).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
}