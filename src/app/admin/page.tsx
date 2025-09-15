'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

interface AdminStats {
  totalParts: number;
  totalVehicles: number;
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  newUsersToday: number;
}

interface ContentItem {
  id: string;
  title: string;
  type: 'part' | 'vehicle' | 'news' | 'course';
  status: 'published' | 'draft' | 'pending';
  createdAt: string;
  updatedAt: string;
}

const mockStats: AdminStats = {
  totalParts: 1247,
  totalVehicles: 89,
  totalUsers: 3456,
  totalOrders: 567,
  revenue: 2890000,
  newUsersToday: 23
};

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: '电池包冷却系统',
    type: 'part',
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16'
  },
  {
    id: '2',
    title: 'Tesla Model 3 高性能版',
    type: 'vehicle',
    status: 'published',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-15'
  },
  {
    id: '3',
    title: '新能源汽车充电技术解析',
    type: 'news',
    status: 'draft',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-14'
  }
];

function StatCard({ title, value, icon: Icon, change }: { 
  title: string; 
  value: string | number; 
  icon: React.ComponentType<any>;
  change?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600">{change}</p>
          )}
        </div>
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  );
}

function ContentTable({ content, onEdit, onDelete, onView }: {
  content: ContentItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}) {
  const getTypeLabel = (type: string) => {
    const labels = {
      part: '零件',
      vehicle: '汽车',
      news: '资讯',
      course: '课程'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-blue-100 text-blue-800'
    };
    
    const labels = {
      published: '已发布',
      draft: '草稿',
      pending: '待审核'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">内容管理</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                创建时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{getTypeLabel(item.type)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(item.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(item.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'part' | 'vehicle' | 'news' | 'course'>('part');
  const router = useRouter();

  const handleEdit = (id: string) => {
    console.log('编辑:', id);
    // 这里可以跳转到编辑页面或打开编辑模态框
  };

  const handleDelete = (id: string) => {
    if (confirm('确认删除此项目？')) {
      console.log('删除:', id);
      // 这里处理删除逻辑
    }
  };

  const handleView = (id: string) => {
    console.log('查看:', id);
    // 这里可以跳转到详情页面
  };

  const menuItems = [
    { id: 'dashboard', label: '仪表板', icon: ChartBarIcon },
    { id: 'parts', label: '零件管理', icon: CogIcon },
    { id: 'vehicles', label: '汽车管理', icon: ArrowUpTrayIcon },
    { id: 'news', label: '资讯管理', icon: PencilIcon },
    { id: 'users', label: '用户管理', icon: UserGroupIcon },
    { id: 'orders', label: '订单管理', icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">EV Car Parts Global - 管理后台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                添加内容
              </button>
              <div className="text-sm text-gray-600">管理员</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* 侧边栏 */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">仪表板</h2>
              
              {/* 统计卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="总零件数"
                  value={mockStats.totalParts.toLocaleString()}
                  icon={CogIcon}
                  change="+12 本周"
                />
                <StatCard
                  title="总车辆数"
                  value={mockStats.totalVehicles}
                  icon={ArrowUpTrayIcon}
                  change="+3 本周"
                />
                <StatCard
                  title="总用户数"
                  value={mockStats.totalUsers.toLocaleString()}
                  icon={UserGroupIcon}
                  change={`+${mockStats.newUsersToday} 今日`}
                />
                <StatCard
                  title="总订单数"
                  value={mockStats.totalOrders}
                  icon={ChartBarIcon}
                />
                <StatCard
                  title="总收入"
                  value={`¥${(mockStats.revenue / 10000).toFixed(1)}万`}
                  icon={ChartBarIcon}
                />
              </div>

              {/* 内容管理表格 */}
              <ContentTable
                content={mockContent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </div>
          )}

          {activeTab === 'parts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">零件管理</h2>
                <button
                  onClick={() => {
                    setUploadType('part');
                    setShowUploadModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  添加零件
                </button>
              </div>
              <ContentTable
                content={mockContent.filter(item => item.type === 'part')}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">汽车管理</h2>
                <button
                  onClick={() => {
                    setUploadType('vehicle');
                    setShowUploadModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  添加汽车
                </button>
              </div>
              <ContentTable
                content={mockContent.filter(item => item.type === 'vehicle')}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">资讯管理</h2>
                <button
                  onClick={() => {
                    setUploadType('news');
                    setShowUploadModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  添加资讯
                </button>
              </div>
              <ContentTable
                content={mockContent.filter(item => item.type === 'news')}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">用户管理</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">用户管理功能开发中...</p>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">订单管理</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">订单管理功能开发中...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 上传模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                添加{uploadType === 'part' ? '零件' : uploadType === 'vehicle' ? '汽车' : uploadType === 'news' ? '资讯' : '课程'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择类型
                </label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as any)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="part">零件</option>
                  <option value="vehicle">汽车</option>
                  <option value="news">资讯</option>
                  <option value="course">课程</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上传方式
                </label>
                <div className="space-y-2">
                  <button className="w-full bg-blue-50 border border-blue-200 rounded-md p-3 text-left hover:bg-blue-100">
                    <div className="font-medium text-blue-900">单个添加</div>
                    <div className="text-sm text-blue-600">手动填写详细信息</div>
                  </button>
                  <button className="w-full bg-green-50 border border-green-200 rounded-md p-3 text-left hover:bg-green-100">
                    <div className="font-medium text-green-900">批量导入</div>
                    <div className="text-sm text-green-600">上传Excel文件批量导入</div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (uploadType === 'part') {
                    router.push('/admin/add-part');
                  } else if (uploadType === 'vehicle') {
                    router.push('/admin/add-vehicle');
                  } else if (uploadType === 'news') {
                    router.push('/admin/add-news');
                  } else {
                    alert(`跳转到添加${uploadType === 'course' ? '课程' : uploadType}页面`);
                  }
                  setShowUploadModal(false);
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                继续
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
