'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface VehicleFormData {
  name: string;
  brand: string;
  year: number;
  model: string;
  type: 'new' | 'used';
  price: number;
  originalPrice?: number;
  range: number;
  description: string;
  features: string[];
  mileage?: number;
  condition?: string;
  location: string;
  dealer: string;
  batteryHealth?: number;
  images: string[];
}

const initialFormData: VehicleFormData = {
  name: '',
  brand: '',
  year: new Date().getFullYear(),
  model: '',
  type: 'new',
  price: 0,
  range: 0,
  description: '',
  features: [],
  location: '',
  dealer: '',
  images: []
};

const brands = ['Tesla', 'BYD', 'NIO', '小鹏', '理想', '威马', '哪吒', '零跑'];

export default function AddVehiclePage() {
  const [formData, setFormData] = useState<VehicleFormData>(initialFormData);
  const router = useRouter();

  const handleSubmit = () => {
    console.log('提交车辆数据:', formData);
    alert('车辆添加成功！');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">添加新车辆</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">车辆名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">品牌 *</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">选择品牌</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">车辆类型 *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'new' | 'used'})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="new">新车</option>
                  <option value="used">二手车</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">价格 (¥) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">车辆描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">车辆图片</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <PhotoIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  选择图片
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => router.push('/admin')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              发布车辆
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}