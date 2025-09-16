'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productManager } from '@/lib/products';
import { logSearch } from '@/lib/analytics';
import CustomerService from '@/components/CustomerService';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载热门产品
    const popularProducts = productManager.getPopularProducts(10);
    setProducts(popularProducts);
    setLoading(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 记录搜索事件
      logSearch(searchQuery);
      
      // 根据搜索内容决定跳转到零件页面还是汽车页面
      // 这里简化处理，实际项目中可以根据搜索内容智能判断
      router.push(`/parts?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProductClick = (product: any) => {
    if (product.type === 'part') {
      router.push(`/parts/${product.id}`);
    } else {
      router.push(`/vehicles/${product.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">新能源汽车和零件</span>
              <span className="block mt-2 text-green-300">全球交易平台</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-green-100 sm:max-w-3xl">
              连接全球新能源汽车产业链，提供高品质零件和整车资源
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="输入VIN码、零件号、品牌或车型..."
                    className="w-full px-5 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                >
                  搜索
                </button>
              </div>
            </form>
            
            {/* Quick Links */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/parts" className="px-4 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                零件商店
              </Link>
              <Link href="/vehicles" className="px-4 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                汽车展厅
              </Link>
              <Link href="/news" className="px-4 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                EV资讯
              </Link>
              <Link href="/community" className="px-4 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors">
                用户社群
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              平台特色
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              为您提供全方位的新能源汽车服务
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">智能搜索</h3>
              <p className="mt-2 text-base text-gray-500">
                支持VIN码、零件号、图片识别等多种搜索方式
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">全球资源</h3>
              <p className="mt-2 text-base text-gray-500">
                汇聚全球优质新能源汽车和零件供应商
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">品质保障</h3>
              <p className="mt-2 text-base text-gray-500">
                严格的质量控制体系，确保每一件商品的品质
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">便捷支付</h3>
              <p className="mt-2 text-base text-gray-500">
                支持多种支付方式，安全快捷的交易体验
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              热门推荐
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              精选优质新能源汽车和零件
            </p>
          </div>

          {loading ? (
            <div className="mt-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                    <p className="mt-2 text-sm font-medium text-green-600">
                      {product.type === 'part' 
                        ? `${product.price?.toFixed(2) || '面议'} USD` 
                        : `${product.price?.toFixed(2) || '面议'} USD`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link 
              href="/parts" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              查看更多产品
              <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Customer Service */}
      <CustomerService />
    </div>
  );
}