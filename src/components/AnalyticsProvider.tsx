// Analytics Provider Component
'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, logPageView } from '@/lib/analytics';

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 初始化Google Analytics
    initGA();
  }, []);

  useEffect(() => {
    // 记录页面浏览
    logPageView();
  }, [pathname, searchParams]);

  return <>{children}</>;
}