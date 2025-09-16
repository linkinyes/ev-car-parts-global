// SEO配置和工具函数
export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  siteName?: string;
}

export const defaultSeoConfig: SeoConfig = {
  title: 'EV Car Parts Global - 新能源汽车和零件全球交易平台',
  description: '全球领先的新能源汽车和零件交易平台，提供电池、电机、电控等核心零部件，支持VIN码查询、零件号查询、品牌车型查询等多种搜索方式。',
  keywords: [
    '新能源汽车',
    '电动汽车',
    '混合动力汽车',
    '汽车零件',
    '电池系统',
    '电机控制器',
    '充电设备',
    'EV零件',
    '新能源汽车维修',
    '汽车配件'
  ],
  image: '/images/og-image.jpg',
  url: 'https://evpartsglobal.com',
  type: 'website',
  locale: 'zh_CN',
  siteName: 'EV Car Parts Global'
};

// 为不同页面创建SEO配置
export const pageSeoConfig: Record<string, SeoConfig> = {
  home: {
    title: 'EV Car Parts Global - 新能源汽车和零件全球交易平台',
    description: '全球领先的新能源汽车和零件交易平台，提供电池、电机、电控等核心零部件，支持VIN码查询、零件号查询、品牌车型查询等多种搜索方式。',
    keywords: [
      '新能源汽车',
      '电动汽车',
      '混合动力汽车',
      '汽车零件',
      '电池系统',
      '电机控制器',
      '充电设备'
    ]
  },
  parts: {
    title: '新能源汽车零件商店 - EV Car Parts Global',
    description: '专业新能源汽车零件商店，提供原厂件、OEM件和副厂件，支持VIN码查询、零件号查询、图片识别等多种搜索方式，快速找到您需要的零件。',
    keywords: [
      '新能源汽车零件',
      '电动汽车零件',
      '电池包',
      '电机控制器',
      '充电器',
      'BMS',
      'VIN码查询',
      '零件号查询'
    ]
  },
  vehicles: {
    title: '新能源汽车展厅 - EV Car Parts Global',
    description: '新能源汽车新车和二手车展厅，提供特斯拉、比亚迪、蔚来、小鹏等主流品牌车型，支持在线选购和咨询。',
    keywords: [
      '新能源汽车',
      '电动汽车',
      '混合动力汽车',
      '新车',
      '二手车',
      '特斯拉',
      '比亚迪',
      '蔚来',
      '小鹏'
    ]
  },
  news: {
    title: '新能源汽车资讯 - EV Car Parts Global',
    description: '最新的新能源汽车行业资讯、技术动态、市场分析和政策解读，帮助您了解行业发展趋势。',
    keywords: [
      '新能源汽车资讯',
      '电动汽车新闻',
      '行业动态',
      '技术发展',
      '政策解读',
      '市场分析'
    ]
  },
  community: {
    title: '新能源汽车用户社群 - EV Car Parts Global',
    description: '新能源汽车用户交流社区，分享用车经验、维修技巧、改装方案，与全球EV爱好者一起探讨新能源汽车技术。',
    keywords: [
      '新能源汽车社区',
      '电动汽车论坛',
      '用户交流',
      '用车经验',
      '维修技巧',
      '改装方案'
    ]
  },
  school: {
    title: 'EV课堂 - 新能源汽车维修技术分享 - EV Car Parts Global',
    description: '专业的新能源汽车维修技术分享平台，提供维修教程、故障诊断、技术培训等实用内容。',
    keywords: [
      '新能源汽车维修',
      '电动汽车维修',
      '维修教程',
      '故障诊断',
      '技术培训',
      '维修经验'
    ]
  }
};

// 生成Open Graph标签
export function generateOpenGraphTags(config: SeoConfig): Record<string, string> {
  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:type': config.type || 'website',
    'og:url': config.url || '',
    'og:image': config.image || '',
    'og:locale': config.locale || 'zh_CN',
    'og:site_name': config.siteName || 'EV Car Parts Global'
  };
}

// 生成Twitter卡片标签
export function generateTwitterTags(config: SeoConfig): Record<string, string> {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': config.image || '',
    'twitter:site': '@evpartsglobal'
  };
}

// 生成结构化数据
export function generateStructuredData(config: SeoConfig): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': config.siteName || 'EV Car Parts Global',
    'url': config.url || 'https://evpartsglobal.com',
    'description': config.description,
    'keywords': config.keywords.join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': config.siteName || 'EV Car Parts Global',
      'logo': {
        '@type': 'ImageObject',
        'url': config.image || '/images/logo.png'
      }
    }
  };
}