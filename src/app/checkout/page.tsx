'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authManager } from '@/lib/auth';
import { cartManager } from '@/lib/cart';
import { orderManager } from '@/lib/order';

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 检查用户是否已登录
    const currentUser = authManager.getCurrentUser();
    if (!currentUser) {
      router.push('/login?redirect=/checkout');
      return;
    }
    setUser(currentUser);
    
    // 获取购物车信息
    const currentCart = cartManager.getCart();
    if (currentCart.items.length === 0) {
      router.push('/cart');
      return;
    }
    setCart(currentCart);
    
    // 初始化配送地址
    setShippingAddress({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: currentUser.country || ''
    });
  }, [router]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 创建订单
      const order = await orderManager.createOrder(cart, user, shippingAddress, paymentMethod as any);
      
      // 处理支付
      const paymentRequest = {
        orderId: order.id,
        amount: order.total,
        currency: order.currency,
        paymentMethod: paymentMethod as any,
        returnUrl: `${window.location.origin}/order-success?orderId=${order.id}`,
        notifyUrl: `${window.location.origin}/api/payment/${paymentMethod}/notify`
      };
      
      const paymentResponse = await orderManager.processPayment(order.id, paymentRequest);
      
      if (paymentResponse.success) {
        // 清空购物车
        cartManager.clearCart();
        
        // 重定向到支付页面或成功页面
        if (paymentResponse.paymentUrl) {
          window.location.href = paymentResponse.paymentUrl;
        } else {
          router.push(`/order-success?orderId=${order.id}`);
        }
      } else {
        setError(paymentResponse.error || '支付处理失败');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      setError('结账失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (!user || !cart) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">结账</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 配送信息 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">配送信息</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">电话</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="address1" className="block text-sm font-medium text-gray-700">地址</label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={shippingAddress.address1}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700">地址（补充）</label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={shippingAddress.address2}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">城市</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">州/省</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">邮政编码</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">国家</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">支付方式</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="alipay"
                  name="paymentMethod"
                  value="alipay"
                  checked={paymentMethod === 'alipay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="alipay" className="ml-3 block text-sm font-medium text-gray-700">
                  支付宝
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="wechat"
                  name="paymentMethod"
                  value="wechat"
                  checked={paymentMethod === 'wechat'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="wechat" className="ml-3 block text-sm font-medium text-gray-700">
                  微信支付
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                  PayPal
                </label>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 text-red-600">{error}</div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? '处理中...' : `支付 ${cart.total.toFixed(2)} USD`}
            </button>
          </form>
        </div>
        
        {/* 订单摘要 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">订单摘要</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="divide-y divide-gray-200">
              {cart.items.map((item: any) => (
                <li key={`${item.id}-${item.type}`} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} USD
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>小计</span>
                <span>{cart.subtotal.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>税费</span>
                <span>{cart.tax.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>运费</span>
                <span>{cart.shipping.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-2">
                <span>总计</span>
                <span>{cart.total.toFixed(2)} USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}