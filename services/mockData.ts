

import { Order, OrderStatus, Product, Store, DashboardStats, User, SummaryStats, Category } from '../types';

export const MOCK_USER = {
  id: 'u1',
  name: '系统管理员',
  role: 'admin' as const,
  avatar: 'https://picsum.photos/id/64/200/200',
  phone: '13800000000',
  status: 'active' as const
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  { id: 'u2', name: '张审核', role: 'auditor', avatar: 'https://picsum.photos/id/1005/200/200', phone: '13911112222', status: 'active' },
  { id: 'u3', name: '李查看', role: 'viewer', avatar: 'https://picsum.photos/id/1027/200/200', phone: '13733334444', status: 'active' },
  { id: 'u4', name: '王采购', role: 'auditor', avatar: 'https://picsum.photos/id/1011/200/200', phone: '13655556666', status: 'inactive' },
];

export const MOCK_STATS: DashboardStats = {
  totalStores: 128,
  orderedStores: 120,
  notOrderedStores: 8,
  totalItemsOrdered: 4500, // Updated for larger units
  totalSKUs: 89,
};

export const MOCK_STORES: Store[] = [
  { id: 's1', name: '五华区南屏街店', region: '五华区', managerName: '王经理', managerPhone: '138****8888', status: 'active', lastOrderDate: '2023-11-26' },
  { id: 's2', name: '盘龙区北京路店', region: '盘龙区', managerName: '李经理', managerPhone: '139****9999', status: 'active', lastOrderDate: '2023-11-25' },
  { id: 's3', name: '官渡区世纪城店', region: '官渡区', managerName: '张经理', managerPhone: '137****7777', status: 'active', lastOrderDate: '2023-11-26' },
  { id: 's4', name: '西山区万达店', region: '西山区', managerName: '赵经理', managerPhone: '136****6666', status: 'active', lastOrderDate: '2023-11-26' },
  { id: 's5', name: '呈贡区大学城店', region: '呈贡区', managerName: '刘经理', managerPhone: '135****5555', status: 'active', lastOrderDate: '2023-11-26' },
];

// Product Units updated to B2B standards (Box, Case, Pack)
export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: '有机生菜', category: '叶菜类', spec: '5kg/箱', unit: '箱', price: 45.0, imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 2, maxOrder: 50, stock: 500 },
  { id: 'p2', name: '红熟番茄', category: '根茎类', spec: '15kg/筐', unit: '筐', price: 68.0, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 1, maxOrder: 20, stock: 200 },
  { id: 'p3', name: '本地黄瓜', category: '根茎类', spec: '10kg/袋', unit: '袋', price: 35.0, imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 2, maxOrder: 30, stock: 1000 },
  { id: 'p4', name: '黄心土豆', category: '根茎类', spec: '25kg/袋', unit: '袋', price: 42.0, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 1, maxOrder: 20, stock: 50 },
  { id: 'p5', name: '水豆腐', category: '豆类', spec: '12盒/板', unit: '板', price: 24.0, imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 5, maxOrder: 100, stock: 100 },
  { id: 'p6', name: '精选五花肉', category: '肉类', spec: '2.5kg/条', unit: '条', price: 85.0, imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 2, maxOrder: 50, stock: 100 },
  { id: 'p7', name: '冷冻鸡胸肉', category: '肉类', spec: '10kg/箱', unit: '箱', price: 120.0, imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 1, maxOrder: 20, stock: 300 },
  { id: 'p8', name: '鲜活基围虾', category: '海鲜类', spec: '5kg/箱', unit: '箱', price: 280.0, imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=300&q=80', isActive: false, minOrder: 1, maxOrder: 5, stock: 0 },
  { id: 'p9', name: '小黄姜', category: '调味类', spec: '2kg/网袋', unit: '袋', price: 18.0, imageUrl: 'https://images.unsplash.com/photo-1635313175865-c8e4f55a7322?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 2, maxOrder: 50, stock: 150 },
  { id: 'p10', name: '独头蒜', category: '调味类', spec: '5kg/袋', unit: '袋', price: 55.0, imageUrl: 'https://images.unsplash.com/photo-1606521820421-3b7c8c368625?auto=format&fit=crop&w=300&q=80', isActive: true, minOrder: 1, maxOrder: 30, stock: 200 },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1', name: '新鲜蔬菜', code: 'C01', level: 1, productCount: 45, status: 'active', sort: 1,
    children: [
      { id: 'c1-1', name: '叶菜类', code: 'C0101', level: 2, parentId: 'c1', productCount: 20, status: 'active', sort: 1 },
      { id: 'c1-2', name: '根茎类', code: 'C0102', level: 2, parentId: 'c1', productCount: 15, status: 'active', sort: 2 },
      { id: 'c1-3', name: '菌菇类', code: 'C0103', level: 2, parentId: 'c1', productCount: 10, status: 'active', sort: 3 },
    ]
  },
  {
    id: 'c2', name: '肉禽蛋品', code: 'C02', level: 1, productCount: 30, status: 'active', sort: 2,
    children: [
      { id: 'c2-1', name: '猪肉', code: 'C0201', level: 2, parentId: 'c2', productCount: 12, status: 'active', sort: 1 },
      { id: 'c2-2', name: '禽肉', code: 'C0202', level: 2, parentId: 'c2', productCount: 10, status: 'active', sort: 2 },
      { id: 'c2-3', name: '蛋类', code: 'C0203', level: 2, parentId: 'c2', productCount: 8, status: 'active', sort: 3 },
    ]
  },
  {
    id: 'c3', name: '海鲜水产', code: 'C03', level: 1, productCount: 18, status: 'active', sort: 3,
    children: [
      { id: 'c3-1', name: '鱼类', code: 'C0301', level: 2, parentId: 'c3', productCount: 10, status: 'active', sort: 1 },
      { id: 'c3-2', name: '虾蟹', code: 'C0302', level: 2, parentId: 'c3', productCount: 8, status: 'active', sort: 2 },
    ]
  },
  {
    id: 'c4', name: '调味干货', code: 'C04', level: 1, productCount: 25, status: 'active', sort: 4,
    children: [
      { id: 'c4-1', name: '调味品', code: 'C0401', level: 2, parentId: 'c4', productCount: 15, status: 'active', sort: 1 },
      { id: 'c4-2', name: '干货', code: 'C0402', level: 2, parentId: 'c4', productCount: 10, status: 'active', sort: 2 },
    ]
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'O2023112601',
    storeId: 's1',
    storeName: '五华区南屏街店',
    storeRegion: '五华区',
    status: OrderStatus.Approved,
    orderDate: '2023-11-26 09:30',
    itemCount: 2,
    totalQuantity: 28,
    auditorName: '张审核',
    items: [
      { productId: 'p1', productName: '有机生菜', spec: '5kg/箱', unit: '箱', quantityOrdered: 20, quantityApproved: 20, price: 45.0 },
      { productId: 'p2', productName: '红熟番茄', spec: '15kg/筐', unit: '筐', quantityOrdered: 10, quantityApproved: 8, price: 68.0, remark: '库存紧张，减少2筐' },
    ],
    timeline: [
      { time: '2023-11-26 09:30', title: '订单已提交', user: '王经理', status: 'completed' },
      { time: '2023-11-26 09:45', title: '审核员接单', user: '张审核', status: 'completed' },
      { time: '2023-11-26 10:00', title: '订单审核通过', description: '调整了部分商品数量', user: '张审核', status: 'completed' },
    ]
  },
  {
    id: 'O2023112602',
    storeId: 's2',
    storeName: '盘龙区北京路店',
    storeRegion: '盘龙区',
    status: OrderStatus.Auditing,
    orderDate: '2023-11-26 10:15',
    itemCount: 3,
    totalQuantity: 45,
    auditorName: '张审核',
    items: [
      { productId: 'p3', productName: '本地黄瓜', spec: '10kg/袋', unit: '袋', quantityOrdered: 15, price: 35.0 },
      { productId: 'p1', productName: '有机生菜', spec: '5kg/箱', unit: '箱', quantityOrdered: 10, price: 45.0 },
      { productId: 'p5', productName: '水豆腐', spec: '12盒/板', unit: '板', quantityOrdered: 20, price: 24.0 }
    ],
    timeline: [
      { time: '2023-11-26 10:15', title: '订单已提交', user: '李经理', status: 'completed' },
      { time: '2023-11-26 10:30', title: '正在审核中', user: '张审核', status: 'processing' },
    ]
  },
  {
    id: 'O2023112603',
    storeId: 's4',
    storeName: '西山区万达店',
    storeRegion: '西山区',
    status: OrderStatus.Submitted,
    orderDate: '2023-11-26 11:00',
    itemCount: 2,
    totalQuantity: 25,
    items: [
      { productId: 'p5', productName: '水豆腐', spec: '12盒/板', unit: '板', quantityOrdered: 10, price: 24.0 },
      { productId: 'p7', productName: '冷冻鸡胸肉', spec: '10kg/箱', unit: '箱', quantityOrdered: 15, price: 120.0 }
    ],
    timeline: [
      { time: '2023-11-26 11:00', title: '订单已提交', user: '赵经理', status: 'completed' },
      { time: '2023-11-26 11:00', title: '等待审核', status: 'pending' },
    ]
  },
  {
    id: 'O2023112604',
    storeId: 's5',
    storeName: '呈贡区大学城店',
    storeRegion: '呈贡区',
    status: OrderStatus.Submitted,
    orderDate: '2023-11-26 11:15',
    itemCount: 4,
    totalQuantity: 60,
    items: [
       { productId: 'p9', productName: '小黄姜', spec: '2kg/网袋', unit: '袋', quantityOrdered: 20, price: 18.0 },
       { productId: 'p10', productName: '独头蒜', spec: '5kg/袋', unit: '袋', quantityOrdered: 20, price: 55.0 },
       { productId: 'p3', productName: '本地黄瓜', spec: '10kg/袋', unit: '袋', quantityOrdered: 10, price: 35.0 },
       { productId: 'p4', productName: '黄心土豆', spec: '25kg/袋', unit: '袋', quantityOrdered: 10, price: 42.0 },
    ],
    timeline: [
      { time: '2023-11-26 11:15', title: '订单已提交', user: '刘经理', status: 'completed' },
      { time: '2023-11-26 11:15', title: '等待审核', status: 'pending' },
    ]
  }
];

// Data for charts
export const CHART_DATA_TREND = [
  { date: '11-20', orders: 110, amount: 25400 },
  { date: '11-21', orders: 115, amount: 28200 },
  { date: '11-22', orders: 108, amount: 24100 },
  { date: '11-23', orders: 125, amount: 31500 },
  { date: '11-24', orders: 130, amount: 34100 },
  { date: '11-25', orders: 128, amount: 32900 },
  { date: '11-26', orders: 120, amount: 30200 },
];

export const CHART_DATA_PRODUCTS = [
  { name: '有机生菜', value: 150 },
  { name: '红熟番茄', value: 120 },
  { name: '精选五花肉', value: 80 },
  { name: '本地黄瓜', value: 95 },
  { name: '冷冻鸡胸肉', value: 60 },
];

export const MOCK_SUMMARY_STATS: SummaryStats = {
  totalAmount: 152315,
  totalItems: 4200,
  productTypes: 9,
  orderedStoreCount: 6,
  trendData: [
    { date: '11/26', value: 24000 },
    { date: '11/27', value: 26000 },
    { date: '11/28', value: 25000 },
    { date: '11/29', value: 31000 },
    { date: '11/30', value: 29000 },
    { date: '12/01', value: 35000 },
    { date: '12/02', value: 152315 },
  ],
  categoryData: [
    { name: '叶菜类', value: 38250 },
    { name: '根茎类', value: 41880 },
    { name: '豆类', value: 12000 },
    { name: '肉类', value: 50250 },
    { name: '调味类', value: 9360 },
  ],
  productDetails: [
    { name: '有机生菜', category: '叶菜类', quantity: 150, storeCount: 36, amount: 6750 },
    { name: '红熟番茄', category: '根茎类', quantity: 120, storeCount: 35, amount: 8160 },
    { name: '本地黄瓜', category: '根茎类', quantity: 140, storeCount: 38, amount: 4900 },
    { name: '黄心土豆', category: '根茎类', quantity: 80, storeCount: 30, amount: 3360 },
    { name: '水豆腐', category: '豆类', quantity: 200, storeCount: 40, amount: 4800 },
    { name: '精选五花肉', category: '肉类', quantity: 50, storeCount: 25, amount: 4250 },
    { name: '冷冻鸡胸肉', category: '肉类', quantity: 60, storeCount: 28, amount: 7200 },
    { name: '小黄姜', category: '调味类', quantity: 80, storeCount: 32, amount: 1440 },
    { name: '独头蒜', category: '调味类', quantity: 60, storeCount: 30, amount: 3300 },
  ],
  storeDetails: [
    { name: '五华区南屏街店', region: '五华区', itemCount: 12, totalQty: 45, totalAmount: 3200 },
    { name: '盘龙区北京路店', region: '盘龙区', itemCount: 10, totalQty: 38, totalAmount: 2500 },
    { name: '官渡区世纪城店', region: '官渡区', itemCount: 15, totalQty: 52, totalAmount: 4100 },
    { name: '西山区万达店', region: '西山区', itemCount: 8, totalQty: 25, totalAmount: 1800 },
    { name: '呈贡区大学城店', region: '呈贡区', itemCount: 11, totalQty: 40, totalAmount: 2800 },
  ]
};
