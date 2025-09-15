'use client';

import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon as ChatSolidIcon } from '@heroicons/react/24/solid';

interface CustomerServiceProps {
  productType?: 'part' | 'vehicle';
  productName?: string;
  productId?: string;
}

export default function CustomerService({ productType, productName, productId }: CustomerServiceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'whatsapp'>('chat');

  const contactInfo = {
    phone: '+86 19866695358',
    whatsapp: '+8619866695358',
    email: 'linkinyes@gmail.com'
  };

  const handleWhatsApp = () => {
    const message = productName 
      ? `您好，我想咨询${productType === 'part' ? '零件' : '车辆'}：${productName}（ID: ${productId}）`
      : '您好，我想咨询相关产品信息';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleEmail = () => {
    const subject = productName 
      ? `咨询${productType === 'part' ? '零件' : '车辆'}：${productName}`
      : '产品咨询';
    
    const body = productName 
      ? `您好，我想咨询以下产品：

产品名称：${productName}
产品ID：${productId}
产品类型：${productType === 'part' ? '零件' : '车辆'}

请提供详细信息，谢谢！`
      : '您好，我想咨询相关产品信息，请联系我。';
    
    const emailUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  return (
    <>
      {/* 悬浮客服按钮 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <ChatSolidIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* 客服面板 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* 头部 */}
          <div className="bg-green-600 text-white p-4">
            <h3 className="text-lg font-semibold flex items-center">
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              客服咨询
            </h3>
            <p className="text-green-100 text-sm mt-1">
              {productName ? `咨询产品：${productName}` : '我们在线为您服务'}
            </p>
          </div>

          {/* 选项卡 */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              在线客服
            </button>
            <button
              onClick={() => setActiveTab('call')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'call'
                  ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              电话咨询
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'whatsapp'
                  ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              WhatsApp
            </button>
          </div>

          {/* 内容区 */}
          <div className="p-4">
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-3">工作时间：周一至周日 9:00-22:00</p>
                  <p className="mb-4">我们的专业客服团队随时为您解答产品相关问题。</p>
                </div>
                <button
                  onClick={handleEmail}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  发送邮件咨询
                </button>
                <div className="text-xs text-gray-500 text-center">
                  点击按钮将打开邮箱客户端
                </div>
              </div>
            )}

            {activeTab === 'call' && (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-3">客服热线：{contactInfo.phone}</p>
                  <p className="mb-4">工作时间：周一至周日 9:00-22:00</p>
                  <p className="mb-4">我们的客服专员将为您提供专业的产品咨询服务。</p>
                </div>
                <button
                  onClick={handleCall}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  立即拨打
                </button>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-3">WhatsApp：{contactInfo.whatsapp}</p>
                  <p className="mb-4">支持文字、语音、图片等多种沟通方式</p>
                  <p className="mb-4">响应时间：通常在10分钟内回复</p>
                </div>
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                  </svg>
                  在WhatsApp中咨询
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}