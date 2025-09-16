// 产品和库存管理系统
export interface ProductBase {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  stockQuantity: number;
  minOrderQuantity: number;
  supplierId: string;
  supplierName: string;
  location: string;
  shippingInfo: string;
  warranty: string;
  createdAt: string;
  updatedAt: string;
}

export interface Part extends ProductBase {
  type: 'part';
  partNumber: string;
  universalPartNumber?: string;
  vehicleModels: string[];
  quality: 'original' | 'aftermarket' | 'oem';
  specifications: {
    [key: string]: string;
  };
}

export interface Vehicle extends ProductBase {
  type: 'vehicle';
  vehicleType: 'new' | 'used';
  model: string;
  year: number;
  mileage?: number;
  fuelType: 'electric' | 'hybrid';
  batteryCapacity?: number;
  range?: number;
  color: string;
  condition?: string;
  vin?: string;
}

export interface ProductInventory {
  productId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lastUpdated: string;
  lowStockAlert: boolean;
  reorderPoint: number;
}

// 产品管理器
class ProductManager {
  // 零件产品数据
  private parts: Part[] = [
    {
      id: 'part_001',
      type: 'part',
      name: '电池包冷却系统',
      partNumber: 'BT-COOL-001',
      universalPartNumber: 'UC-BT-001',
      description: '高效电池包冷却系统，确保电池温度控制在最佳范围内，延长电池使用寿命。采用先进的液冷技术，提供卓越的散热性能。',
      images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop&crop=center'],
      category: '电池系统',
      brand: 'Tesla',
      vehicleModels: ['Model 3', 'Model Y', 'Model S', 'Model X'],
      quality: 'original',
      inStock: true,
      stockQuantity: 50,
      minOrderQuantity: 1,
      supplierId: 'supplier_tesla',
      supplierName: 'Tesla官方授权供应商',
      location: '中国深圳',
      shippingInfo: '48小时内发货，支持全球配送',
      warranty: '3年或10万公里',
      specifications: {
        '适用车型': 'Tesla Model 3/Y/S/X',
        '冷却方式': '液冷系统',
        '工作温度范围': '-40°C 至 85°C',
        '最大功率': '5kW',
        '接口类型': '快速接头',
        '重量': '12.5kg',
        '尺寸': '600 x 400 x 150mm'
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 'part_002',
      type: 'part',
      name: '车载充电器',
      partNumber: 'OBC-220V-002',
      description: '高性能车载充电器，支持220V单相交流充电，最大充电功率11kW，兼容多种新能源车型。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '充电系统',
      brand: 'BYD',
      vehicleModels: ['秦Plus', '汉EV', '唐EV', '宋PLUS'],
      quality: 'oem',
      inStock: true,
      stockQuantity: 120,
      minOrderQuantity: 1,
      supplierId: 'supplier_byd',
      supplierName: '比亚迪授权供应商',
      location: '中国比亚迪工厂',
      shippingInfo: '24小时内发货',
      warranty: '2年或5万公里',
      specifications: {
        '输入电压': '220V ±10%',
        '最大功率': '11kW',
        '充电接口': '国标GB/T',
        '防护等级': 'IP67',
        '工作温度': '-30°C 至 70°C',
        '重量': '3.2kg'
      },
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 'part_003',
      type: 'part',
      name: '电机控制器',
      partNumber: 'MC-CTRL-003',
      description: '高性能电机控制器，优化动力输出，提高能效比，适用于多种驱动电机。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '驱动系统',
      brand: 'NIO',
      vehicleModels: ['ET7', 'ES8', 'ET5'],
      quality: 'aftermarket',
      inStock: false,
      stockQuantity: 0,
      minOrderQuantity: 1,
      supplierId: 'supplier_nio',
      supplierName: '蔚来合作伙伴',
      location: '中国上海',
      shippingInfo: '缺货',
      warranty: '1年',
      specifications: {
        '适用车型': 'NIO ET7/ES8/ET5',
        '额定功率': '240kW',
        '电压范围': '320V-420V',
        '冷却方式': '水冷',
        '防护等级': 'IP67',
        '工作温度': '-40°C 至 85°C'
      },
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 'part_004',
      type: 'part',
      name: 'BMS电池管理系统',
      partNumber: 'BMS-LITH-004',
      description: '先进的电池管理系统，实时监控电池状态，确保电池安全和性能。',
      images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop&crop=center'],
      category: '电池系统',
      brand: 'CATL',
      vehicleModels: ['多种车型通用'],
      quality: 'oem',
      inStock: true,
      stockQuantity: 85,
      minOrderQuantity: 5,
      supplierId: 'supplier_catl',
      supplierName: '宁德时代授权经销商',
      location: '中国福建',
      shippingInfo: '36小时内发货',
      warranty: '3年',
      specifications: {
        '电池类型': '锂离子电池',
        '管理单元': '16串/32串',
        '通信接口': 'CAN 2.0',
        '工作电压': '12V-500V',
        '工作温度': '-40°C 至 85°C',
        '防护等级': 'IP67'
      },
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19'
    },
    {
      id: 'part_005',
      type: 'part',
      name: '高压电缆总成',
      partNumber: 'HV-CABLE-005',
      description: '高品质高压电缆总成，安全可靠，符合新能源汽车安全标准。',
      images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop&crop=center'],
      category: '电气系统',
      brand: '德尔福',
      vehicleModels: ['通用适配'],
      quality: 'original',
      inStock: true,
      stockQuantity: 200,
      minOrderQuantity: 10,
      supplierId: 'supplier_delphi',
      supplierName: '德尔福授权供应商',
      location: '中国江苏',
      shippingInfo: '24小时内发货',
      warranty: '2年',
      specifications: {
        '额定电压': '600V DC',
        '额定电流': '250A',
        '导线截面': '25mm²',
        '绝缘材料': 'XLPO',
        '工作温度': '-40°C 至 125°C',
        '防护等级': 'IP67'
      },
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16'
    },
    {
      id: 'part_006',
      type: 'part',
      name: '车载DC/DC转换器',
      partNumber: 'DCDC-12V-006',
      description: '高效车载DC/DC转换器，将高压直流转换为12V低压直流，为车载设备供电。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '电气系统',
      brand: '博世',
      vehicleModels: ['通用适配'],
      quality: 'original',
      inStock: true,
      stockQuantity: 75,
      minOrderQuantity: 1,
      supplierId: 'supplier_bosch',
      supplierName: '博世授权经销商',
      location: '德国进口',
      shippingInfo: '72小时内发货',
      warranty: '2年',
      specifications: {
        '输入电压': '200V-450V DC',
        '输出电压': '12V ±5%',
        '额定功率': '3kW',
        '效率': '≥92%',
        '工作温度': '-40°C 至 85°C',
        '防护等级': 'IP67'
      },
      createdAt: '2024-01-14',
      updatedAt: '2024-01-21'
    },
    {
      id: 'part_007',
      type: 'part',
      name: '热管理系统',
      partNumber: 'TMS-EV-007',
      description: '新能源汽车热管理系统，智能控制电池、电机和车厢温度。',
      images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop&crop=center'],
      category: '冷却系统',
      brand: '法雷奥',
      vehicleModels: ['通用适配'],
      quality: 'original',
      inStock: true,
      stockQuantity: 40,
      minOrderQuantity: 1,
      supplierId: 'supplier_valeo',
      supplierName: '法雷奥授权供应商',
      location: '法国进口',
      shippingInfo: '5天内发货',
      warranty: '3年',
      specifications: {
        '系统类型': '热泵系统',
        '制冷量': '5kW',
        '制热量': '6kW',
        '能效比': '≥2.5',
        '工作温度': '-30°C 至 50°C',
        '重量': '45kg'
      },
      createdAt: '2024-01-11',
      updatedAt: '2024-01-17'
    },
    {
      id: 'part_008',
      type: 'part',
      name: '充电口模块',
      partNumber: 'CHG-PORT-008',
      description: '快速充电口模块，支持DC快充，兼容多种充电标准。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '充电系统',
      brand: '中兴',
      vehicleModels: ['通用适配'],
      quality: 'oem',
      inStock: true,
      stockQuantity: 150,
      minOrderQuantity: 5,
      supplierId: 'supplier_zte',
      supplierName: '中兴新能源',
      location: '中国深圳',
      shippingInfo: '24小时内发货',
      warranty: '1年',
      specifications: {
        '充电标准': 'GB/T, CHAdeMO, CCS',
        '最大功率': '120kW',
        '防护等级': 'IP67',
        '工作温度': '-30°C 至 70°C',
        '重量': '1.8kg'
      },
      createdAt: '2024-01-09',
      updatedAt: '2024-01-16'
    },
    {
      id: 'part_009',
      type: 'part',
      name: '驱动电机',
      partNumber: 'DM-TRAC-009',
      description: '高性能永磁同步驱动电机，提供强劲动力和高效能。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '驱动系统',
      brand: '汇川技术',
      vehicleModels: ['通用适配'],
      quality: 'original',
      inStock: true,
      stockQuantity: 30,
      minOrderQuantity: 1,
      supplierId: 'supplier_inovance',
      supplierName: '汇川技术授权经销商',
      location: '中国深圳',
      shippingInfo: '5天内发货',
      warranty: '3年或10万公里',
      specifications: {
        '电机类型': '永磁同步电机',
        '额定功率': '150kW',
        '峰值功率': '200kW',
        '额定转矩': '300N·m',
        '最高转速': '12000rpm',
        '效率': '≥90%'
      },
      createdAt: '2024-01-13',
      updatedAt: '2024-01-20'
    },
    // 新增零件数据
    {
      id: 'part_010',
      type: 'part',
      name: '车载逆变器',
      partNumber: 'INV-220V-010',
      description: '纯正弦波车载逆变器，将直流电转换为220V交流电，适用于各种车载电器设备。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '电气系统',
      brand: '华为',
      vehicleModels: ['通用适配'],
      quality: 'original',
      inStock: true,
      stockQuantity: 95,
      minOrderQuantity: 1,
      supplierId: 'supplier_huawei',
      supplierName: '华为技术有限公司',
      location: '中国深圳',
      shippingInfo: '24小时内发货',
      warranty: '2年',
      specifications: {
        '输入电压': '12V/24V/48V DC',
        '输出电压': '220V ±5% AC',
        '额定功率': '2000W',
        '峰值功率': '4000W',
        '转换效率': '≥90%',
        '波形类型': '纯正弦波',
        '保护功能': '过载、过温、短路保护'
      },
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22'
    },
    {
      id: 'part_011',
      type: 'part',
      name: '动力电池包',
      partNumber: 'BAT-LFP-011',
      description: '磷酸铁锂动力电池包，高能量密度，长循环寿命，安全可靠。',
      images: ['https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop&crop=center'],
      category: '电池系统',
      brand: '国轩高科',
      vehicleModels: ['通用适配'],
      quality: 'oem',
      inStock: true,
      stockQuantity: 42,
      minOrderQuantity: 1,
      supplierId: 'supplier_gotion',
      supplierName: '国轩高科股份有限公司',
      location: '中国安徽',
      shippingInfo: '72小时内发货',
      warranty: '8年或12万公里',
      specifications: {
        '电池类型': '磷酸铁锂',
        '标称电压': '320V',
        '标称容量': '100Ah',
        '能量容量': '32kWh',
        '循环寿命': '≥6000次',
        '工作温度': '-20°C 至 60°C',
        '防护等级': 'IP67'
      },
      createdAt: '2024-01-23',
      updatedAt: '2024-01-23'
    },
    {
      id: 'part_012',
      type: 'part',
      name: '车载充电枪',
      partNumber: 'CHG-GUN-012',
      description: '国标充电枪，支持单相220V交流充电，安全可靠，操作简便。',
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center'],
      category: '充电系统',
      brand: '星星充电',
      vehicleModels: ['国标车型通用'],
      quality: 'original',
      inStock: true,
      stockQuantity: 280,
      minOrderQuantity: 5,
      supplierId: 'supplier_xingxing',
      supplierName: '星星充电科技有限公司',
      location: '中国江苏',
      shippingInfo: '24小时内发货',
      warranty: '1年',
      specifications: {
        '充电标准': 'GB/T 20234.2-2015',
        '额定电压': '250V',
        '额定电流': '32A',
        '最大功率': '7kW',
        '线缆长度': '5m',
        '防护等级': 'IP54',
        '工作温度': '-30°C 至 50°C'
      },
      createdAt: '2024-01-24',
      updatedAt: '2024-01-24'
    }
  ];

  // 汽车产品数据
  private vehicles: Vehicle[] = [
    {
      id: 'vehicle_001',
      type: 'vehicle',
      name: 'Tesla Model 3',
      description: '特斯拉Model 3，智能电动轿车，续航里程长，性能卓越。',
      images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop&crop=center'],
      category: '轿车',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 60,
      range: 556,
      color: '珍珠白',
      inStock: true,
      stockQuantity: 5,
      minOrderQuantity: 1,
      supplierId: 'supplier_tesla',
      supplierName: '特斯拉中国',
      location: '中国上海',
      shippingInfo: '现车供应',
      warranty: '4年或8万公里',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 'vehicle_002',
      type: 'vehicle',
      name: '比亚迪汉EV',
      description: '比亚迪汉EV，豪华电动轿车，刀片电池技术，安全可靠。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: '轿车',
      brand: '比亚迪',
      model: '汉EV',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 76.9,
      range: 605,
      color: '汉宫红',
      inStock: true,
      stockQuantity: 8,
      minOrderQuantity: 1,
      supplierId: 'supplier_byd',
      supplierName: '比亚迪销售公司',
      location: '中国深圳',
      shippingInfo: '现车供应',
      warranty: '6年或15万公里',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18'
    },
    {
      id: 'vehicle_003',
      type: 'vehicle',
      name: '蔚来ET7',
      description: '蔚来ET7，智能电动旗舰轿车，搭载150kWh固态电池。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: '轿车',
      brand: '蔚来',
      model: 'ET7',
      year: 2022,
      mileage: 15000,
      vehicleType: 'used',
      fuelType: 'electric',
      batteryCapacity: 100,
      range: 675,
      color: '云白',
      condition: '准新车',
      vin: 'LBV2Y3C09KMJ23456',
      inStock: true,
      stockQuantity: 2,
      minOrderQuantity: 1,
      supplierId: 'supplier_nio',
      supplierName: '蔚来二手车中心',
      location: '中国杭州',
      shippingInfo: '可过户',
      warranty: '1年或2万公里',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-17'
    },
    {
      id: 'vehicle_004',
      type: 'vehicle',
      name: '小鹏P7',
      description: '小鹏P7，智能轿跑，XPILOT 3.0自动驾驶系统。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: '轿跑',
      brand: '小鹏',
      model: 'P7',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 80.9,
      range: 706,
      color: '天青绿',
      inStock: false,
      stockQuantity: 0,
      minOrderQuantity: 1,
      supplierId: 'supplier_xpeng',
      supplierName: '小鹏汽车',
      location: '中国广州',
      shippingInfo: '预定中',
      warranty: '5年或10万公里',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15'
    },
    {
      id: 'vehicle_005',
      type: 'vehicle',
      name: '理想L9',
      description: '理想L9，家庭智能旗舰SUV，六座大空间，增程式电动。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: 'SUV',
      brand: '理想',
      model: 'L9',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'hybrid',
      batteryCapacity: 44.5,
      range: 1315,
      color: '星银',
      inStock: true,
      stockQuantity: 3,
      minOrderQuantity: 1,
      supplierId: 'supplier_li',
      supplierName: '理想汽车',
      location: '中国常州',
      shippingInfo: '现车供应',
      warranty: '5年或10万公里',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-19'
    },
    {
      id: 'vehicle_006',
      type: 'vehicle',
      name: '极氪001',
      description: '极氪001，豪华猎装轿跑，高性能电动，猎装造型。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: '猎装车',
      brand: '极氪',
      model: '001',
      year: 2022,
      mileage: 22000,
      vehicleType: 'used',
      fuelType: 'electric',
      batteryCapacity: 100,
      range: 660,
      color: '极境蓝',
      condition: '良好',
      vin: 'ZK001234567890123',
      inStock: true,
      stockQuantity: 1,
      minOrderQuantity: 1,
      supplierId: 'supplier_zeekr',
      supplierName: '极氪二手车',
      location: '中国宁波',
      shippingInfo: '可过户',
      warranty: '1年或2万公里',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-16'
    },
    {
      id: 'vehicle_007',
      type: 'vehicle',
      name: '哪吒GT',
      description: '哪吒GT，纯电跑车，动感设计，极致性能。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: '跑车',
      brand: '哪吒',
      model: 'GT',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 93.6,
      range: 571,
      color: '暗夜紫',
      inStock: true,
      stockQuantity: 4,
      minOrderQuantity: 1,
      supplierId: 'supplier_neta',
      supplierName: '哪吒汽车',
      location: '中国合肥',
      shippingInfo: '现车供应',
      warranty: '3年或6万公里',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-18'
    },
    {
      id: 'vehicle_008',
      type: 'vehicle',
      name: '红旗E-HS9',
      description: '红旗E-HS9，豪华纯电动大型SUV，旗舰车型。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: 'SUV',
      brand: '红旗',
      model: 'E-HS9',
      year: 2021,
      mileage: 35000,
      vehicleType: 'used',
      fuelType: 'electric',
      batteryCapacity: 99,
      range: 465,
      color: '高山莹白',
      condition: '良好',
      vin: 'LFPHZ3DJ9M1A23456',
      inStock: true,
      stockQuantity: 1,
      minOrderQuantity: 1,
      supplierId: 'supplier_hongqi',
      supplierName: '红旗二手车',
      location: '中国长春',
      shippingInfo: '可过户',
      warranty: '1年或2万公里',
      createdAt: '2024-01-09',
      updatedAt: '2024-01-15'
    },
    // 新增汽车数据
    {
      id: 'vehicle_009',
      type: 'vehicle',
      name: '宝马iX3',
      description: '宝马iX3，豪华纯电动SUV，宝马电动化技术的代表作。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: 'SUV',
      brand: '宝马',
      model: 'iX3',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 74,
      range: 460,
      color: '宝石青',
      inStock: true,
      stockQuantity: 6,
      minOrderQuantity: 1,
      supplierId: 'supplier_bmw',
      supplierName: '宝马中国',
      location: '中国北京',
      shippingInfo: '现车供应',
      warranty: '3年或10万公里',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    },
    {
      id: 'vehicle_010',
      type: 'vehicle',
      name: '奥迪e-tron',
      description: '奥迪e-tron，豪华电动SUV，quattro电动四驱系统。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: 'SUV',
      brand: '奥迪',
      model: 'e-tron',
      year: 2022,
      mileage: 28000,
      vehicleType: 'used',
      fuelType: 'electric',
      batteryCapacity: 95,
      range: 430,
      color: '冰川白',
      condition: '良好',
      vin: 'WAUZZZ8T1M1A23456',
      inStock: true,
      stockQuantity: 2,
      minOrderQuantity: 1,
      supplierId: 'supplier_audi',
      supplierName: '奥迪二手车中心',
      location: '中国上海',
      shippingInfo: '可过户',
      warranty: '1年或2万公里',
      createdAt: '2024-01-26',
      updatedAt: '2024-01-26'
    },
    {
      id: 'vehicle_011',
      type: 'vehicle',
      name: '奔驰EQC',
      description: '奔驰EQC，豪华电动SUV，奔驰电动化战略的首款车型。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: 'SUV',
      brand: '奔驰',
      model: 'EQC',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 80,
      range: 450,
      color: '曜岩黑',
      inStock: true,
      stockQuantity: 5,
      minOrderQuantity: 1,
      supplierId: 'supplier_benz',
      supplierName: '奔驰中国',
      location: '中国广州',
      shippingInfo: '现车供应',
      warranty: '3年或10万公里',
      createdAt: '2024-01-27',
      updatedAt: '2024-01-27'
    },
    {
      id: 'vehicle_012',
      type: 'vehicle',
      name: '大众ID.4',
      description: '大众ID.4，纯电动紧凑型SUV，MEB平台打造。',
      images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop&crop=center'],
      category: 'SUV',
      brand: '大众',
      model: 'ID.4',
      year: 2023,
      vehicleType: 'new',
      fuelType: 'electric',
      batteryCapacity: 82,
      range: 520,
      color: '星际蓝',
      inStock: true,
      stockQuantity: 12,
      minOrderQuantity: 1,
      supplierId: 'supplier_vw',
      supplierName: '大众中国',
      location: '中国佛山',
      shippingInfo: '现车供应',
      warranty: '3年或10万公里',
      createdAt: '2024-01-28',
      updatedAt: '2024-01-28'
    }
  ];

  // 库存数据
  private inventory: ProductInventory[] = [
    {
      productId: 'part_001',
      currentStock: 50,
      reservedStock: 5,
      availableStock: 45,
      lastUpdated: '2024-01-20',
      lowStockAlert: false,
      reorderPoint: 10
    },
    {
      productId: 'part_002',
      currentStock: 120,
      reservedStock: 20,
      availableStock: 100,
      lastUpdated: '2024-01-18',
      lowStockAlert: false,
      reorderPoint: 30
    },
    {
      productId: 'part_003',
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      lastUpdated: '2024-01-15',
      lowStockAlert: true,
      reorderPoint: 5
    },
    {
      productId: 'part_004',
      currentStock: 85,
      reservedStock: 10,
      availableStock: 75,
      lastUpdated: '2024-01-19',
      lowStockAlert: false,
      reorderPoint: 20
    },
    {
      productId: 'vehicle_001',
      currentStock: 5,
      reservedStock: 1,
      availableStock: 4,
      lastUpdated: '2024-01-20',
      lowStockAlert: false,
      reorderPoint: 1
    },
    {
      productId: 'vehicle_002',
      currentStock: 8,
      reservedStock: 2,
      availableStock: 6,
      lastUpdated: '2024-01-18',
      lowStockAlert: false,
      reorderPoint: 2
    },
    // 新增库存数据
    {
      productId: 'part_010',
      currentStock: 95,
      reservedStock: 10,
      availableStock: 85,
      lastUpdated: '2024-01-22',
      lowStockAlert: false,
      reorderPoint: 20
    },
    {
      productId: 'part_011',
      currentStock: 42,
      reservedStock: 5,
      availableStock: 37,
      lastUpdated: '2024-01-23',
      lowStockAlert: false,
      reorderPoint: 10
    },
    {
      productId: 'part_012',
      currentStock: 280,
      reservedStock: 30,
      availableStock: 250,
      lastUpdated: '2024-01-24',
      lowStockAlert: false,
      reorderPoint: 50
    },
    {
      productId: 'vehicle_009',
      currentStock: 6,
      reservedStock: 1,
      availableStock: 5,
      lastUpdated: '2024-01-25',
      lowStockAlert: false,
      reorderPoint: 1
    },
    {
      productId: 'vehicle_010',
      currentStock: 2,
      reservedStock: 0,
      availableStock: 2,
      lastUpdated: '2024-01-26',
      lowStockAlert: false,
      reorderPoint: 1
    },
    {
      productId: 'vehicle_011',
      currentStock: 5,
      reservedStock: 1,
      availableStock: 4,
      lastUpdated: '2024-01-27',
      lowStockAlert: false,
      reorderPoint: 1
    },
    {
      productId: 'vehicle_012',
      currentStock: 12,
      reservedStock: 2,
      availableStock: 10,
      lastUpdated: '2024-01-28',
      lowStockAlert: false,
      reorderPoint: 2
    }
  ];

  // 获取所有零件
  getParts(): Part[] {
    return [...this.parts];
  }

  // 根据ID获取零件
  getPartById(id: string): Part | undefined {
    return this.parts.find(part => part.id === id);
  }

  // 获取所有车辆
  getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  // 根据ID获取车辆
  getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  // 根据类型获取产品
  getProductsByType(type: 'part' | 'vehicle'): (Part | Vehicle)[] {
    if (type === 'part') {
      return this.getParts();
    } else {
      return this.getVehicles();
    }
  }

  // 搜索产品
  searchProducts(query: string, type?: 'part' | 'vehicle'): (Part | Vehicle)[] {
    const allProducts = type 
      ? this.getProductsByType(type)
      : [...this.parts, ...this.vehicles];
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      (product.type === 'part' && (product as Part).partNumber.toLowerCase().includes(query.toLowerCase())) ||
      (product.type === 'vehicle' && (product as Vehicle).model.toLowerCase().includes(query.toLowerCase()))
    );
  }

  // 根据品牌筛选
  filterByBrand(brand: string, type?: 'part' | 'vehicle'): (Part | Vehicle)[] {
    const allProducts = type 
      ? this.getProductsByType(type)
      : [...this.parts, ...this.vehicles];
    
    return allProducts.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
  }

  // 根据价格范围筛选
  filterByPriceRange(minPrice: number, maxPrice: number, type?: 'part' | 'vehicle'): (Part | Vehicle)[] {
    const allProducts = type 
      ? this.getProductsByType(type)
      : [...this.parts, ...this.vehicles];
    
    // 简化实现，实际项目中应该根据产品类型有不同的价格字段
    return allProducts.filter(product => {
      // 这里简化处理，实际应该根据产品类型确定价格字段
      return true;
    });
  }

  // 获取库存信息
  getInventory(productId: string): ProductInventory | undefined {
    return this.inventory.find(item => item.productId === productId);
  }

  // 检查库存是否充足
  isProductInStock(productId: string, quantity: number = 1): boolean {
    const inventory = this.getInventory(productId);
    return inventory ? inventory.availableStock >= quantity : false;
  }

  // 减少库存（下单时调用）
  reduceStock(productId: string, quantity: number): boolean {
    const inventory = this.inventory.find(item => item.productId === productId);
    if (inventory && inventory.availableStock >= quantity) {
      inventory.availableStock -= quantity;
      inventory.reservedStock += quantity;
      inventory.lastUpdated = new Date().toISOString().split('T')[0];
      
      // 检查是否需要触发低库存警报
      if (inventory.availableStock <= inventory.reorderPoint) {
        inventory.lowStockAlert = true;
      }
      
      return true;
    }
    return false;
  }

  // 增加库存（取消订单或退货时调用）
  increaseStock(productId: string, quantity: number): void {
    const inventory = this.inventory.find(item => item.productId === productId);
    if (inventory) {
      inventory.availableStock += quantity;
      inventory.reservedStock = Math.max(0, inventory.reservedStock - quantity);
      inventory.lastUpdated = new Date().toISOString().split('T')[0];
      
      // 取消低库存警报
      if (inventory.availableStock > inventory.reorderPoint) {
        inventory.lowStockAlert = false;
      }
    }
  }

  // 获取低库存产品
  getLowStockProducts(): ProductInventory[] {
    return this.inventory.filter(item => item.lowStockAlert);
  }

  // 获取热门产品（模拟）
  getPopularProducts(limit: number = 8): (Part | Vehicle)[] {
    // 简化实现，返回前N个产品
    const allProducts = [...this.parts, ...this.vehicles];
    return allProducts.slice(0, Math.min(limit, allProducts.length));
  }

  // 获取新品（模拟）
  getNewProducts(limit: number = 8): (Part | Vehicle)[] {
    // 简化实现，返回最近添加的产品
    const allProducts = [...this.parts, ...this.vehicles];
    return allProducts.slice(0, Math.min(limit, allProducts.length));
  }
}

// 创建全局产品管理实例
export const productManager = new ProductManager();