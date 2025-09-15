'use client';

import React, { useState } from 'react';
import { PlusIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon, EyeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, FireIcon } from '@heroicons/react/24/solid';
import Navigation from '../../components/Navigation';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    level: string;
  };
  publishTime: string;
  category: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isHot?: boolean;
  isPinned?: boolean;
  tags: string[];
}

const samplePosts: CommunityPost[] = [
  {
    id: '1',
    title: 'Tesla Model 3提车一周年总结，分享一些真实用车感受',
    content: '去年这个时候提的Tesla Model 3，到现在刚好一年，行驶了28000公里。今天想和大家分享一下这一年来的真实用车感受，包括续航、充电、维护等各个方面...',
    author: {
      name: '电车老司机',
      avatar: '/api/placeholder/40/40',
      verified: true,
      level: 'Lv.8'
    },
    publishTime: '2024-01-15 16:30',
    category: '用车体验',
    images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
    likes: 1250,
    comments: 89,
    shares: 45,
    views: 5670,
    isLiked: false,
    isHot: true,
    tags: ['Tesla', 'Model 3', '用车体验', '提车周年']
  },
  {
    id: '2',
    title: '比亚迪海豹DM-i冬季续航测试，实测数据分享',
    content: '最近天气转冷，很多朋友关心电车冬季续航表现。我的海豹DM-i开了三个月了，今天专门做了一次冬季续航测试，全程开空调暖风，实测数据如下...',
    author: {
      name: '新能源测评师',
      avatar: '/api/placeholder/40/40',
      verified: true,
      level: 'Lv.6'
    },
    publishTime: '2024-01-14 14:20',
    category: '测试分享',
    images: ['/api/placeholder/300/200'],
    likes: 890,
    comments: 156,
    shares: 32,
    views: 3450,
    isLiked: true,
    tags: ['比亚迪', '海豹DM-i', '续航测试', '冬季']
  },
  {
    id: '3',
    title: '小鹏G9长途自驾游记，广州到拉萨全程记录',
    content: '上个月开着小鹏G9从广州自驾到拉萨，全程4200公里，用时8天。路上遇到了很多有趣的事情，也发现了一些充电的问题。今天整理了详细的游记分享给大家...',
    author: {
      name: '自驾达人',
      avatar: '/api/placeholder/40/40',
      verified: false,
      level: 'Lv.5'
    },
    publishTime: '2024-01-13 10:15',
    category: '自驾游记',
    images: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200'],
    likes: 2100,
    comments: 245,
    shares: 78,
    views: 8920,
    isLiked: false,
    isPinned: true,
    tags: ['小鹏G9', '自驾游', '拉萨', '长途']
  },
  {
    id: '4',
    title: '蔚来ES8换电体验分享，对比充电有哪些优劣？',
    content: '刚刚在蔚来换电站体验了人生第一次换电，整个过程大概5分钟，确实比充电快很多。但是也发现了一些问题，今天和大家聊聊换电vs充电的优劣...',
    author: {
      name: '蔚来车主',
      avatar: '/api/placeholder/40/40',
      verified: true,
      level: 'Lv.7'
    },
    publishTime: '2024-01-12 20:45',
    category: '充电换电',
    likes: 567,
    comments: 89,
    shares: 23,
    views: 2340,
    isLiked: false,
    tags: ['蔚来ES8', '换电', '充电对比']
  }
];

function PostCard({ post }: { post: CommunityPost }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{post.author.name}</span>
              {post.author.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{post.author.level}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <ClockIcon className="h-3 w-3" />
              <span>{post.publishTime}</span>
              <span>·</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{post.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {post.isHot && (
            <span className="flex items-center text-red-500 text-xs font-medium">
              <FireIcon className="h-4 w-4 mr-1" />
              热门
            </span>
          )}
          {post.isPinned && (
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-medium">
              置顶
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.content}
      </p>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          {post.images.length === 1 ? (
            <img 
              src={post.images[0]} 
              alt="Post image"
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {post.images.slice(0, 3).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Post image ${index + 1}`}
                  className="aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            {isLiked ? (
              <HeartSolidIcon className="h-5 w-5" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span className="text-sm">{likesCount}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span className="text-sm">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
            <ShareIcon className="h-5 w-5" />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <EyeIcon className="h-4 w-4" />
          <span>{post.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const categories = [
    { id: 'all', name: '全部', count: samplePosts.length },
    { id: 'experience', name: '用车体验', count: 45 },
    { id: 'purchase', name: '购车咨询', count: 32 },
    { id: 'maintenance', name: '维修保养', count: 28 },
    { id: 'travel', name: '自驾游记', count: 21 },
    { id: 'charging', name: '充电换电', count: 19 },
    { id: 'tech', name: '技术讨论', count: 15 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">用户社群</h1>
              <p className="mt-2 text-gray-600">分享购车经验、用车心得，与全球新能源汽车爱好者交流</p>
            </div>
            
            <button 
              onClick={() => setShowNewPostModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              发布帖子
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">讨论分类</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      activeCategory === category.id
                        ? 'bg-green-100 text-green-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>

              {/* Community Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-3">社区统计</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>总帖子数</span>
                    <span className="font-medium">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>活跃用户</span>
                    <span className="font-medium">3,248</span>
                  </div>
                  <div className="flex justify-between">
                    <span>今日发帖</span>
                    <span className="font-medium text-green-600">89</span>
                  </div>
                </div>
              </div>

              {/* Hot Topics */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-900 mb-3">热门话题</h4>
                <div className="space-y-2">
                  {['#冬季续航', '#充电体验', '#自驾游', '#保养心得', '#提车作业'].map((topic, index) => (
                    <button
                      key={index}
                      className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {samplePosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}

            {/* Load More */}
            <div className="text-center">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                加载更多帖子
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}