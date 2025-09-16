'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authManager } from '@/lib/auth';
import { orderManager } from '@/lib/order';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    ownedVehicles: '',
    interestedVehicles: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '',
      whatsapp: currentUser.whatsapp || '',
      country: currentUser.country,
      ownedVehicles: currentUser.ownedVehicles || '',
      interestedVehicles: currentUser.interestedVehicles || ''
    });
    
    // 获取用户订单
    const userOrders = orderManager.getUserOrders(currentUser.id);
    setOrders(userOrders);
  }, [router]);

  const handleLogout = () => {
    authManager.logout();
    router.push('/');
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setError('');
    setSuccess('');
    
    // 恢复原始数据
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        whatsapp: user.whatsapp || '',
        country: user.country,
        ownedVehicles: user.ownedVehicles || '',
        interestedVehicles: user.interestedVehicles || ''
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await authManager.updateProfile({
        name: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        country: formData.country,
        ownedVehicles: formData.ownedVehicles,
        interestedVehicles: formData.interestedVehicles
      });
      
      if (result.success) {
        setSuccess('个人信息更新成功');
        setEditing(false);
        
        // 更新用户状态
        const updatedUser = authManager.getCurrentUser();
        if (updatedUser) {
          setUser(updatedUser);
        }
      } else {
        setError(result.error || '更新失败');
      }
    } catch (err) {
      console.error('Profile update failed:', err);
      setError('更新过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneVerification = async () => {
    if (!formData.phone) {
      setError('请先填写手机号');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await authManager.sendPhoneVerificationCode(formData.phone);
      if (result.success) {
        router.push('/verify-phone');
      } else {
        setError(result.error || '发送验证码失败');
      }
    } catch (err) {
      console.error('Send verification code failed:', err);
      setError('发送验证码过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">个人中心</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          退出登录
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-gray-500 text-xl font-bold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
                {user.type === 'wholesale' ? '批发商' : '普通用户'}
              </span>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                个人信息
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'orders' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                我的订单
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'security' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                账户安全
              </button>
            </nav>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">个人信息</h2>
                {!editing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                  >
                    编辑信息
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      {loading ? '保存中...' : '保存'}
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-4 rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">{success}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  {editing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <p className="text-gray-900">{user.email}</p>
                  <div className="mt-1">
                    {user.emailVerifiedAt ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        已验证
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        未验证
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                  {editing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.phone || '未设置'}</p>
                  )}
                  {editing && (
                    <button
                      onClick={handleSendPhoneVerification}
                      disabled={loading || !formData.phone}
                      className="mt-2 text-sm text-green-600 hover:text-green-500 disabled:opacity-50"
                    >
                      {loading ? '发送中...' : '发送验证码'}
                    </button>
                  )}
                  {!editing && user.phoneVerifiedAt && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        已验证
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  {editing ? (
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.whatsapp || '未设置'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">国家/地区</label>
                  {editing ? (
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.country}</p>
                  )}
                </div>

                {user.type === 'regular' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">感兴趣的车型</label>
                    {editing ? (
                      <textarea
                        name="interestedVehicles"
                        rows={3}
                        value={formData.interestedVehicles}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.interestedVehicles || '未设置'}</p>
                    )}
                  </div>
                )}

                {user.type === 'wholesale' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">拥有的车型</label>
                    {editing ? (
                      <textarea
                        name="ownedVehicles"
                        rows={3}
                        value={formData.ownedVehicles}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.ownedVehicles || '未设置'}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">我的订单</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">暂无订单</h3>
                  <p className="mt-1 text-sm text-gray-500">您还没有创建任何订单。</p>
                  <div className="mt-6">
                    <button
                      onClick={() => router.push('/parts')}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      去购物
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          订单号
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          日期
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          总计
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">操作</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.total.toFixed(2)} {order.currency}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {order.status === 'pending' && '待处理'}
                              {order.status === 'confirmed' && '已确认'}
                              {order.status === 'processing' && '处理中'}
                              {order.status === 'shipped' && '已发货'}
                              {order.status === 'delivered' && '已送达'}
                              {order.status === 'cancelled' && '已取消'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => router.push(`/order-detail/${order.id}`)}
                              className="text-green-600 hover:text-green-900"
                            >
                              查看详情
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">账户安全</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">邮箱验证</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">邮箱地址: {user.email}</p>
                      {user.emailVerifiedAt ? (
                        <p className="text-sm text-green-600 mt-1">已验证于 {new Date(user.emailVerifiedAt).toLocaleDateString()}</p>
                      ) : (
                        <p className="text-sm text-yellow-600 mt-1">未验证</p>
                      )}
                    </div>
                    {!user.emailVerifiedAt && (
                      <button
                        onClick={() => {
                          // 重新发送验证邮件
                          if (user.emailVerificationToken) {
                            authManager.sendVerificationEmail(user.email, user.emailVerificationToken);
                          }
                        }}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                      >
                        发送验证邮件
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">手机验证</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {user.phone ? `手机号码: ${user.phone}` : '未设置手机号'}
                      </p>
                      {user.phoneVerifiedAt ? (
                        <p className="text-sm text-green-600 mt-1">已验证于 {new Date(user.phoneVerifiedAt).toLocaleDateString()}</p>
                      ) : user.phone ? (
                        <p className="text-sm text-yellow-600 mt-1">未验证</p>
                      ) : (
                        <p className="text-sm text-gray-500 mt-1">请先设置手机号</p>
                      )}
                    </div>
                    {user.phone && !user.phoneVerifiedAt && (
                      <button
                        onClick={() => router.push('/verify-phone')}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                      >
                        验证手机
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">修改密码</h3>
                  <button
                    onClick={() => alert('修改密码功能将在后续版本中实现')}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                  >
                    修改密码
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}