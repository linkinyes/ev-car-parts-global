'use client';

import React, { useState } from 'react';
import { HeartIcon, ShareIcon, TruckIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Navigation from '../../../components/Navigation';
import CustomerService from '../../../components/CustomerService';
import { cartManager } from '@/lib/cart';
import { imageMap } from '@/lib/images';

interface Part {
  id: string;
  name: string;
  partNumber: string;
  universalPartNumber?: string;
  brand: string;
  vehicleModels: string[];
  quality: 'original' | 'aftermarket' | 'oem';
  retailPrice: number;
  wholesalePrice?: number;
  images: string[];
  description: string;
  specifications: {
    [key: string]: string;
  };
  inStock: boolean;
  location: string;
  supplier: string;
  warranty: string;
  shippingInfo: string;
}

const samplePart: Part = {
  id: '1',
  name: '电池包冷却系统',
  partNumber: 'BT-COOL-001',
  universalPartNumber: 'UC-BT-001',
  brand: 'Tesla',
  vehicleModels: ['Model 3', 'Model Y', 'Model S', 'Model X'],
  quality: 'original',
  retailPrice: 15000,
  wholesalePrice: 12000,
  images: [imageMap.parts['battery-pack']],
  description: '高效电池包冷却系统，确保电池温度控制在最佳范围内，延长电池使用寿命。采用先进的液冷技术，提供卓越的散热性能。',
  specifications: {
    '适用车型': 'Tesla Model 3/Y/S/X',
    '冷却方式': '液冷系统',
    '工作温度范围': '-40°C 至 85°C',
    '最大功率': '5kW',
    '接口类型': '快速接头',
    '重量': '12.5kg',
    '尺寸': '600 x 400 x 150mm',
    '质保期': '3年或10万公里'
  },
  inStock: true,
  location: '中国深圳',
  supplier: 'Tesla官方授权供应商',
  warranty: '3年质保',
  shippingInfo: '48小时内发货，支持全球配送'
};

function QualityBadge({ quality }: { quality: string }) {
  const colors = {
    original: 'bg-green-100 text-green-800',
    oem: 'bg-blue-100 text-blue-800', 
    aftermarket: 'bg-yellow-100 text-yellow-800'
  };
  
  const labels = {
    original: '原厂',
    oem: 'OEM',
    aftermarket: '售后'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[quality as keyof typeof colors]}`}>
      {labels[quality as keyof typeof labels]}
    </span>
  );
}

export default function PartDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const addToCart = () => {
    cartManager.addItem({
      id: samplePart.id,
      type: 'part',
      name: samplePart.name,
      price: samplePart.retailPrice,
      wholesalePrice: samplePart.wholesalePrice,
      image: samplePart.images[0],
      specifications: {
        '零件号': samplePart.partNumber,
        '品牌': samplePart.brand
      },
      supplierId: 'supplier_1',
      supplierName: samplePart.supplier
    }, quantity);
    
    alert(`${samplePart.name} 已添加到购物车`);
  };

  const contactSupplier = () => {
    const message = `您好，我想咨询零件：${samplePart.name}（零件号: ${samplePart.partNumber}）`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8619866695358?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700">首页</a>
          <span className="mx-2">/</span>
          <a href="/parts" className="hover:text-gray-700">零件商店</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{samplePart.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={samplePart.images[selectedImage]}
                  alt={samplePart.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="mt-4 grid grid-cols-4 gap-4">
                {samplePart.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${samplePart.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{samplePart.name}</h1>
                  <div className="mt-2 flex items-center space-x-2">
                    <QualityBadge quality={samplePart.quality} />
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} className="h-5 w-5 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">(128 评价)</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <HeartIcon className={`h-6 w-6 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>

              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900">
                  ¥{samplePart.retailPrice.toLocaleString()}
                </div>
                {samplePart.wholesalePrice && (
                  <div className="mt-1 text-lg text-blue-600">
                    批发价: ¥{samplePart.wholesalePrice.toLocaleString()}
                  </div>
                )}
                <div className="mt-1 text-sm text-gray-500">
                  价格包含运费
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">零件号</h3>
                  <p className="mt-1 text-gray-600">{samplePart.partNumber}</p>
                </div>

                {samplePart.universalPartNumber && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">通用零件号</h3>
                    <p className="mt-1 text-gray-600">{samplePart.universalPartNumber}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-900">适用车型</h3>
                  <p className="mt-1 text-gray-600">{samplePart.vehicleModels.join(', ')}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">供应商</h3>
                  <p className="mt-1 text-gray-600">{samplePart.supplier}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">库存状态</h3>
                  <div className="mt-1 flex items-center">
                    {samplePart.inStock ? (
                      <>
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-600">有库存</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-red-600">缺货</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-2">
                      数量:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center border-x border-gray-300 py-1"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={addToCart}
                    disabled={!samplePart.inStock}
                    className={`flex-1 py-3 px-6 rounded-md font-medium ${
                      samplePart.inStock
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {samplePart.inStock ? '加入购物车' : '缺货'}
                  </button>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={contactSupplier}
                    className="flex-1 py-3 px-6 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium flex items-center justify-center"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                    联系供应商
                  </button>
                  <button className="p-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-md">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'description'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  产品描述
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'specifications'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  技术规格
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === 'shipping'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  配送信息
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">产品详情</h3>
                  <p className="text-gray-600">{samplePart.description}</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <ShieldCheckIcon className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">正品保障</div>
                        <div className="text-sm text-gray-600">官方授权，品质保证</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <TruckIcon className="h-6 w-6 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">快速发货</div>
                        <div className="text-sm text-gray-600">{samplePart.shippingInfo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">技术规格</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(samplePart.specifications).map(([key, value]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4">
                        <dt className="text-sm font-medium text-gray-500">{key}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">配送信息</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <TruckIcon className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">发货时间</div>
                        <div className="text-gray-600 mt-1">{samplePart.shippingInfo}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">配送方式</div>
                        <div className="text-gray-600 mt-1">支持DHL、FedEx、UPS等国际快递</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">配送范围</div>
                        <div className="text-gray-600 mt-1">全球配送，支持门到门服务</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">相关零件</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">相关零件 {item}</h3>
                  <div className="mt-2 text-lg font-semibold text-green-600">¥{8000 + item * 1000}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 客服功能 */}
      <CustomerService productType="part" productName={samplePart.name} productId={samplePart.id} />
    </div>
  );
}