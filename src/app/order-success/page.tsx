'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function OrderSuccessPage() {
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    // 从localStorage获取订单信息
    const savedOrder = localStorage.getItem('last_order');
    if (savedOrder) {
      setOrderInfo(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircleIcon className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">订单支付成功！</h1>
            <p className="text-lg text-gray-600 mb-8">
              感谢您的购买，我们已收到您的订单并开始处理。
            </p>
            
            {orderInfo ? (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">订单详情</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号:</span>
                    <span className="font-medium">{orderInfo.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">下单时间:</span>
                    <span className="font-medium">{new Date(orderInfo.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">支付金额:</span>
                    <span className="font-medium text-green-600">${orderInfo.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">支付方式:</span>
                    <span className="font-medium">
                      {orderInfo.paymentMethod === 'alipay' && '支付宝'}
                      {orderInfo.paymentMethod === 'wechat' && '微信支付'}
                      {orderInfo.paymentMethod === 'paypal' && 'PayPal'}
                      {orderInfo.paymentMethod === 'card' && '信用卡'}
                      {orderInfo.paymentMethod === 'bank_transfer' && '银行转账'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-gray-600">订单信息加载中...</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profile?tab=orders"
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                查看订单详情
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                继续购物
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>如有任何问题，请联系客服</p>
          <p className="mt-1">邮箱: linkinyes@gmail.com | 电话: +86 19866695358</p>
        </div>
      </div>
    </div>
  );
}