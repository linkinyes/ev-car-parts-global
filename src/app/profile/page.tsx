'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserIcon, CogIcon, HeartIcon, ShoppingBagIcon, ChatBubbleLeftIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';
import { authManager, User } from '@/lib/auth';
import { cartManager } from '@/lib/cart';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(0);

  // 检查用户认证状态
  useEffect(() => {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) {
      // 未登录，跳转到登录页面
      router.push('/login');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
    
    // 监听购物车变化
    const unsubscribe = cartManager.subscribe((cart) => {
      setCartItems(cart.totalItems);
    });
    
    // 初始化购物车数量
    setCartItems(cartManager.getCart().totalItems);
    
    return unsubscribe;
  }, [router]);

  // 处理登出
  const handleLogout = () => {
    authManager.logout();
    router.push('/login');
  };

  // 模拟订单数据
  const orders = [
    { id: 'ORD-001', date: '2024-01-15', status: '已完成', total: 15000, items: 2 },
    { id: 'ORD-002', date: '2024-01-10', status: '已发货', total: 8500, items: 1 },
    { id: 'ORD-003', date: '2024-01-05', status: '处理中', total: 2800, items: 1 }
  ];

  // 模拟收藏商品
  const favorites = [
    { id: '1', name: '电池包冷却系统', price: 15000, image: '/api/placeholder/100/100' },
    { id: '2', name: '充电口模块', price: 2800, image: '/api/placeholder/100/100' },
    { id: '3', name: '电机控制器', price: 8500, image: '/api/placeholder/100/100' }
  ];

  const menuItems = [
    { id: 'overview', name: '概览', icon: UserIcon },
    { id: 'orders', name: '我的订单', icon: ShoppingBagIcon },
    { id: 'favorites', name: '我的收藏', icon: HeartIcon },
    { id: 'posts', name: '我的帖子', icon: ChatBubbleLeftIcon },
    { id: 'documents', name: '我的文档', icon: DocumentTextIcon },
    { id: 'settings', name: '账户设置', icon: CogIcon },
  ];

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation isLoggedIn={true} userName={user.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧菜单 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* 用户信息卡片 */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {user.type === 'wholesale' ? '批发客户' : '普通用户'}
                  </p>
                  {user.type === 'wholesale' && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                      {user.isVerified ? '已认证' : '待审核'}
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
                
                {/* 登出按钮 */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                  退出登录
                </button>
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
                        <p><span className="font-medium">邮箱：</span>{user.email}</p>
                        <p><span className="font-medium">国家：</span>{user.country}</p>
                        {user.phone && <p><span className="font-medium">电话：</span>{user.phone}</p>}
                        {user.whatsapp && <p><span className="font-medium">WhatsApp：</span>{user.whatsapp}</p>}
                        <p><span className="font-medium">注册时间：</span>{user.joinDate}</p>
                        {user.lastLogin && <p><span className="font-medium">最后登录：</span>{user.lastLogin}</p>}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">车辆信息</h3>
                      <div className="space-y-2 text-sm">
                        {user.ownedVehicles ? (
                          <p><span className="font-medium">已有车型：</span>{user.ownedVehicles}</p>
                        ) : (
                          <p className="text-gray-400">未填写已有车型</p>
                        )}
                        {user.interestedVehicles ? (
                          <p><span className="font-medium">感兴趣车型：</span>{user.interestedVehicles}</p>
                        ) : (
                          <p className="text-gray-400">未填写感兴趣车型</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 统计数据 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-green-600">{orders.length}</div>
                    <div className="text-sm text-gray-500">订单数量</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">{favorites.length}</div>
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
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">订单号: {order.id}</div>
                            <div className="text-sm text-gray-500 mt-1">下单时间: {order.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">¥{order.total.toLocaleString()}</div>
                            <div className="text-sm mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === '已完成' ? 'bg-green-100 text-green-800' :
                                order.status === '已发货' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {order.items} 件商品
                        </div>
                        <div className="mt-3 flex space-x-3">
                          <button className="text-sm text-green-600 hover:text-green-700">
                            查看详情
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-700">
                            再次购买
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">暂无订单记录</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">我的收藏</h2>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-lg font-semibold text-green-600">¥{item.price.toLocaleString()}</div>
                            <button className="text-red-500 hover:text-red-700">
                              <HeartIcon className="h-5 w-5 fill-current" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">暂无收藏商品</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">我的帖子</h2>
                <div className="text-center py-8">
                  <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">暂无发布的帖子</p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    发布新帖子
                  </button>
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
                        defaultValue={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                      <input
                        type="tel"
                        defaultValue={user.phone || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        defaultValue={user.whatsapp || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">已有车型</label>
                    <input
                      type="text"
                      defaultValue={user.ownedVehicles || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">感兴趣车型</label>
                    <input
                      type="text"
                      defaultValue={user.interestedVehicles || ''}
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