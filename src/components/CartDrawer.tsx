'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart, CreditCard, Truck } from 'lucide-react';
import { cartManager, Cart, CartItem } from '@/lib/cart';
import { orderManager, Order } from '@/lib/order';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<Cart>(cartManager.getCart());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const unsubscribe = cartManager.subscribe(setCart);
    return unsubscribe;
  }, []);

  const updateQuantity = (itemId: string, type: 'part' | 'vehicle', quantity: number) => {
    cartManager.updateQuantity(itemId, type, quantity);
  };

  const removeItem = (itemId: string, type: 'part' | 'vehicle') => {
    cartManager.removeItem(itemId, type);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-lg font-semibold">购物车</h2>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                {cart.totalItems}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {cart.items.length === 0 ? (
            // Empty cart
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">购物车为空</h3>
              <p className="text-gray-500 mb-4">添加一些商品到购物车吧</p>
              <button
                onClick={onClose}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                继续购物
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <CartItemComponent
                      key={`${item.type}-${item.id}`}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              {/* Cart summary */}
              <div className="border-t bg-gray-50 p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>商品小计:</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>税费:</span>
                    <span>${cart.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>运费:</span>
                    <span>
                      {cart.shipping === 0 ? '免费' : `$${cart.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>总计:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>结算</span>
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full rounded-lg border border-gray-300 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    继续购物
                  </button>
                </div>

                {cart.subtotal < 100 && (
                  <div className="mt-2 flex items-center space-x-2 text-xs text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>再消费 ${(100 - cart.subtotal).toFixed(2)} 即可享受免费配送</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            cartManager.clearCart();
            onClose();
          }}
        />
      )}
    </div>
  );
}

// 购物车商品组件
function CartItemComponent({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, type: 'part' | 'vehicle', quantity: number) => void;
  onRemove: (id: string, type: 'part' | 'vehicle') => void;
}) {
  return (
    <div className="flex space-x-3 rounded-lg border p-3">
      <img 
        src={item.image} 
        alt={item.name}
        className="h-16 w-16 rounded-lg object-cover"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
        <p className="text-sm text-gray-600">{item.supplierName}</p>
        <p className="text-sm font-medium text-blue-600">${item.price.toFixed(2)}</p>
        
        {item.specifications && (
          <div className="mt-1 text-xs text-gray-500">
            {Object.entries(item.specifications).slice(0, 2).map(([key, value]) => (
              <span key={key} className="mr-2">{key}: {value}</span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={() => onRemove(item.id, item.type)}
          className="text-gray-400 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-1 rounded-lg border">
          <button
            onClick={() => onUpdateQuantity(item.id, item.type, item.quantity - 1)}
            className="p-1 hover:bg-gray-100"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="px-2 text-sm">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.type, item.quantity + 1)}
            className="p-1 hover:bg-gray-100"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 结算模态框
function CheckoutModal({ 
  cart, 
  onClose, 
  onSuccess 
}: {
  cart: Cart;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<'address' | 'payment' | 'processing'>('address');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    paymentMethod: 'paypal' as 'alipay' | 'wechat' | 'paypal' | 'card' | 'bank_transfer'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'address') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('processing');
      
      // 模拟订单创建和支付处理
      try {
        const order = await orderManager.createOrder(
          cart,
          { id: 'user_123', email: formData.email, name: formData.name, type: 'retail' },
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country
          },
          formData.paymentMethod
        );

        // 处理支付
        const paymentResponse = await orderManager.processPayment(order.id, {
          orderId: order.id,
          amount: cart.total,
          currency: cart.currency,
          paymentMethod: formData.paymentMethod,
          returnUrl: window.location.origin + '/order-success',
          notifyUrl: window.location.origin + '/api/payment-notify'
        });

        if (paymentResponse.success) {
          setTimeout(() => {
            alert(`订单创建成功！订单号：${order.orderNumber}`);
            onSuccess();
          }, 2000);
        } else {
          throw new Error(paymentResponse.error || 'Payment failed');
        }
      } catch (error) {
        console.error('Checkout failed:', error);
        alert('订单创建失败，请重试');
        setStep('payment');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="absolute inset-4 rounded-lg bg-white shadow-xl overflow-hidden">
        <div className="flex h-full">
          {/* Left side - Form */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">结算</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 'address' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">配送信息</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="姓名 *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="rounded-lg border p-3"
                      required
                    />
                    <input
                      type="email"
                      placeholder="邮箱 *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="rounded-lg border p-3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="电话 *"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="rounded-lg border p-3"
                      required
                    />
                    <input
                      type="text"
                      placeholder="公司 (可选)"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="rounded-lg border p-3"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="地址 *"
                    value={formData.address1}
                    onChange={(e) => setFormData({...formData, address1: e.target.value})}
                    className="rounded-lg border p-3 w-full"
                    required
                  />

                  <input
                    type="text"
                    placeholder="地址2 (可选)"
                    value={formData.address2}
                    onChange={(e) => setFormData({...formData, address2: e.target.value})}
                    className="rounded-lg border p-3 w-full"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="城市 *"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="rounded-lg border p-3"
                      required
                    />
                    <input
                      type="text"
                      placeholder="州/省 *"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="rounded-lg border p-3"
                      required
                    />
                    <input
                      type="text"
                      placeholder="邮编 *"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                      className="rounded-lg border p-3"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                  >
                    继续到支付
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">支付方式</h3>
                  
                  <div className="space-y-3">
                    {[
                      { value: 'paypal', label: 'PayPal', desc: '安全便捷的国际支付' },
                      { value: 'alipay', label: '支付宝', desc: '中国用户首选支付方式' },
                      { value: 'wechat', label: '微信支付', desc: '扫码支付，方便快捷' },
                      { value: 'card', label: '信用卡', desc: 'Visa / MasterCard / AMEX' },
                      { value: 'bank_transfer', label: '银行转账', desc: '大额订单推荐' }
                    ].map((method) => (
                      <label key={method.value} className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as any})}
                          className="text-blue-600"
                        />
                        <div>
                          <div className="font-medium">{method.label}</div>
                          <div className="text-sm text-gray-600">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep('address')}
                      className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      返回
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                    >
                      确认订单
                    </button>
                  </div>
                </div>
              )}

              {step === 'processing' && (
                <div className="text-center py-8">
                  <div className="animate-spin mx-auto h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                  <h3 className="text-lg font-medium mb-2">正在处理订单...</h3>
                  <p className="text-gray-600">请稍候，不要关闭页面</p>
                </div>
              )}
            </form>
          </div>

          {/* Right side - Order summary */}
          <div className="w-80 bg-gray-50 border-l p-6">
            <h3 className="font-medium mb-4">订单摘要</h3>
            
            <div className="space-y-3 mb-6">
              {cart.items.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex justify-between text-sm">
                  <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span>商品小计:</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>税费:</span>
                <span>${cart.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>运费:</span>
                <span>{cart.shipping === 0 ? '免费' : `$${cart.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>总计:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}