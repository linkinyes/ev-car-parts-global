'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { authManager } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'regular' | 'wholesale'>('regular');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    phone: '',
    whatsapp: '',
    ownedVehicles: '',
    interestedVehicles: ''
  });

  const countries = [
    '中国', '马来西亚', '泰国', '新加坡', '印度尼西亚', '菲律宾', '越南',
    '沙特阿拉伯', '阿联酋', '卡塔尔', '科威特', '巴林', '阿曼',
    '俄罗斯', '哈萨克斯坦', '乌兹别克斯坦',
    '巴西', '阿根廷', '智利', '墨西哥',
    '德国', '法国', '意大利', '西班牙', '荷兰'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // 验证密码一致性
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await authManager.register({
        name: formData.email.split('@')[0], // 使用邮箱前缀作为默认用户名
        email: formData.email,
        type: userType,
        country: formData.country,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        ownedVehicles: formData.ownedVehicles,
        interestedVehicles: formData.interestedVehicles
      }, formData.password);
      
      if (result.success) {
        // 注册成功，跳转到个人中心
        router.push('/profile');
        router.refresh();
      } else {
        setError(result.error || '注册失败');
      }
    } catch (err) {
      setError('注册过程中发生错误');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EV</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">Car Parts Global</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                已有账号？登录
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">用户注册</h1>
            <p className="mt-2 text-gray-600">加入EV Car Parts Global，开启新能源汽车之旅</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">用户类型</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('regular')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  userType === 'regular'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h3 className="font-semibold text-gray-900">普通用户</h3>
                <p className="text-sm text-gray-600 mt-1">个人用户，购买零件和汽车</p>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('wholesale')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  userType === 'wholesale'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h3 className="font-semibold text-gray-900">批发客户</h3>
                <p className="text-sm text-gray-600 mt-1">批发商，享受批发价格</p>
              </button>
            </div>
          </div>

          {userType === 'wholesale' && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>批发商注册说明：</strong>批发商账户需要人工审核，请注册后联系客服提供相关资质证明。
                客服微信：EVParts2024
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 必填项 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">必填信息</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    国家 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">请选择国家</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入邮箱地址"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    密码 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="请输入密码"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认密码 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="请再次输入密码"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 选填项 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">选填信息</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入电话号码"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="请输入WhatsApp号码"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">已有车型</label>
                  <input
                    type="text"
                    name="ownedVehicles"
                    value={formData.ownedVehicles}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="如：Tesla Model 3, 比亚迪汉EV"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">感兴趣车型</label>
                  <input
                    type="text"
                    name="interestedVehicles"
                    value={formData.interestedVehicles}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="如：蔚来ET7, 小鹏P7"
                  />
                </div>
              </div>
            </div>

            {/* 协议 */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreement"
                required
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="agreement" className="ml-2 text-sm text-gray-600">
                我已阅读并同意
                <a href="/terms" className="text-green-600 hover:text-green-700 underline mx-1">
                  用户协议
                </a>
                和
                <a href="/privacy" className="text-green-600 hover:text-green-700 underline ml-1">
                  隐私政策
                </a>
              </label>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>注册中...</span>
              ) : userType === 'wholesale' ? (
                '提交审核'
              ) : (
                '立即注册'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              已有账号？
              <a href="/login" className="text-green-600 hover:text-green-700 font-medium ml-1">
                立即登录
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}