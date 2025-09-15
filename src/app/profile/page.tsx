'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserIcon, CogIcon, HeartIcon, ShoppingBagIcon, ChatBubbleLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟用户数据
  const userData = {
    name: '张先生',
    email: 'zhang@example.com',
    userType: 'regular', // regular 或 wholesale
    country: '中国',
    phone: '+86 19866695358',
    whatsapp: '+8619866695358',
    ownedVehicles: 'Tesla Model 3, 比亚迪汉EV',
    interestedVehicles: '蔚来ET7, 小鹏P7',
    joinDate: '2024-01-15',
    avatar: '/api/placeholder/100/100'
  };

  const menuItems = [
    { id: 'overview', name: '概览', icon: UserIcon },
    { id: 'orders', name: '我的订单', icon: ShoppingBagIcon },
    { id: 'favorites', name: '我的收藏', icon: HeartIcon },
    { id: 'posts', name: '我的帖子', icon: ChatBubbleLeftIcon },
    { id: 'documents', name: '我的文档', icon: DocumentTextIcon },
    { id: 'settings', name: '账户设置', icon: CogIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation isLoggedIn={true} userName={userData.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧菜单 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* 用户信息卡片 */}
              <div className="flex items-center mb-6">
                <img 
                  src={userData.avatar} 
                  alt="用户头像" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{userData.name}</h3>
                  <p className="text-sm text-gray-500">{userData.userType === 'wholesale' ? '批发客户' : '普通用户'}</p>
                  {userData.userType === 'wholesale' && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                      已认证
                    </span>
                  )}
                </div>
              </div>

              {/* 菜单项 */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">账户概览</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">基本信息</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">邮箱：</span>{userData.email}</p>
                        <p><span className="font-medium">国家：</span>{userData.country}</p>
                        <p><span className="font-medium">电话：</span>{userData.phone}</p>
                        <p><span className="font-medium">WhatsApp：</span>{userData.whatsapp}</p>
                        <p><span className="font-medium">注册时间：</span>{userData.joinDate}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">车辆信息</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">已有车型：</span>{userData.ownedVehicles}</p>
                        <p><span className="font-medium">感兴趣车型：</span>{userData.interestedVehicles}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 统计数据 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-500">订单数量</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-gray-500">收藏商品</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-gray-500">发布帖子</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-gray-500">完成课程</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">我的订单</h2>
                <div className="text-center py-8">
                  <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">暂无订单记录</p>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">我的收藏</h2>
                <div className="text-center py-8">
                  <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">暂无收藏商品</p>
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">我的帖子</h2>
                <div className="text-center py-8">
                  <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">暂无发布的帖子</p>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">我的文档</h2>
                <div className="text-center py-8">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">暂无相关文档</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">账户设置</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        defaultValue={userData.whatsapp}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">已有车型</label>
                    <input
                      type="text"
                      defaultValue={userData.ownedVehicles}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">感兴趣车型</label>
                    <input
                      type="text"
                      defaultValue={userData.interestedVehicles}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      保存设置
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}