
export enum OrderStatus {
  Pending = 'Pending',       // 未下单/待提交
  Submitted = 'Submitted',   // 已下单/待审核
  Auditing = 'Auditing',     // 审核中
  Approved = 'Approved',     // 已审核
  Rejected = 'Rejected'      // 已退回
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'auditor' | 'viewer';
  avatar: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
  code: string;
  level: 1 | 2;
  parentId?: string;
  productCount: number;
  status: 'active' | 'inactive';
  sort: number;
  imageUrl?: string;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  spec: string; // e.g., "500g/bag"
  unit: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  minOrder: number;
  maxOrder: number;
  stock: number;
}

export interface Store {
  id: string;
  name: string;
  region: string; // A区, B区
  managerName: string;
  managerPhone: string;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
}

export interface OrderItem {
  productId: string;
  productName: string;
  spec: string;
  unit: string;
  quantityOrdered: number;
  quantityApproved?: number;
  price: number;
  remark?: string; // Audit remark
}

export interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  user?: string;
  status?: 'completed' | 'processing' | 'pending';
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  storeRegion: string;
  status: OrderStatus;
  orderDate: string;
  itemCount: number; // Distinct items
  totalQuantity: number; // Sum of quantities
  auditorName?: string;
  items: OrderItem[];
  timeline?: TimelineEvent[];
}

export interface DashboardStats {
  totalStores: number;
  orderedStores: number;
  notOrderedStores: number;
  totalItemsOrdered: number;
  totalSKUs: number;
}

export interface SummaryStats {
  totalAmount: number;
  totalItems: number;
  productTypes: number;
  orderedStoreCount: number;
  trendData: { date: string; value: number }[];
  categoryData: { name: string; value: number }[];
  productDetails: { name: string; category: string; quantity: number; storeCount: number; amount: number }[];
  storeDetails: { name: string; region: string; itemCount: number; totalQty: number; totalAmount: number }[];
}
