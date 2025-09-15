'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface NewsFormData {
  title: string;
  category: string;
  content: string;
  summary: string;
  author: string;
  tags: string[];
  coverImage: string;
  status: 'draft' | 'published';
}

const initialFormData: NewsFormData = {
  title: '',
  category: '',
  content: '',
  summary: '',
  author: '',
  tags: [],
  coverImage: '',
  status: 'draft'
};

const categories = [
  '技术资讯', '市场动态', '政策法规', '行业报告', 
  '新品发布', '企业新闻', '展会活动', '充电设施'
];

export default function AddNewsPage() {
  const [formData, setFormData] = useState<NewsFormData>(initialFormData);
  const router = useRouter();

  const handleSubmit = () => {
    console.log('提交资讯数据:', formData);
    alert('资讯添加成功！');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">添加新资讯</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">资讯标题 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="输入资讯标题"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分类 *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">选择分类</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">作者</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="作者姓名"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">摘要</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="资讯摘要，用于搜索和预览"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">正文内容 *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={12}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="输入资讯正文内容..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">封面图片</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <PhotoIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">上传封面图片</h3>
                <p className="text-gray-500 mb-4">建议尺寸1200x630，支持JPG、PNG格式</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  选择图片
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => router.push('/admin')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              取消
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setFormData({...formData, status: 'draft'});
                  handleSubmit();
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                保存草稿
              </button>
              <button
                onClick={() => {
                  setFormData({...formData, status: 'published'});
                  handleSubmit();
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                发布资讯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}