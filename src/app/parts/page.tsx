'use client';

import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PhotoIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Navigation from '../../components/Navigation';
import CustomerService from '../../components/CustomerService';
import { productManager, Part } from '@/lib/products';
import { cartManager } from '@/lib/cart';

interface PartWithPrice extends Part {
  retailPrice: number;
  wholesalePrice?: number;
}

function QualityBadge({ quality }: { quality: string }) {
  const colors = {
    original: 'bg-green-100 text-green-800',
    oem: 'bg-blue-100 text-blue-800', 
    aftermarket: 'bg-yellow-100 text-yellow-800'
  };
  
  const labels = {
    original: '原厂',
    oem: 'OEM',
    aftermarket: '售后'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[quality as keyof typeof colors]}`}>
      {labels[quality as keyof typeof labels]}
    </span>
  );
}

function PartCard({ part, showWholesalePrice = false }: { part: PartWithPrice; showWholesalePrice?: boolean }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const addToCart = () => {
    cartManager.addItem({
      id: part.id,
      type: 'part',
      name: part.name,
      price: part.retailPrice,
      wholesalePrice: part.wholesalePrice,
      image: part.images[0],
      specifications: {
        '零件号': part.partNumber,
        '品牌': part.brand
      },
      supplierId: part.supplierId,
      supplierName: part.supplierName
    }, 1);
    
    alert(`${part.name} 已添加到购物车`);
  };

  const contactSupplier = () => {
    const message = `您好，我想咨询零件：${part.name}（零件号: ${part.partNumber}）`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8619866695358?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={part.images[0]} 
          alt={part.name}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <HeartIcon className={`h-5 w-5 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`} />
        </button>
        {!part.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            缺货
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{part.name}</h3>
          <QualityBadge quality={part.quality} />
        </div>
        
        <p className="text-sm text-gray-600 mb-2">零件号: {part.partNumber}</p>
        {part.universalPartNumber && (
          <p className="text-sm text-gray-600 mb-2">通用号: {part.universalPartNumber}</p>
        )}
        
        <p className="text-sm text-gray-600 mb-2">
          适用: {part.vehicleModels.join(', ')}
        </p>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{part.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-green-600">
              ¥{part.retailPrice.toLocaleString()}
            </div>
            {showWholesalePrice && part.wholesalePrice && (
              <div className="text-sm text-blue-600">
                批发价: ¥{part.wholesalePrice.toLocaleString()}
              </div>
            )}
            <div className="text-xs text-gray-500">运费另计</div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={addToCart}
              disabled={!part.inStock}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                part.inStock 
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {part.inStock ? '加入购物车' : '缺货'}
            </button>
            
            {/* 咨询按钮 */}
            <button 
              onClick={contactSupplier}
              className="px-3 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md text-sm font-medium transition-colors"
            >
              咨询
            </button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          📍 {part.location}
        </div>
      </div>
      
    </div>
  );
}

export default function PartsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vinCode, setVinCode] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeSearchType, setActiveSearchType] = useState('general');
  const [parts, setParts] = useState<PartWithPrice[]>([]);
  const [filteredParts, setFilteredParts] = useState<PartWithPrice[]>([]);
  const [loading, setLoading] = useState(true);

  // 模拟价格数据
  const partPrices: Record<string, { retail: number; wholesale?: number }> = {
    'part_001': { retail: 15000, wholesale: 12000 },
    'part_002': { retail: 2800, wholesale: 2200 },
    'part_003': { retail: 8500 },
    'part_004': { retail: 3200, wholesale: 2600 },
    'part_005': { retail: 1200, wholesale: 900 },
    'part_006': { retail: 4500, wholesale: 3600 },
    'part_007': { retail: 18000, wholesale: 15000 },
    'part_008': { retail: 1900, wholesale: 1500 },
    'part_009': { retail: 25000, wholesale: 20000 }
  };

  useEffect(() => {
    // 获取零件数据并添加价格信息
    const allParts = productManager.getParts().map(part => {
      const prices = partPrices[part.id] || { retail: 5000 };
      return {
        ...part,
        retailPrice: prices.retail,
        wholesalePrice: prices.wholesale
      };
    });
    
    setParts(allParts);
    setFilteredParts(allParts);
    setLoading(false);
  }, []);

  useEffect(() => {
    // 根据搜索和筛选条件过滤零件
    let result = [...parts];
    
    if (searchQuery) {
      result = result.filter(part => 
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedBrand) {
      result = result.filter(part => part.brand === selectedBrand);
    }
    
    if (selectedQuality) {
      result = result.filter(part => part.quality === selectedQuality);
    }
    
    setFilteredParts(result);
  }, [searchQuery, selectedBrand, selectedQuality, parts]);

  const brands = ['Tesla', 'BYD', 'NIO', '小鹏', '理想', '威马', '蔚来', 'CATL', '德尔福', '博世'];
  const qualities = [
    { value: 'original', label: '原厂' },
    { value: 'oem', label: 'OEM' },
    { value: 'aftermarket', label: '售后市场' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索逻辑已经在useEffect中处理
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">零件商店</h1>
          <p className="mt-2 text-gray-600">丰富的新能源汽车零件供应，支持多种查询方式</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setActiveSearchType('general')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSearchType === 'general'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              通用搜索
            </button>
            <button
              onClick={() => setActiveSearchType('vin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSearchType === 'vin'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              VIN码查询
            </button>
            <button
              onClick={() => setActiveSearchType('part')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSearchType === 'part'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              零件号查询
            </button>
            <button
              onClick={() => setActiveSearchType('image')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSearchType === 'image'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              图片搜索
            </button>
          </div>

          {activeSearchType === 'general' && (
            <form onSubmit={handleSearch}>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="输入关键词搜索零件..."
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  搜索
                </button>
              </div>
            </form>
          )}

          {activeSearchType === 'vin' && (
            <form onSubmit={handleSearch}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={vinCode}
                    onChange={(e) => setVinCode(e.target.value)}
                    placeholder="输入17位VIN码..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={17}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  查询
                </button>
              </div>
            </form>
          )}

          {activeSearchType === 'part' && (
            <form onSubmit={handleSearch}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                    placeholder="输入零件号..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  查询
                </button>
              </div>
            </form>
          )}

          {activeSearchType === 'image' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <PhotoIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">上传图片识别零件</h3>
              <p className="text-gray-500 mb-4">支持零件照片、标签号码、车型图片等</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                选择图片
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                筛选条件
              </button>
              
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">所有品牌</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">所有品质</option>
                {qualities.map(quality => (
                  <option key={quality.value} value={quality.value}>{quality.label}</option>
                ))}
              </select>
            </div>

            <button className="flex items-center text-gray-700 hover:text-gray-900">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              排序
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">价格范围</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="最低价"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="最高价"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">库存状态</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">全部</option>
                    <option value="in-stock">有库存</option>
                    <option value="out-of-stock">缺货</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">发货地区</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">全部地区</option>
                    <option value="china">中国</option>
                    <option value="usa">美国</option>
                    <option value="europe">欧洲</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            找到 {filteredParts.length} 个零件
          </div>
          <div className="text-sm text-gray-500">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            绿色标记表示有批发价格（批发用户可见）
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParts.map(part => (
            <PartCard 
              key={part.id} 
              part={part} 
              showWholesalePrice={true} // 这里应该根据用户类型决定
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
              上一页
            </button>
            <button className="px-3 py-2 text-sm bg-green-600 text-white rounded-md">1</button>
            <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md">2</button>
            <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md">3</button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
              下一页
            </button>
          </nav>
        </div>
      </div>
      
      {/* 客服功能 */}
      <CustomerService productType="part" />
    </div>
  );
}