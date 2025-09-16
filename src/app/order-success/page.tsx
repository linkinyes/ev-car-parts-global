'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { orderManager } from '@/lib/order';

// 创建一个包装组件来处理useSearchParams
function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // 获取订单信息
      const orderData = orderManager.getOrderById(orderId);
      if (orderData) {
        setOrder(orderData);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">订单未找到</h1>
          <p className="mb-4">抱歉，我们无法找到您指定的订单。</p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">订单支付成功！</h1>
        <p className="text-lg text-gray-600 mb-8">感谢您的购买。您的订单已成功处理。</p>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">订单详情</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">订单号</p>
              <p className="font-medium">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">订单日期</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">支付金额</p>
              <p className="font-medium">{order.total.toFixed(2)} {order.currency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">支付状态</p>
              <p className="font-medium text-green-600">已支付</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">配送信息</h3>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address1}</p>
            <p>{order.shippingAddress.address2 && `${order.shippingAddress.address2}, `}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push('/profile')}
            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            查看订单详情
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            继续购物
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>我们已发送订单确认邮件至 {order.userEmail}</p>
          <p>如有任何问题，请联系客服。</p>
        </div>
      </div>
    </div>
  );
}

// 主页面组件，不直接使用useSearchParams
export default function OrderSuccessPage() {
  return <OrderSuccessContent />;
}