'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { productManager } from '@/lib/products';
import { cartManager } from '@/lib/cart';
import CustomerService from '@/components/CustomerService';

export default function PartsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [parts, setParts] = useState<any[]>([]);
  const [filteredParts, setFilteredParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(cartManager.getCart());

  useEffect(() => {
    // 加载所有零件
    const allParts = productManager.getParts();
    setParts(allParts);
    setFilteredParts(allParts);
    setLoading(false);
    
    // 订阅购物车变化
    const unsubscribe = cartManager.subscribe((updatedCart) => {
      setCart(updatedCart);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 根据搜索词过滤零件
    if (searchTerm) {
      const filtered = parts.filter(part => 
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.vehicleModels.some((model: string) => 
          model.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredParts(filtered);
    } else {
      setFilteredParts(parts);
    }
  }, [searchTerm, parts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // URL更新搜索参数
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      newParams.set('search', searchTerm);
    } else {
      newParams.delete('search');
    }
    router.push(`/parts?${newParams.toString()}`);
  };

  const handleAddToCart = (part: any) => {
    cartManager.addItem({
      id: part.id,
      type: 'part',
      name: part.name,
      price: part.price || 0,
      image: part.images[0],
      specifications: part.specifications,
      supplierId: part.supplierId,
      supplierName: part.supplierName
    });
  };

  const handlePartClick = (partId: string) => {
    router.push(`/parts/${partId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">新能源汽车零件商店</h1>
              <p className="mt-1 text-sm text-gray-500">提供原厂件、OEM件和副厂件，支持多种搜索方式</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-4 md:mt-0 md:ml-4 flex-1 max-w-lg">
              <div className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="输入零件号、品牌或适用车型..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  搜索
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search Methods */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              VIN码查询
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              图片识别
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              品牌车型
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                找到 {filteredParts.length} 个零件
              </p>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>默认排序</option>
                  <option>价格从低到高</option>
                  <option>价格从高到低</option>
                  <option>销量最高</option>
                </select>
              </div>
            </div>

            {filteredParts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">未找到相关零件</h3>
                <p className="mt-1 text-sm text-gray-500">
                  请尝试其他搜索词或浏览所有零件
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredParts.map((part) => (
                  <div key={part.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer" onClick={() => handlePartClick(part.id)}>
                      <img
                        src={part.images[0]}
                        alt={part.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-green-600"
                        onClick={() => handlePartClick(part.id)}
                      >
                        {part.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{part.brand}</p>
                      <p className="mt-1 text-sm text-gray-500">适用车型: {part.vehicleModels.slice(0, 2).join(', ')}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {part.price ? `${part.price.toFixed(2)} USD` : '面议'}
                        </p>
                        <button
                          onClick={() => handleAddToCart(part)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          加入购物车
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Customer Service */}
      <CustomerService />
    </div>
  );
}
