'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon, PlayIcon, ClockIcon, EyeIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { FireIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Navigation from '../../components/Navigation';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  type: 'news' | 'review' | 'launch' | 'tech';
  category: string;
  author: string;
  publishTime: string;
  readTime: number;
  views: number;
  comments: number;
  image: string;
  videoUrl?: string;
  isHot?: boolean;
  isNew?: boolean;
  tags: string[];
}

const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: '比亚迪发布全新刀片电池3.0技术，能量密度再创新高',
    summary: '比亚迪在最新技术发布会上展示了刀片电池3.0技术，相比上一代产品，能量密度提升15%，安全性能进一步优化...',
    content: '详细内容...',
    type: 'tech',
    category: '技术突破',
    author: '新能源汽车观察',
    publishTime: '2024-01-15 14:30',
    readTime: 5,
    views: 15420,
    comments: 234,
    image: '/api/placeholder/600/300',
    isHot: true,
    tags: ['比亚迪', '刀片电池', '技术突破']
  },
  {
    id: '2',
    title: 'Tesla Model Y改款版本全球首发，续航突破700公里',
    summary: 'Tesla在柏林超级工厂举行了Model Y改款版本的全球首发仪式，新车搭载了4680电池，WLTP续航达到703公里...',
    content: '详细内容...',
    type: 'launch',
    category: '新车发布',
    author: 'Tesla官方',
    publishTime: '2024-01-14 20:15',
    readTime: 8,
    views: 28750,
    comments: 567,
    image: '/api/placeholder/600/300',
    videoUrl: 'https://example.com/video1',
    isNew: true,
    tags: ['Tesla', 'Model Y', '新车发布']
  },
  {
    id: '3',
    title: '深度评测：蔚来ET7对比宝马iX，豪华电动车巅峰对决',
    summary: '本期评测我们将蔚来ET7与宝马iX进行全方位对比，从外观设计、内饰做工、驾驶体验到智能化配置...',
    content: '详细内容...',
    type: 'review',
    category: '深度评测',
    author: '汽车之家',
    publishTime: '2024-01-13 16:45',
    readTime: 12,
    views: 19830,
    comments: 189,
    image: '/api/placeholder/600/300',
    videoUrl: 'https://example.com/video2',
    tags: ['蔚来ET7', '宝马iX', '对比评测']
  },
  {
    id: '4',
    title: '充电基础设施建设提速，2024年将新增50万个充电桩',
    summary: '国家发改委最新数据显示，2024年全国将新增公共充电桩50万个，高速公路服务区充电设施覆盖率将达到100%...',
    content: '详细内容...',
    type: 'news',
    category: '行业资讯',
    author: '电动汽车时代',
    publishTime: '2024-01-12 09:20',
    readTime: 6,
    views: 12650,
    comments: 95,
    image: '/api/placeholder/600/300',
    isHot: true,
    tags: ['充电桩', '基础设施', '政策']
  },
  {
    id: '5',
    title: '小鹏G9海外版详细配置曝光，将进军欧洲市场',
    summary: '小鹏汽车即将推出的G9海外版车型配置信息曝光，新车将搭载最新的XPILOT 4.0自动驾驶系统...',
    content: '详细内容...',
    type: 'news',
    category: '海外市场',
    author: '小鹏汽车',
    publishTime: '2024-01-11 11:30',
    readTime: 4,
    views: 8950,
    comments: 76,
    image: '/api/placeholder/600/300',
    tags: ['小鹏G9', '海外市场', '自动驾驶']
  },
  {
    id: '6',
    title: '理想L9车主真实用车体验分享：一年行驶3万公里心得',
    summary: '作为理想L9的首批车主，这一年来我驾驶这辆车行驶了30000公里，今天分享一些真实的用车感受...',
    content: '详细内容...',
    type: 'review',
    category: '用户分享',
    author: '车主张先生',
    publishTime: '2024-01-10 19:45',
    readTime: 10,
    views: 7320,
    comments: 158,
    image: '/api/placeholder/600/300',
    tags: ['理想L9', '用车体验', '车主分享']
  }
];

function NewsTypeFilter({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-green-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {children} ({count})
    </button>
  );
}

function NewsCard({ article, size = 'normal' }: { article: NewsArticle; size?: 'normal' | 'large' | 'small' }) {
  const cardClasses = {
    large: 'lg:col-span-2 lg:row-span-2',
    normal: '',
    small: 'lg:col-span-1'
  };

  const imageClasses = {
    large: 'h-64 lg:h-80',
    normal: 'h-48',
    small: 'h-32'
  };

  return (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ${cardClasses[size]}`}>
      <div className={`relative ${imageClasses[size]}`}>
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        
        {article.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white/90 rounded-full p-3 hover:bg-white transition-colors cursor-pointer">
              <PlayIcon className="h-8 w-8 text-gray-800" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${
            article.type === 'news' ? 'bg-blue-500' :
            article.type === 'review' ? 'bg-purple-500' :
            article.type === 'launch' ? 'bg-green-500' :
            'bg-orange-500'
          }`}>
            {article.category}
          </span>
          
          {article.isHot && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
              <FireIcon className="h-3 w-3 mr-1" />
              热门
            </span>
          )}
          
          {article.isNew && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
              <SparklesIcon className="h-3 w-3 mr-1" />
              最新
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {article.readTime}分钟阅读
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 ${
          size === 'large' ? 'text-xl' : size === 'small' ? 'text-sm' : 'text-lg'
        }`}>
          {article.title}
        </h3>
        
        <p className={`text-gray-600 mb-3 line-clamp-3 ${
          size === 'small' ? 'text-xs' : 'text-sm'
        }`}>
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span>{article.author}</span>
            <div className="flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              {article.publishTime}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <EyeIcon className="h-3 w-3 mr-1" />
              {article.views.toLocaleString()}
            </div>
            <div className="flex items-center">
              <ChatBubbleLeftIcon className="h-3 w-3 mr-1" />
              {article.comments}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'news' | 'review' | 'launch' | 'tech'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = sampleNews.filter(article => {
    if (activeFilter !== 'all' && article.type !== activeFilter) return false;
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !article.summary.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filterCounts = {
    all: sampleNews.length,
    news: sampleNews.filter(a => a.type === 'news').length,
    review: sampleNews.filter(a => a.type === 'review').length,
    launch: sampleNews.filter(a => a.type === 'launch').length,
    tech: sampleNews.filter(a => a.type === 'tech').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">新能源资讯</h1>
          <p className="mt-2 text-gray-600">最新新能源汽车资讯、发布会、评测视频和行业新闻</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索资讯内容..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              搜索
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <NewsTypeFilter 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
              count={filterCounts.all}
            >
              全部
            </NewsTypeFilter>
            <NewsTypeFilter 
              active={activeFilter === 'news'} 
              onClick={() => setActiveFilter('news')}
              count={filterCounts.news}
            >
              行业新闻
            </NewsTypeFilter>
            <NewsTypeFilter 
              active={activeFilter === 'review'} 
              onClick={() => setActiveFilter('review')}
              count={filterCounts.review}
            >
              评测体验
            </NewsTypeFilter>
            <NewsTypeFilter 
              active={activeFilter === 'launch'} 
              onClick={() => setActiveFilter('launch')}
              count={filterCounts.launch}
            >
              新车发布
            </NewsTypeFilter>
            <NewsTypeFilter 
              active={activeFilter === 'tech'} 
              onClick={() => setActiveFilter('tech')}
              count={filterCounts.tech}
            >
              技术突破
            </NewsTypeFilter>
          </div>
        </div>

        {/* Hot Topics */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <FireIcon className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">热点话题</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['刀片电池3.0', 'Tesla Model Y改款', '充电桩建设', '蔚来ET7评测', '海外市场拓展'].map((topic, index) => (
              <button
                key={index}
                className="bg-white hover:bg-red-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-red-200"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredNews.map((article, index) => (
            <NewsCard 
              key={article.id} 
              article={article}
              size={index === 0 ? 'large' : index < 3 ? 'normal' : 'small'}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
            加载更多资讯
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-green-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">订阅新能源汽车周报</h2>
          <p className="text-green-100 mb-6">每周精选最重要的新能源汽车资讯，直接发送到您的邮箱</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入您的邮箱地址"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-white text-green-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors">
              订阅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}