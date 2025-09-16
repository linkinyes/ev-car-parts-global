// 安全横幅组件 - 显示网站安全信息
'use client';

import { useState, useEffect } from 'react';

export default function SecurityBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 检查是否已经显示过安全横幅
    const hasSeenBanner = localStorage.getItem('securityBannerSeen');
    if (hasSeenBanner) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('securityBannerSeen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-green-600 text-white py-2 px-4 text-center relative">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="font-medium">安全网站</span>
          <span className="mx-2">•</span>
          <span>您的数据受到256位SSL加密保护</span>
        </div>
        <button 
          onClick={handleClose}
          className="mt-2 md:mt-0 ml-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="关闭安全横幅"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}