'use client';

import React, { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  QuestionMarkCircleIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface CustomerServiceProps {
  productType?: 'part' | 'vehicle';
  productName?: string;
  productId?: string;
}

export default function CustomerService({ 
  productType = 'part', 
  productName = '', 
  productId = '' 
}: CustomerServiceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('whatsapp');

  const contactInfo = {
    email: 'linkinyes@gmail.com',
    phone: '+86 19866695358',
    whatsapp: '+8619866695358',
    wechat: 'EVParts2024'
  };

  const handleWhatsAppClick = () => {
    let message = '您好，我想咨询关于EV Car Parts Global平台的问题。';
    
    if (productName && productId) {
      message = `您好，我想咨询${productType === 'part' ? '零件' : '车辆'}：${productName}（ID: ${productId}）`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8619866695358?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    let subject = 'EV Car Parts Global 咨询';
    let body = '您好，我想咨询关于EV Car Parts Global平台的问题。';
    
    if (productName && productId) {
      subject = `咨询${productType === 'part' ? '零件' : '车辆'}: ${productName}`;
      body = `您好，我想咨询以下${productType === 'part' ? '零件' : '车辆'}:

产品名称: ${productName}
产品ID: ${productId}

请提供详细信息。`;
    }
    
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  return (
    <>
      {/* 悬浮客服按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>

      {/* 客服弹窗 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 overflow-hidden">
            {/* 头部 */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">客户支持</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* 客服信息 */}
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-2">我们在线为您提供帮助</p>
              <p className="text-xs text-gray-500">工作时间: 周一至周五 9:00-18:00 (GMT+8)</p>
            </div>

            {/* 联系方式选项 */}
            <div className="p-4">
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3 text-left">
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-sm text-gray-500">{contactInfo.whatsapp}</div>
                  </div>
                </button>

                <button
                  onClick={handleEmailClick}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3 text-left">
                    <div className="font-medium text-gray-900">邮箱联系</div>
                    <div className="text-sm text-gray-500">{contactInfo.email}</div>
                  </div>
                </button>

                <button
                  onClick={handlePhoneClick}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3 text-left">
                    <div className="font-medium text-gray-900">电话联系</div>
                    <div className="text-sm text-gray-500">{contactInfo.phone}</div>
                  </div>
                </button>
              </div>

              {/* 常见问题 */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 font-medium text-gray-900">常见问题</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2">
                    <a 
                      href="/help" 
                      className="block text-sm text-gray-600 hover:text-green-600 p-2 hover:bg-gray-50 rounded"
                    >
                      如何下单购买零件？
                    </a>
                    <a 
                      href="/returns" 
                      className="block text-sm text-gray-600 hover:text-green-600 p-2 hover:bg-gray-50 rounded"
                    >
                      退货政策和流程
                    </a>
                    <a 
                      href="/shipping" 
                      className="block text-sm text-gray-600 hover:text-green-600 p-2 hover:bg-gray-50 rounded"
                    >
                      配送时间和费用
                    </a>
                    <a 
                      href="/wholesale" 
                      className="block text-sm text-gray-600 hover:text-green-600 p-2 hover:bg-gray-50 rounded"
                    >
                      批发商入驻流程
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* 底部提示 */}
            <div className="bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">
                点击任意联系方式快速联系客服
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}