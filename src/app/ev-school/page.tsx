'use client';

import React, { useState } from 'react';
import { PlayIcon, BookOpenIcon, ClockIcon, UserGroupIcon, StarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  students: number;
  thumbnail: string;
  lessons: number;
  price: number;
  isFree: boolean;
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: '新能源汽车基础知识入门',
    description: '从零开始了解新能源汽车的基本原理、类型、优势等基础知识，适合初学者',
    instructor: '李教授',
    duration: '2小时30分',
    difficulty: 'beginner',
    rating: 4.8,
    students: 1250,
    thumbnail: '/api/placeholder/300/200',
    lessons: 12,
    price: 0,
    isFree: true
  },
  {
    id: '2',
    title: '电池系统维护与保养',
    description: '深入了解新能源汽车电池系统的工作原理，学习正确的维护保养方法',
    instructor: '王工程师',
    duration: '3小时45分',
    difficulty: 'intermediate',
    rating: 4.9,
    students: 890,
    thumbnail: '/api/placeholder/300/200',
    lessons: 18,
    price: 199,
    isFree: false
  }
];

export default function EVSchoolPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'guides'>('courses');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">EV课堂</h1>
          <p className="mt-2 text-gray-600">学习新能源汽车知识，掌握维修保养技能</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'courses' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            在线课程
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'guides' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            维修指南
          </button>
        </div>

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-white/90 rounded-full p-3 hover:bg-white transition-colors cursor-pointer">
                      <PlayIcon className="h-8 w-8 text-gray-800" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {course.difficulty === 'beginner' ? '初级' : course.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                  {course.isFree && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">免费</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{course.description}</p>
                  
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <AcademicCapIcon className="h-4 w-4 mr-1" />
                    <span className="mr-4">{course.instructor}</span>
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {course.isFree ? (
                        <span className="text-lg font-bold text-green-600">免费</span>
                      ) : (
                        <span className="text-lg font-bold text-green-600">¥{course.price}</span>
                      )}
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      {course.isFree ? '立即学习' : '立即购买'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">新能源汽车冬季保养指南</h3>
              <p className="text-gray-600 mb-4">冬季是新能源汽车保养的关键时期，正确的保养方法可以有效延长电池寿命...</p>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span className="mr-4">预计30分钟</span>
                <BookOpenIcon className="h-4 w-4 mr-1" />
                <span>5个步骤</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">电机异响故障排查方法</h3>
              <p className="text-gray-600 mb-4">电机异响是新能源汽车常见故障之一，本文详细介绍排查方法...</p>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span className="mr-4">预计45分钟</span>
                <BookOpenIcon className="h-4 w-4 mr-1" />
                <span>5个步骤</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}