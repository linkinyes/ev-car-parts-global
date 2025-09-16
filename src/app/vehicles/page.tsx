'use client';

import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PhotoIcon, FunnelIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Navigation from '../../components/Navigation';
import CustomerService from '../../components/CustomerService';
import { productManager, Vehicle } from '@/lib/products';

interface VehicleWithPrice extends Vehicle {
  price: number;
  originalPrice?: number;
}

function VehicleTypeTab({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {children} ({count})
    </button>
  );
}

function VehicleCard({ vehicle }: { vehicle: VehicleWithPrice }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const contactSupplier = () => {
    const message = `您好，我想咨询车辆：${vehicle.name}（${vehicle.year}年 ${vehicle.brand}）`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8619866695358?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.name}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          {isFavorited ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
        
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            vehicle.vehicleType === 'new' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {vehicle.vehicleType === 'new' ? '新车' : '二手车'}
          </span>
          <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            认证
          </span>
        </div>

        <div className="absolute bottom-3 right-3">
          <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
            <EyeIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
            <p className="text-sm text-gray-600">{vehicle.year}年 · {vehicle.brand} {vehicle.model}</p>
          </div>
          {vehicle.batteryCapacity && (
            <div className="text-xs text-gray-500">
              电池: {vehicle.batteryCapacity}kWh
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div>续航: {vehicle.range}km</div>
          {vehicle.mileage && <div>里程: {vehicle.mileage.toLocaleString()}km</div>}
          <div>车况: {vehicle.condition || '良好'}</div>
        </div>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{vehicle.description}</p>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-green-600">
              ¥{(vehicle.price / 10000).toFixed(2)}万
            </div>
            {vehicle.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                原价: ¥{(vehicle.originalPrice / 10000).toFixed(2)}万
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              查看详情
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
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>📍 {vehicle.location}</span>
          <span>{vehicle.supplierName}</span>
        </div>
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'used'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [rangeFilter, setRangeFilter] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleWithPrice[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleWithPrice[]>([]);
  const [loading, setLoading] = useState(true);

  // 模拟价格数据
  const vehiclePrices: Record<string, { price: number; originalPrice?: number }> = {
    'vehicle_001': { price: 299000, originalPrice: 320000 },
    'vehicle_002': { price: 185000, originalPrice: 220000 },
    'vehicle_003': { price: 328000, originalPrice: 350000 },
    'vehicle_004': { price: 252000 },
    'vehicle_005': { price: 459000 },
    'vehicle_006': { price: 286000, originalPrice: 310000 },
    'vehicle_007': { price: 358000 },
    'vehicle_008': { price: 412000, originalPrice: 450000 }
  };

  useEffect(() => {
    // 获取车辆数据并添加价格信息
    const allVehicles = productManager.getVehicles().map(vehicle => {
      const prices = vehiclePrices[vehicle.id] || { price: 200000 };
      return {
        ...vehicle,
        price: prices.price,
        originalPrice: prices.originalPrice
      };
    });
    
    setVehicles(allVehicles);
    setFilteredVehicles(allVehicles);
    setLoading(false);
  }, []);

  useEffect(() => {
    // 根据筛选条件过滤车辆
    let result = [...vehicles];
    
    if (activeTab === 'new') {
      result = result.filter(v => v.vehicleType === 'new');
    } else if (activeTab === 'used') {
      result = result.filter(v => v.vehicleType === 'used');
    }
    
    if (selectedBrand) {
      result = result.filter(v => v.brand === selectedBrand);
    }
    
    if (searchQuery) {
      result = result.filter(v => 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredVehicles(result);
  }, [activeTab, selectedBrand, searchQuery, vehicles]);

  const brands = ['Tesla', '比亚迪', '蔚来', '小鹏', '理想', '极氪', '哪吒', '红旗'];
  
  const newCarsCount = vehicles.filter(v => v.vehicleType === 'new').length;
  const usedCarsCount = vehicles.filter(v => v.vehicleType === 'used').length;

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
          <h1 className="text-3xl font-bold text-gray-900">汽车商店</h1>
          <p className="mt-2 text-gray-600">新车和二手车交易平台，连接全球新能源汽车买家和卖家</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Vehicle Type Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          <VehicleTypeTab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
            count={vehicles.length}
          >
            全部车辆
          </VehicleTypeTab>
          <VehicleTypeTab 
            active={activeTab === 'new'} 
            onClick={() => setActiveTab('new')}
            count={newCarsCount}
          >
            新车
          </VehicleTypeTab>
          <VehicleTypeTab 
            active={activeTab === 'used'} 
            onClick={() => setActiveTab('used')}
            count={usedCarsCount}
          >
            二手车
          </VehicleTypeTab>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索车型、品牌..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">所有品牌</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              筛选
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              搜索
            </button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    价格范围 (万元)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="最低价"
                      value={priceRange[0] / 10000}
                      onChange={(e) => setPriceRange([Number(e.target.value) * 10000, priceRange[1]])}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="最高价"
                      value={priceRange[1] / 10000}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) * 10000])}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    续航范围 (km)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="最低续航"
                      value={rangeFilter[0]}
                      onChange={(e) => setRangeFilter([Number(e.target.value), rangeFilter[1]])}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="最高续航"
                      value={rangeFilter[1]}
                      onChange={(e) => setRangeFilter([rangeFilter[0], Number(e.target.value)])}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">年份</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">不限年份</option>
                    <option value="2024">2024年</option>
                    <option value="2023">2023年</option>
                    <option value="2022">2022年</option>
                    <option value="2021">2021年及以前</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            找到 {filteredVehicles.length} 辆车辆
          </div>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="range-desc">续航从高到低</option>
              <option value="year-desc">年份从新到旧</option>
            </select>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
            加载更多车辆
          </button>
        </div>

        {/* Image Search Feature */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
          <div className="text-center">
            <PhotoIcon className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI图片识别</h2>
            <p className="text-gray-600 mb-6">上传车辆图片，AI智能识别车型并匹配库存</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              开始图片搜索
            </button>
          </div>
        </div>
      </div>
      
      {/* 客服功能 */}
      <CustomerService productType="vehicle" />
    </div>
  );
}