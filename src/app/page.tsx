import Link from "next/link";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';
import { imageMap } from '../lib/images';

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              新能源汽车和零件
              <br />
              <span className="text-green-600">全球交易平台</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              连接全球新能源汽车市场，为全球新能源用户提供零件交易、汽车销售、资讯分享等一站式服务
            </p>
            
            {/* Search Section */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">AI智能搜索</h2>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="输入关键词搜索零件或车型..."
                        className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                    搜索
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Column Grid Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-5 gap-4">
            {/* 第1列 - 零件 A */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">热门零件</h3>
              {[
                { title: '电池组', price: '￥1,299', image: imageMap.parts['battery-pack'], discount: '8.5折' },
                { title: '电机控制器', price: '￥899', image: imageMap.parts['motor-controller'] },
                { title: '充电枪', price: '￥299', image: imageMap.parts['charging-gun'], hot: true },
                { title: '电控系统', price: '￥2,199', image: imageMap.parts['control-system'] },
                { title: '驱动电机', price: '￥3,999', image: imageMap.parts['drive-motor'], discount: '9折' }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                    {item.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {item.discount}
                      </span>
                    )}
                    {item.hot && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        热销
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-green-600 font-semibold text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 第2列 - 零件 B */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">精选配件</h3>
              {[
                { title: 'BMS管理系统', price: '￥799', image: imageMap.parts['bms-system'] },
                { title: '车载充电器', price: '￥499', image: imageMap.parts['onboard-charger'], hot: true },
                { title: '电机控制器', price: '￥1,599', image: imageMap.parts['motor-controller'] },
                { title: '高压电缆', price: '￥199', image: imageMap.parts['high-voltage-cable'], discount: '7.5折' },
                { title: '热管理系统', price: '￥1,299', image: imageMap.parts['thermal-management'] }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                    {item.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {item.discount}
                      </span>
                    )}
                    {item.hot && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        热销
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-green-600 font-semibold text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 第3列 - 汽车 A */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">热门车型</h3>
              {[
                { title: 'Tesla Model 3', price: '￥29.9万', image: imageMap.vehicles['tesla-model3'], type: '新车' },
                { title: '比亚迪汉EV', price: '￥18.5万', image: imageMap.vehicles['byd-han-ev'], type: '二手' },
                { title: '蔚来ET7', price: '￥32.8万', image: imageMap.vehicles['nio-et7'], type: '新车', hot: true },
                { title: '小鹏P7', price: '￥25.2万', image: imageMap.vehicles['xpeng-p7'], type: '二手' },
                { title: '理想L9', price: '￥45.9万', image: imageMap.vehicles['li-l9'], type: '新车' }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-24 object-cover" />
                    <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                      item.type === '新车' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {item.type}
                    </span>
                    {item.hot && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        热销
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-blue-600 font-semibold text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 第4列 - 汽车 B */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">精选车源</h3>
              {[
                { title: '极氪001', price: '￥28.6万', image: imageMap.vehicles['zeekr-001'], type: '新车' },
                { title: 'Model Y', price: '￥33.9万', image: imageMap.vehicles['tesla-model-y'], type: '新车', hot: true },
                { title: '小鹏G3', price: '￥15.8万', image: imageMap.vehicles['xpeng-g3'], type: '二手' },
                { title: '哪吒GT', price: '￥35.8万', image: imageMap.vehicles['neta-gt'], type: '新车' },
                { title: '红旗E-HS9', price: '￥41.2万', image: imageMap.vehicles['hongqi-ehs9'], type: '二手' }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-24 object-cover" />
                    <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                      item.type === '新车' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {item.type}
                    </span>
                    {item.hot && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        热销
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-blue-600 font-semibold text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 第5列 - 资讯 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">EV 资讯</h3>
              {[
                { title: '2024年电动汽车市场分析报告', image: imageMap.news['ev-market-2024'], time: '2小时前', views: '2.1k' },
                { title: '特斯拉新技术突破：电池续航提升30%', image: imageMap.news['tesla-battery-tech'], time: '5小时前', views: '3.8k', hot: true },
                { title: '中国新能源汽车出口量再创新高', image: imageMap.news['china-ev-export'], time: '8小时前', views: '1.5k' },
                { title: '充电基础设施建设的最新进展', image: imageMap.news['charging-infrastructure'], time: '12小时前', views: '982' },
                { title: 'EV维修保养指南：如何延长电池寿命', image: imageMap.news['ev-maintenance-guide'], time: '1天前', views: '2.3k' }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-24 object-cover" />
                    {item.hot && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        热门
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-xs text-gray-900 mb-2 line-clamp-2 leading-tight">{item.title}</h4>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{item.time}</span>
                      <span>{item.views} 阅读</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            加入我们，开启新能源汽车之旅
          </h2>
          <p className="text-xl text-green-100 mb-8">
            马上注册，享受专业的新能源汽车和零件服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-green-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              立即注册
            </Link>
            <Link
              href="/parts"
              className="bg-green-700 text-white hover:bg-green-800 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              浏览零件
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EV</span>
                </div>
                <span className="ml-2 text-xl font-semibold">Car Parts Global</span>
              </div>
              <p className="text-gray-400">
                全球领先的新能源汽车和零件交易平台
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">产品服务</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/parts" className="hover:text-white">零件商店</Link></li>
                <li><Link href="/vehicles" className="hover:text-white">汽车商店</Link></li>
                <li><Link href="/news" className="hover:text-white">资讯中心</Link></li>
                <li><Link href="/community" className="hover:text-white">用户社群</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">帮助中心</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">常见问题</Link></li>
                <li><Link href="/contact" className="hover:text-white">联系我们</Link></li>
                <li><Link href="/wholesale" className="hover:text-white">批发商入驻</Link></li>
                <li><Link href="/ev-school" className="hover:text-white">EV课堂</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">联系方式</h3>
              <ul className="space-y-2 text-gray-400">
                <li>邮箱：linkinyes@gmail.com</li>
                <li>客服热线：+86 19866695358</li>
                <li>WhatsApp：+8619866695358</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EV Car Parts Global. 版权所有。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
