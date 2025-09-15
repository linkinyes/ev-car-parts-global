'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, PhotoIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface PartFormData {
  name: string;
  partNumber: string;
  universalPartNumber: string;
  brand: string;
  vehicleModels: string[];
  quality: 'original' | 'aftermarket' | 'oem';
  retailPrice: number;
  wholesalePrice: number;
  description: string;
  features: string[];
  category: string;
  subcategory: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  material: string;
  warranty: string;
  origin: string;
  certifications: string[];
  compatibility: string[];
  installationNotes: string;
  images: string[];
  tags: string[];
}

const initialFormData: PartFormData = {
  name: '',
  partNumber: '',
  universalPartNumber: '',
  brand: '',
  vehicleModels: [],
  quality: 'original',
  retailPrice: 0,
  wholesalePrice: 0,
  description: '',
  features: [],
  category: '',
  subcategory: '',
  weight: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  material: '',
  warranty: '',
  origin: '',
  certifications: [],
  compatibility: [],
  installationNotes: '',
  images: [],
  tags: []
};

const categories = [
  {
    name: '电池系统',
    subcategories: ['电池包', '电池模组', '电池管理系统', '冷却系统', '充电系统']
  },
  {
    name: '驱动系统',
    subcategories: ['电机', '电机控制器', '减速器', '差速器', '传动轴']
  },
  {
    name: '车身系统',
    subcategories: ['车门', '前后保险杠', '车灯', '后视镜', '座椅']
  },
  {
    name: '悬挂系统',
    subcategories: ['减震器', '弹簧', '控制臂', '稳定杆', '轮毂']
  },
  {
    name: '制动系统',
    subcategories: ['制动盘', '制动片', '制动卡钳', '制动液', 'ABS系统']
  },
  {
    name: '智能系统',
    subcategories: ['显示屏', '传感器', '摄像头', '雷达', '控制模块']
  }
];

const brands = [
  'Tesla', 'BYD', 'NIO', '小鹏', '理想', '威马', '哪吒', '零跑', 
  'Mercedes-EQS', 'BMW i系列', 'Audi e-tron', 'Volkswagen ID', 
  '吉利', '长安', '奇瑞', '上汽', '广汽', '东风'
];

const vehicleModelOptions = [
  'Model 3', 'Model Y', 'Model S', 'Model X',
  '汉EV', '唐EV', '秦Plus', '海豚', '海豹',
  'ET7', 'ET5', 'ES8', 'ES6', 'EC6',
  'P7', 'P5', 'G3', 'G6', 'G9',
  'ONE', 'L7', 'L8', 'L9',
  'W6', 'E5', 'M7'
];

export default function AddPartPage() {
  const [formData, setFormData] = useState<PartFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
  const [draggedImages, setDraggedImages] = useState<File[]>([]);
  const router = useRouter();

  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addToArray = (field: keyof PartFormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeFromArray = (field: keyof PartFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    console.log('提交零件数据:', formData);
    alert('零件添加成功！');
    router.push('/admin');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">零件名称 *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入零件名称"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">零件号 *</label>
          <input
            type="text"
            value={formData.partNumber}
            onChange={(e) => handleInputChange('partNumber', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入零件号"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">通用零件号</label>
          <input
            type="text"
            value={formData.universalPartNumber}
            onChange={(e) => handleInputChange('universalPartNumber', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入通用零件号"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">品牌 *</label>
          <select
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">选择品牌</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">品质等级 *</label>
          <select
            value={formData.quality}
            onChange={(e) => handleInputChange('quality', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="original">原厂</option>
            <option value="oem">OEM</option>
            <option value="aftermarket">售后市场</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">产地</label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="制造产地"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">零件描述</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="详细描述零件的功能、特点等"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">分类与兼容性</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">主分类 *</label>
          <select
            value={formData.category}
            onChange={(e) => {
              handleInputChange('category', e.target.value);
              handleInputChange('subcategory', ''); // 重置子分类
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">选择主分类</option>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">子分类</label>
          <select
            value={formData.subcategory}
            onChange={(e) => handleInputChange('subcategory', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!formData.category}
          >
            <option value="">选择子分类</option>
            {formData.category && 
              categories.find(cat => cat.name === formData.category)?.subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">适用车型</label>
        <div className="flex gap-2 mb-2">
          <select
            value={newVehicleModel}
            onChange={(e) => setNewVehicleModel(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">选择车型</option>
            {vehicleModelOptions.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (newVehicleModel) {
                addToArray('vehicleModels', newVehicleModel);
                setNewVehicleModel('');
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.vehicleModels.map((model, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {model}
              <button
                type="button"
                onClick={() => removeFromArray('vehicleModels', index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">功能特点</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入功能特点"
          />
          <button
            type="button"
            onClick={() => {
              if (newFeature) {
                addToArray('features', newFeature);
                setNewFeature('');
              }
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {feature}
              <button
                type="button"
                onClick={() => removeFromArray('features', index)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">技术规格与价格</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">重量 (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">材质</label>
          <input
            type="text"
            value={formData.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="主要材质"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">保修期</label>
          <input
            type="text"
            value={formData.warranty}
            onChange={(e) => handleInputChange('warranty', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例：2年或6万公里"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">尺寸 (cm)</label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={formData.dimensions.length}
            onChange={(e) => handleInputChange('dimensions.length', Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="长"
            step="0.1"
          />
          <input
            type="number"
            value={formData.dimensions.width}
            onChange={(e) => handleInputChange('dimensions.width', Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="宽"
            step="0.1"
          />
          <input
            type="number"
            value={formData.dimensions.height}
            onChange={(e) => handleInputChange('dimensions.height', Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="高"
            step="0.1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">零售价 (¥) *</label>
          <input
            type="number"
            value={formData.retailPrice}
            onChange={(e) => handleInputChange('retailPrice', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">批发价 (¥)</label>
          <input
            type="number"
            value={formData.wholesalePrice}
            onChange={(e) => handleInputChange('wholesalePrice', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">安装说明</label>
        <textarea
          value={formData.installationNotes}
          onChange={(e) => handleInputChange('installationNotes', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="安装注意事项和说明"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">图片与标签</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">产品图片</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <PhotoIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">上传产品图片</h3>
          <p className="text-gray-500 mb-4">支持JPG、PNG格式，建议尺寸800x600以上</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            选择图片
          </button>
          <p className="text-xs text-gray-400 mt-2">或拖拽图片到此区域</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">搜索标签</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="添加搜索标签，便于用户查找"
          />
          <button
            type="button"
            onClick={() => {
              if (newTag) {
                addToArray('tags', newTag);
                setNewTag('');
              }
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeFromArray('tags', index)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">预览信息</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">零件名称:</span> {formData.name || '未填写'}</p>
          <p><span className="font-medium">零件号:</span> {formData.partNumber || '未填写'}</p>
          <p><span className="font-medium">品牌:</span> {formData.brand || '未选择'}</p>
          <p><span className="font-medium">分类:</span> {formData.category} {formData.subcategory && `> ${formData.subcategory}`}</p>
          <p><span className="font-medium">零售价:</span> ¥{formData.retailPrice.toLocaleString()}</p>
          {formData.wholesalePrice > 0 && (
            <p><span className="font-medium">批发价:</span> ¥{formData.wholesalePrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">添加新零件</h1>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`h-1 w-20 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            步骤 {currentStep} / {totalSteps}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* 操作按钮 */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (confirm('确认保存为草稿？')) {
                    console.log('保存草稿:', formData);
                    alert('已保存为草稿');
                  }
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                保存草稿
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  发布零件
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}