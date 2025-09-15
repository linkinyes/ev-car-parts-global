'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon, PhotoIcon, FunnelIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Navigation from '../../components/Navigation';
import CustomerService from '../../components/CustomerService';

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year: number;
  model: string;
  type: 'new' | 'used';
  price: number;
  originalPrice?: number;
  range: number; // 续航里程 (km)
  displacement?: string; // 排量 (L)
  images: string[];
  description: string;
  features: string[];
  mileage?: number; // 二手车里程
  condition?: string; // 二手车车况
  location: string;
  dealer: string;
  isVerified: boolean;
  batteryHealth?: number; // 电池健康度 (%)
}

const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Model 3 高性能版',
    brand: 'Tesla',
    year: 2024,
    model: 'Model 3',
    type: 'new',
    price: 339900,
    range: 675,
    images: ['/api/placeholder/400/250'],
    description: '全新Tesla Model 3高性能版，零百加速3.3秒，WLTP工况续航675公里',
    features: ['自动驾驶', '空气悬挂', '高性能制动', '碳纤维扰流板'],
    location: '上海',
    dealer: 'Tesla官方',
    isVerified: true,
    batteryHealth: 100
  },
  {
    id: '2',
    name: '汉EV 创世版',
    brand: 'BYD',
    year: 2023,
    model: '汉EV',
    type: 'used',
    price: 219000,
    originalPrice: 289800,
    range: 550,
    images: ['/api/placeholder/400/250'],
    description: '比亚迪汉EV创世版，刀片电池技术，车况极佳',
    features: ['刀片电池', 'DiPilot智能驾驶', 'Nappa真皮座椅', '丹拿音响'],
    mileage: 15000,
    condition: '准新车',
    location: '深圳',
    dealer: 'BYD认证二手车',
    isVerified: true,
    batteryHealth: 98
  },
  {
    id: '3',
    name: 'ET7 首发版',
    brand: 'NIO',
    year: 2024,
    model: 'ET7',
    type: 'new',
    price: 448000,
    range: 930,
    images: ['/api/placeholder/400/250'],
    description: '蔚来ET7首发版，150kWh固态电池，CLTC续航930公里',
    features: ['固态电池', 'NAD自动驾驶', '空气悬挂', '女王副驾'],
    location: '合肥',
    dealer: 'NIO House',
    isVerified: true,
    batteryHealth: 100
  },
  {
    id: '4',
    name: 'P7 鹏翼版',
    brand: '小鹏',
    year: 2023,
    model: 'P7',
    type: 'used',
    price: 185000,
    originalPrice: 249900,
    range: 480,
    images: ['/api/placeholder/400/250'],
    description: '小鹏P7鹏翼版，NGP高速自动驾驶，个人一手车',
    features: ['NGP自动驾驶', '鹏翼门', '丹拿音响', '哨兵模式'],
    mileage: 28000,
    condition: '良好',
    location: '广州',
    dealer: '小鹏认证二手车',
    isVerified: true,
    batteryHealth: 95
  }
];

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

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [isFavorited, setIsFavorited] = useState(false);

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
            vehicle.type === 'new' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {vehicle.type === 'new' ? '新车' : '二手车'}
          </span>
          {vehicle.isVerified && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              认证
            </span>
          )}
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
            <p className="text-sm text-gray-600">{vehicle.year}年 · {vehicle.brand}</p>
          </div>
          {vehicle.batteryHealth && (
            <div className="text-xs text-gray-500">
              电池: {vehicle.batteryHealth}%
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div>续航: {vehicle.range}km</div>
          {vehicle.mileage && <div>里程: {vehicle.mileage.toLocaleString()}km</div>}
          {vehicle.displacement && <div>排量: {vehicle.displacement}</div>}
          {vehicle.condition && <div>车况: {vehicle.condition}</div>}
        </div>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{vehicle.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {vehicle.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              +{vehicle.features.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-green-600">
              ¥{vehicle.price.toLocaleString()}
            </div>
            {vehicle.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                原价: ¥{vehicle.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              查看详情
            </button>
            
            {/* 咨询按钮 */}
            <button 
              onClick={() => {
                const message = `您好，我想咨询车辆：${vehicle.name}（${vehicle.year}年 ${vehicle.brand}）`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/8619866695358?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="px-3 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md text-sm font-medium transition-colors"
            >
              咨询
            </button>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>📍 {vehicle.location}</span>
          <span>{vehicle.dealer}</span>
        </div>
      </div>
      
      {/* 客服功能 */}
      <CustomerService productType="vehicle" />
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

  const brands = ['Tesla', 'BYD', 'NIO', '小鹏', '理想', '威马', '哪吒', '零跑'];
  
  const filteredVehicles = sampleVehicles.filter(vehicle => {
    if (activeTab === 'new' && vehicle.type !== 'new') return false;
    if (activeTab === 'used' && vehicle.type !== 'used') return false;
    if (selectedBrand && vehicle.brand !== selectedBrand) return false;
    if (vehicle.price < priceRange[0] || vehicle.price > priceRange[1]) return false;
    if (vehicle.range < rangeFilter[0] || vehicle.range > rangeFilter[1]) return false;
    if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const newCarsCount = sampleVehicles.filter(v => v.type === 'new').length;
  const usedCarsCount = sampleVehicles.filter(v => v.type === 'used').length;

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
            count={sampleVehicles.length}
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
    </div>
  );
}