
import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, 
  CheckSquare, 
  User, 
  Search, 
  ChevronRight,
  Filter,
  Check,
  X,
  Home,
  ShoppingBag,
  Calendar,
  Download,
  Box,
  Store,
  ArrowRight,
  FileText,
  AlertCircle,
  RefreshCw,
  Clock,
  Building2,
  MapPin,
  Users,
  Award,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '../../services/mockData';
import { Order, OrderStatus } from '../../types';

const ProcurementApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'order' | 'purchase' | 'profile'>('home');
  const [orderTab, setOrderTab] = useState<OrderStatus | 'All'>('All');
  const [purchaseView, setPurchaseView] = useState<'product' | 'store'>('product');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Stats Calculation
  const stats = {
    pending: MOCK_ORDERS.filter(o => o.status === OrderStatus.Submitted).length,
    auditing: MOCK_ORDERS.filter(o => o.status === OrderStatus.Auditing).length,
    approved: MOCK_ORDERS.filter(o => o.status === OrderStatus.Approved).length,
    notOrdered: 3, // Mock data
  };

  const dailySummary = {
    totalItems: MOCK_ORDERS.reduce((acc, order) => acc + order.totalQuantity, 0),
    storeCount: MOCK_ORDERS.length,
    rate: '85%'
  };

  // Helper to get product image
  const getProductImage = (productId: string) => {
    return MOCK_PRODUCTS.find(p => p.id === productId)?.imageUrl || '';
  };
  
  const getProductCategory = (productId: string) => {
    return MOCK_PRODUCTS.find(p => p.id === productId)?.category || '其他';
  };

  // Aggregation for Purchase Tab
  const purchaseSummary = useMemo(() => {
    const productMap = new Map<string, { id: string, name: string, category: string, totalQty: number, storeCount: number, image: string }>();
    
    MOCK_ORDERS.forEach(order => {
        order.items.forEach(item => {
            if (!productMap.has(item.productId)) {
                productMap.set(item.productId, {
                    id: item.productId,
                    name: item.productName,
                    category: getProductCategory(item.productId),
                    totalQty: 0,
                    storeCount: 0,
                    image: getProductImage(item.productId)
                });
            }
            const entry = productMap.get(item.productId)!;
            entry.totalQty += (item.quantityApproved ?? item.quantityOrdered);
            entry.storeCount += 1; 
        });
    });
    return Array.from(productMap.values());
  }, []);

  const renderHome = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto custom-scrollbar pb-20">
      {/* Immersive Green Header */}
      <div className="bg-gradient-to-b from-green-500 to-green-600 pt-14 pb-24 px-6 relative">
        <div className="flex justify-between items-center text-white mb-6">
           <div>
             <h1 className="text-2xl font-bold tracking-tight">采购工作台</h1>
             <p className="text-green-100 text-sm mt-1 flex items-center gap-1 opacity-90">
               <span className="w-1.5 h-1.5 bg-green-200 rounded-full animate-pulse"></span>
               云南昆明区域 · 今日概览
             </p>
           </div>
           <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/30 font-medium shadow-sm">
              审核员
           </div>
        </div>
        
        {/* Abstract Pattern */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      </div>

      {/* Stats Cards - Floating overlapping header */}
      <div className="px-4 -mt-16 relative z-10 space-y-4">
         {/* Key Stats Grid */}
         <div className="bg-white rounded-2xl shadow-xl shadow-green-900/5 p-5 grid grid-cols-4 gap-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl active:bg-gray-50 transition-colors cursor-pointer" onClick={() => { setActiveTab('order'); setOrderTab(OrderStatus.Submitted); }}>
               <div className="relative">
                 <span className="text-2xl font-bold text-gray-800 font-sans">{stats.pending}</span>
                 {stats.pending > 0 && <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>}
               </div>
               <span className="text-xs text-gray-400 mt-1 font-medium">待审核</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl active:bg-gray-50 transition-colors cursor-pointer" onClick={() => { setActiveTab('order'); setOrderTab(OrderStatus.Auditing); }}>
               <span className="text-2xl font-bold text-gray-800 font-sans">{stats.auditing}</span>
               <span className="text-xs text-gray-400 mt-1 font-medium">审核中</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl active:bg-gray-50 transition-colors cursor-pointer" onClick={() => { setActiveTab('order'); setOrderTab(OrderStatus.Approved); }}>
               <span className="text-2xl font-bold text-gray-800 font-sans">{stats.approved}</span>
               <span className="text-xs text-gray-400 mt-1 font-medium">已审核</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded-xl active:bg-gray-50 transition-colors">
               <span className="text-2xl font-bold text-gray-400 font-sans">{stats.notOrdered}</span>
               <span className="text-xs text-gray-400 mt-1 font-medium">未下单</span>
            </div>
         </div>

         {/* Daily Auto Summary Card */}
         <div className="bg-white rounded-2xl shadow-sm p-0 overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                 <Box className="text-green-500" size={18} />
                 每日自动汇总
               </h3>
               <span className="text-xs font-mono text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">2024-11-26</span>
            </div>
            <div className="p-5 flex justify-between items-center">
               <div className="text-center flex-1 cursor-pointer" onClick={() => { setActiveTab('purchase'); setPurchaseView('product'); }}>
                  <div className="text-gray-900 text-2xl font-bold font-sans">{dailySummary.totalItems}</div>
                  <div className="text-xs text-gray-400 mt-1">商品总件数</div>
               </div>
               <div className="w-[1px] h-10 bg-gray-100"></div>
               <div className="text-center flex-1 cursor-pointer" onClick={() => { setActiveTab('purchase'); setPurchaseView('store'); }}>
                  <div className="text-gray-900 text-2xl font-bold font-sans">{dailySummary.storeCount}</div>
                  <div className="text-xs text-gray-400 mt-1">下单门店数</div>
               </div>
               <div className="w-[1px] h-10 bg-gray-100"></div>
               <div className="text-center flex-1">
                  <div className="text-green-500 text-2xl font-bold font-sans">{dailySummary.rate}</div>
                  <div className="text-xs text-gray-400 mt-1">审核进度</div>
               </div>
            </div>
         </div>

         {/* Quick Actions / Pending List */}
         <div className="flex justify-between items-center pt-2">
            <h3 className="font-bold text-gray-800 text-lg">待办事项</h3>
            <span onClick={() => { setActiveTab('order'); setOrderTab(OrderStatus.Submitted); }} className="text-xs text-gray-400 flex items-center gap-1 active:opacity-60">
              查看全部 <ChevronRight size={14} />
            </span>
         </div>

         <div className="space-y-3 pb-4">
            {MOCK_ORDERS.filter(o => o.status === OrderStatus.Submitted).slice(0, 3).map(order => (
               <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.99] transition-transform" onClick={() => setSelectedOrder(order)}>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                        <Store size={22} />
                     </div>
                     <div>
                        <div className="font-bold text-gray-800">{order.storeName}</div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">{order.totalQuantity}件商品 · ¥2580</div>
                     </div>
                  </div>
                  <button className="bg-green-500 text-white text-xs px-4 py-2 rounded-lg font-bold shadow-lg shadow-green-200">
                     审核
                  </button>
               </div>
            ))}
            {MOCK_ORDERS.filter(o => o.status === OrderStatus.Submitted).length === 0 && (
               <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-200">
                  <CheckSquare size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-400 text-sm">暂无待审核订单</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );

  const renderOrder = () => {
     let filteredOrders = MOCK_ORDERS;
     if (orderTab === OrderStatus.Submitted) filteredOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.Submitted);
     else if (orderTab === OrderStatus.Auditing) filteredOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.Auditing);
     else if (orderTab === OrderStatus.Approved) filteredOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.Approved);

     return (
        <div className="flex-1 bg-gray-50 overflow-y-auto custom-scrollbar pb-20 flex flex-col h-full">
           {/* Top Sticky Header */}
           <div className="bg-white sticky top-0 z-20">
              <div className="pt-12 pb-2 px-6">
                 <h2 className="text-2xl font-bold text-gray-900 tracking-tight">订单审核</h2>
              </div>
              
              {/* Minimalist Tabs */}
              <div className="flex items-center gap-6 px-6 pb-2">
                 {[
                   { id: OrderStatus.Submitted, label: '待审核', count: stats.pending },
                   { id: OrderStatus.Auditing, label: '审核中', count: stats.auditing },
                   { id: OrderStatus.Approved, label: '已审核', count: stats.approved },
                 ].map(tab => (
                   <button 
                      key={tab.id}
                      onClick={() => setOrderTab(tab.id as any)}
                      className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                        orderTab === tab.id 
                          ? 'text-gray-900' 
                          : 'text-gray-400'
                      }`}
                   >
                      <span className={orderTab === tab.id ? 'font-bold' : ''}>{tab.label}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                          orderTab === tab.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {tab.count}
                        </span>
                   </button>
                 ))}
              </div>

              {/* Search Box - Floating Style */}
              <div className="px-4 py-2 bg-gradient-to-b from-white to-gray-50">
                <div className="relative shadow-sm rounded-xl">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input 
                     type="text" 
                     placeholder="搜索门店名称或订单号" 
                     className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-green-500 transition-all placeholder:text-gray-400" 
                   />
                   <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} />
                </div>
              </div>
           </div>

           <div className="p-4 space-y-4">
              {filteredOrders.map(order => (
                 <div key={order.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 active:scale-[0.99] transition-transform" onClick={() => setSelectedOrder(order)}>
                    {/* Locking Mechanism Simulation */}
                    {order.status === OrderStatus.Auditing && (
                      <div className="flex items-center gap-2 mb-3 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium w-fit">
                        <User size={12} />
                        <span>张审核员 正在审核此订单...</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                             order.status === OrderStatus.Submitted ? 'bg-orange-50 text-orange-500' : 
                             order.status === OrderStatus.Auditing ? 'bg-blue-50 text-blue-500' : 
                             'bg-green-50 text-green-500'
                          }`}>
                             <Store size={20} />
                          </div>
                          <div>
                             <h3 className="font-bold text-gray-900 text-base">{order.storeName}</h3>
                             <p className="text-xs text-gray-400 mt-0.5 font-mono">{order.id.slice(-6)} · {order.orderDate.split(' ')[1]}</p>
                          </div>
                       </div>
                       
                       <div className={`text-xs px-2 py-1 rounded-md font-medium ${
                          order.status === OrderStatus.Submitted ? 'bg-orange-50 text-orange-600' : 
                          order.status === OrderStatus.Auditing ? 'bg-blue-50 text-blue-600' : 
                          'bg-green-50 text-green-600'
                       }`}>
                          {order.status === OrderStatus.Submitted ? '待审核' : order.status === OrderStatus.Auditing ? '审核中' : '已完成'}
                       </div>
                    </div>

                    <div className="bg-gray-50/80 rounded-xl p-3 flex divide-x divide-gray-200 mb-4">
                       <div className="flex-1 px-2 text-center">
                          <div className="text-xs text-gray-400 mb-1">订货数量</div>
                          <div className="text-sm font-bold text-gray-800">
                             {order.totalQuantity} <span className="text-xs font-normal text-gray-500">件</span>
                          </div>
                       </div>
                       <div className="flex-1 px-2 text-center">
                           <div className="text-xs text-gray-400 mb-1">商品种类</div>
                           <div className="text-sm font-bold text-gray-800">
                              {order.itemCount} <span className="text-xs font-normal text-gray-500">种</span>
                           </div>
                       </div>
                       <div className="flex-1 px-2 text-center">
                          <div className="text-xs text-gray-400 mb-1">预计金额</div>
                          <div className="text-sm font-bold text-gray-800">
                              ¥2,580
                          </div>
                       </div>
                    </div>
                    
                    {/* Approved Diff View */}
                    {order.status === OrderStatus.Approved && (
                      <div className="mb-4 px-3 py-2.5 bg-green-50/30 rounded-lg border border-green-100 text-xs text-gray-600 flex gap-2">
                         <CheckSquare size={14} className="text-green-600 mt-0.5 shrink-0" />
                         <div>
                            <span className="font-bold text-gray-800">审核备注：</span>
                            调整了部分叶菜的数量，库存紧张。
                         </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                       <button className="w-full bg-white border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                           查看审核详情 <ArrowRight size={14} className="text-gray-400" />
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
     );
  };

  const renderPurchase = () => (
     <div className="flex-1 bg-gray-50 overflow-y-auto custom-scrollbar pb-20">
        {/* Header */}
        <div className="bg-white sticky top-0 z-20 shadow-sm">
           <div className="pt-12 pb-4 px-5">
              <div className="flex justify-between items-center mb-4">
                 <h1 className="text-2xl font-bold text-gray-900 tracking-tight">采购单</h1>
                 <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-100 cursor-pointer hover:bg-green-100 transition-colors">
                    <Calendar size={14} /> 2024-11-26
                 </div>
              </div>
              
              {/* Segment Control */}
              <div className="bg-gray-100 p-1 rounded-xl flex">
                 <button 
                    onClick={() => setPurchaseView('product')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${purchaseView === 'product' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                 >
                    商品汇总
                 </button>
                 <button 
                    onClick={() => setPurchaseView('store')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${purchaseView === 'store' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                 >
                    门店明细
                 </button>
              </div>
           </div>
           
           {/* Total Stats Bar */}
           <div className="mx-4 mb-2 bg-green-50 rounded-lg border border-green-100 p-3 flex justify-between items-center text-sm">
              <span className="text-gray-600">共 <span className="font-bold text-gray-900">{purchaseSummary.length}</span> 种商品</span>
              <span className="text-gray-600">合计 <span className="font-bold text-green-600 text-lg">{purchaseSummary.reduce((a, b) => a + b.totalQty, 0)}</span> 件</span>
           </div>
        </div>

        {/* List */}
        <div className="p-4 space-y-3">
           {purchaseSummary.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                 <div className="relative">
                   <img src={item.image} alt="" className="w-16 h-16 rounded-xl bg-gray-100 object-cover" />
                   <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-md border border-white shadow-sm font-bold">
                      {item.storeCount}店
                   </div>
                 </div>
                 
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                       <div>
                         <h4 className="font-bold text-gray-800 text-base">{item.name}</h4>
                         <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded mt-1.5 inline-block">{item.category}</span>
                       </div>
                       <div className="text-right">
                          <span className="font-bold text-2xl text-gray-900 block leading-none">{item.totalQty}</span>
                          <span className="text-xs text-gray-400">总件数</span>
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
        
        {/* Bottom Actions */}
        <div className="p-4 mt-4">
           <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2">
              <FileText size={18} /> 生成采购单据
           </button>
           <button className="w-full mt-3 bg-white border border-gray-200 text-gray-600 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Download size={18} /> 导出Excel表格
           </button>
        </div>
     </div>
  );

  const renderProfile = () => (
    <div className="flex-1 bg-[#F5F6F8] overflow-y-auto custom-scrollbar pb-20">
      {/* Green Header */}
      <div className="bg-green-500 px-6 pt-14 pb-24 text-white">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-xl font-bold overflow-hidden">
             <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <User size={36} fill="#D1D5DB" />
             </div>
           </div>
           <div className="flex-1">
             <div className="flex items-center gap-2">
               <h2 className="text-xl font-bold">张审核员</h2>
               <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full border border-white/30">审核员</span>
             </div>
             <p className="text-green-100 text-sm mt-1 opacity-90">工号: KM-AUD-001</p>
           </div>
           <ChevronRight className="text-white/80" />
        </div>
      </div>

      <div className="px-4 -mt-16 space-y-3 relative z-10">
         {/* Location Info Card */}
         <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
               <Building2 size={16} className="text-green-600" />
               <span className="text-gray-700 text-sm font-medium">云南昆明区域采购中心</span>
            </div>
             <div className="flex items-center gap-3">
               <MapPin size={16} className="text-green-600" />
               <span className="text-gray-500 text-sm">负责：五华区、盘龙区、西山区</span>
            </div>
         </div>

         {/* Stats Card */}
         <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex justify-between items-center text-center divide-x divide-gray-100">
            <div className="flex-1 px-1">
               <div className="text-xl font-bold text-gray-900">268</div>
               <div className="text-xs text-gray-400 mt-1">累计审核</div>
            </div>
             <div className="flex-1 px-1">
               <div className="text-xl font-bold text-green-500">98.5%</div>
               <div className="text-xs text-gray-400 mt-1">通过率</div>
            </div>
             <div className="flex-1 px-1">
               <div className="text-xl font-bold text-gray-900 flex items-center justify-center gap-1">
                  <Store size={14} className="text-blue-500" /> 12
               </div>
               <div className="text-xs text-gray-400 mt-1">管理门店</div>
            </div>
         </div>

         {/* Menu List */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             {/* Contact */}
             <div className="flex items-center gap-3 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                   <Users size={18} />
                </div>
                <span className="flex-1 text-gray-700 text-sm font-medium">通讯录</span>
                <ChevronRight size={16} className="text-gray-300" />
             </div>
             {/* Audit Log */}
             <div className="flex items-center gap-3 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-400">
                   <Award size={18} />
                </div>
                <span className="flex-1 text-gray-700 text-sm font-medium">审核记录</span>
                <ChevronRight size={16} className="text-gray-300" />
             </div>
             {/* Settings */}
             <div className="flex items-center gap-3 p-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                   <Settings size={18} />
                </div>
                <span className="flex-1 text-gray-700 text-sm font-medium">设置</span>
                <ChevronRight size={16} className="text-gray-300" />
             </div>
              {/* Help */}
             <div className="flex items-center gap-3 p-4 active:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                   <HelpCircle size={18} />
                </div>
                <span className="flex-1 text-gray-700 text-sm font-medium">帮助中心</span>
                <ChevronRight size={16} className="text-gray-300" />
             </div>
         </div>
         
         {/* Footer */}
         <div className="pt-4 text-center">
            <div className="text-xs text-gray-400 mb-4">审核端 v1.0.0</div>
            <button className="w-full bg-white border border-gray-200 py-3 rounded-xl text-gray-700 font-medium shadow-sm flex items-center justify-center gap-2 active:bg-gray-50 hover:bg-gray-50 transition-colors">
                <LogOut size={16} /> 退出登录
            </button>
         </div>
      </div>
    </div>
  );

  const renderAuditDetail = () => {
    if (!selectedOrder) return null;
    return (
      <div className="absolute inset-0 z-50 bg-gray-50 flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="bg-white p-4 pt-12 border-b border-gray-200 flex items-center gap-3 shadow-sm sticky top-0 z-20">
           <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight className="rotate-180 text-gray-600" /></button>
           <h2 className="font-bold text-lg text-gray-900">订单审核</h2>
           <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-bold ${
             selectedOrder.status === OrderStatus.Submitted ? 'bg-orange-100 text-orange-700' :
             selectedOrder.status === OrderStatus.Auditing ? 'bg-blue-100 text-blue-700' :
             'bg-green-100 text-green-700'
           }`}>
             {selectedOrder.status === OrderStatus.Submitted ? '待审核' : selectedOrder.status === OrderStatus.Auditing ? '审核中' : '已审核'}
           </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24 custom-scrollbar">
           {/* Store Info Card */}
           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
              <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-bold text-xl text-gray-900">{selectedOrder.storeName}</h3>
                   <div className="text-xs text-gray-400 mt-1 font-mono">ORD-2024-001234 · {selectedOrder.storeRegion}</div>
                 </div>
                 <button className="bg-green-50 text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors">
                    <User size={18} />
                 </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-100">
                 <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-400 text-xs block mb-1">下单数量</span>
                    <div className="font-bold text-gray-900 text-lg">{selectedOrder.totalQuantity} <span className="text-xs font-normal">件</span></div>
                 </div>
                 <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-400 text-xs block mb-1">预估金额</span>
                    <div className="font-bold text-blue-600 text-lg">¥2580</div>
                 </div>
              </div>
           </div>

           {/* Audit Form */}
           <h4 className="font-bold text-gray-800 mb-3 px-1 flex items-center justify-between">
              <span>商品明细 ({selectedOrder.items.length})</span>
              <span className="text-xs font-normal text-gray-400">请核对数量</span>
           </h4>
           
           <div className="space-y-3">
             {selectedOrder.items.map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex gap-4 mb-4">
                    <img src={getProductImage(item.productId)} alt="" className="w-16 h-16 rounded-xl bg-gray-100 object-cover border border-gray-100" />
                    <div>
                       <div className="font-bold text-gray-900 text-sm mb-1">{item.productName}</div>
                       <div className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded inline-block">{item.spec}</div>
                    </div>
                 </div>
                 
                 <div className="bg-gray-50 rounded-xl p-3 space-y-3">
                    <div className="flex items-center justify-between text-sm border-b border-gray-200 pb-2">
                       <span className="text-gray-500">门店申报</span>
                       <span className="font-medium text-gray-900">{item.quantityOrdered} {item.unit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <span className="text-green-600 font-bold text-sm">实发数量</span>
                       <div className="flex items-center gap-3">
                          <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm active:bg-gray-50 text-gray-600">-</button>
                          <span className="w-8 text-center font-bold text-lg text-gray-900">{item.quantityOrdered}</span>
                          <button className="w-8 h-8 flex items-center justify-center bg-green-500 border border-green-500 rounded-lg shadow-sm active:bg-green-600 text-white">+</button>
                       </div>
                    </div>
                 </div>
                 
                 <div className="mt-3 relative">
                    <input 
                      type="text" 
                      placeholder="如有调整，请填写备注原因..." 
                      className="w-full text-xs bg-white border border-gray-200 rounded-lg py-2 px-3 outline-none focus:border-green-500 transition-colors" 
                    />
                 </div>
               </div>
             ))}
           </div>
           
           {/* Void Button */}
           <div className="mt-6 mb-2">
              <button className="w-full py-3 text-red-400 text-sm font-medium hover:text-red-600 transition-colors flex items-center justify-center gap-2">
                <AlertCircle size={16} /> 作废此订单
              </button>
           </div>
        </div>

        {/* Floating Action Bar */}
        <div className="bg-white border-t border-gray-200 p-4 absolute bottom-0 left-0 right-0 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 rounded-t-2xl">
           <button 
             className="flex-1 bg-red-50 text-red-600 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
             onClick={() => setSelectedOrder(null)}
           >
             <X size={20} /> 驳回
           </button>
           <button 
             className="flex-[2] bg-green-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-green-700 shadow-lg shadow-green-200 transition-colors"
             onClick={() => { setSelectedOrder(null); setActiveTab('order'); setOrderTab(OrderStatus.Approved); }}
           >
             <Check size={20} /> 确认审核通过
           </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-gray-50 shadow-2xl relative font-sans overflow-hidden">
      {selectedOrder && renderAuditDetail()}
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'order' && renderOrder()}
        {activeTab === 'purchase' && renderPurchase()}
        {activeTab === 'profile' && renderProfile()}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 h-[88px] pb-6 flex items-center justify-around z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] shrink-0">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'home' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} className={activeTab === 'home' ? 'fill-green-100' : ''} />
          <span className="text-[10px] font-medium">首页</span>
        </button>
        <button onClick={() => setActiveTab('order')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'order' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <ClipboardList size={24} strokeWidth={activeTab === 'order' ? 2.5 : 2} className={activeTab === 'order' ? 'fill-green-100' : ''} />
          <span className="text-[10px] font-medium">订单</span>
        </button>
        <button onClick={() => setActiveTab('purchase')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'purchase' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <ShoppingBag size={24} strokeWidth={activeTab === 'purchase' ? 2.5 : 2} className={activeTab === 'purchase' ? 'fill-green-100' : ''} />
          <span className="text-[10px] font-medium">采购</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} className={activeTab === 'profile' ? 'fill-green-100' : ''} />
          <span className="text-[10px] font-medium">我的</span>
        </button>
      </div>
    </div>
  );
};

export default ProcurementApp;
