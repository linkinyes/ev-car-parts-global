'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  isLoggedIn?: boolean;
  userName?: string;
}

interface NavItem {
  href: string;
  label: string;
  twoLine?: {
    first: string;
    second: string;
  };
}

export default function Navigation({ isLoggedIn = false, userName }: NavigationProps) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // 点击外部区域关闭用户菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '/', label: '首页' },
    { 
      href: '/parts', 
      label: '零件商店',
      twoLine: { first: '零件', second: '商店' }
    },
    { 
      href: '/vehicles', 
      label: '汽车商店',
      twoLine: { first: '汽车', second: '商店' }
    },
    { 
      href: '/news', 
      label: 'EV 资讯',
      twoLine: { first: 'EV', second: '资讯' }
    },
    { href: '/community', label: '社群' },
    { 
      href: '/ev-school', 
      label: 'EV课堂',
      twoLine: { first: 'EV', second: '课堂' }
    },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">EV</span>
              </div>
              <Link href="/">
                <span className="ml-2 text-xl font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                  Car Parts Global
                </span>
              </Link>
            </div>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-1 pt-1 pb-4 text-xs font-medium border-b-2 transition-colors text-center min-w-[60px] flex items-end ${
                    pathname === item.href
                      ? 'text-green-600 border-green-600'
                      : 'text-gray-700 hover:text-green-600 border-transparent hover:border-gray-300'
                  }`}
                >
                  {item.twoLine ? (
                    <div className="flex flex-col leading-tight w-full">
                      <span>{item.twoLine.first}</span>
                      <span>{item.twoLine.second}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col leading-tight w-full justify-end h-8">
                      <span className="self-center">{item.label}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            {/* 用户菜单 */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <UserIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">
                  {isLoggedIn ? (userName || '用户') : '账户'}
                </span>
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>

              {/* 用户下拉菜单 */}
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    {/* 语言选择 */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">语言设置</div>
                      <LanguageSelector />
                    </div>
                    
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="inline h-4 w-4 mr-2" />
                          个人中心
                        </Link>
                        <Link
                          href="/profile?tab=orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          我的订单
                        </Link>
                        <Link
                          href="/profile?tab=favorites"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          我的收藏
                        </Link>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          管理后台
                        </Link>
                        <div className="border-t border-gray-100"></div>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          退出登录
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          登录
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          注册账户
                        </Link>
                        <div className="border-t border-gray-100 mt-1"></div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="inline h-4 w-4 mr-2" />
                          个人中心
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}