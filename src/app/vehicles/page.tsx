'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productManager } from '@/lib/products';
import CustomerService from '@/components/CustomerService';
import { Suspense } from 'react';

function VehiclesContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载所有车辆
    const allVehicles = productManager.getVehicles();
    setVehicles(allVehicles);
    setFilteredVehicles(allVehicles);
    setLoading(false);
  }, []);

  useEffect(() => {
    // 根据搜索词过滤车辆
    if (searchTerm) {
      const filtered = vehicles.filter(vehicle => 
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVehicles(filtered);
    } else {
      setFilteredVehicles(vehicles);
    }
  }, [searchTerm, vehicles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 在客户端处理搜索，不使用URL参数
    console.log('搜索:', searchTerm);
  };

  const handleVehicleClick = (vehicleId: string) => {
    router.push(`/vehicles/${vehicleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">新能源汽车展厅</h1>
              <p className="mt-1 text-sm text-gray-500">新车和二手车，全球主流品牌车型</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-4 md:mt-0 md:ml-4 flex-1 max-w-lg">
              <div className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="输入品牌或车型..."
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

      {/* Vehicle Types */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              新车
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              二手车
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              特斯拉
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              比亚迪
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              蔚来
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
                找到 {filteredVehicles.length} 辆车
              </p>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>默认排序</option>
                  <option>价格从低到高</option>
                  <option>价格从高到低</option>
                  <option>最新上架</option>
                </select>
              </div>
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">未找到相关车辆</h3>
                <p className="mt-1 text-sm text-gray-500">
                  请尝试其他搜索词或浏览所有车辆
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleVehicleClick(vehicle.id)}
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-gray-900">{vehicle.name}</h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {vehicle.vehicleType === 'new' ? '新车' : '二手车'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
                      <p className="mt-1 text-sm text-gray-500">{vehicle.year}年 | {vehicle.mileage ? `${vehicle.mileage.toLocaleString()}公里` : '新车'}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {vehicle.price ? `${vehicle.price.toFixed(2)} USD` : '面议'}
                        </p>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          查看详情
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

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <VehiclesContent />
    </Suspense>
  );
}