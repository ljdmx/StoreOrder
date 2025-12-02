
import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ShoppingBag, 
  Clock, 
  User, 
  Search, 
  Plus, 
  Minus, 
  ChevronRight, 
  ShoppingCart,
  Bell,
  MapPin,
  Filter,
  FileText,
  Star,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Coffee,
  Carrot,
  Beef,
  Menu,
  Box
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../../services/mockData';
import { Product, OrderStatus } from '../../types';

interface CartItem extends Product {
  quantity: number;
}

const StoreApp: React.FC = () => {
  // Navigation: Home | Order (History) | Shop (Catalog) | Profile
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'shop' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Derived state
  const categories = ['全部', '叶菜类', '根茎类', '豆类', '调味类', '肉类', '海鲜类'];
  
  const filteredProducts = selectedCategory === '全部' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Home Stats
  const homeStats = {
    notOrdered: 3,
    submitted: 5,
    auditing: 2,
    approved: 8
  };

  const updateCart = (product: Product, delta: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter(item => item.id !== product.id);
        return prev.map(item => item.id === product.id ? { ...item, quantity: newQty } : item);
      } else {
        if (delta > 0) return [...prev, { ...product, quantity: delta }];
        return prev;
      }
    });
  };

  // Helper icons for categories
  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case '叶菜类': return <Carrot className="text-green-600" size={24} />;
      case '根茎类': return <Carrot className="text-orange-500" size={24} />;
      case '肉类': return <Beef className="text-red-500" size={24} />;
      case '调味类': return <Coffee className="text-amber-700" size={24} />; // Using coffee as placeholder
      default: return <Menu className="text-blue-500" size={24} />;
    }
  };

  const renderHome = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      {/* Header */}
      <div className="bg-green-500 pt-12 pb-24 px-4 rounded-b-[40px] shadow-sm relative">
        <div className="flex justify-between items-start mb-4">
           <div className="text-white">
             <h1 className="text-xl font-bold">你好，李店长</h1>
             <div className="flex items-center gap-1 text-green-100 text-sm mt-1">
               <MapPin size={14} /> 翠湖店
             </div>
           </div>
           <div className="relative">
             <Bell className="text-white" />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-green-500"></span>
           </div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-full flex items-center px-4 py-3 shadow-sm">
           <Search size={18} className="text-gray-400 mr-2" />
           <input type="text" placeholder="搜索商品名称" className="flex-1 outline-none text-sm" />
        </div>
      </div>

      {/* Status Card - Floating */}
      <div className="mx-4 -mt-16 bg-white rounded-2xl shadow-sm p-4 relative z-10 border border-gray-100">
         <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2">
            <h3 className="font-bold text-gray-800">今日订货状态</h3>
            <span className="text-xs text-gray-400">2024-01-15</span>
         </div>
         <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col items-center">
               <span className="text-xl font-bold text-orange-500">{homeStats.notOrdered}</span>
               <span className="text-xs text-gray-500 mt-1">未下单</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-xl font-bold text-gray-800">{homeStats.submitted}</span>
               <span className="text-xs text-gray-500 mt-1">已下单</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-xl font-bold text-gray-800">{homeStats.auditing}</span>
               <span className="text-xs text-gray-500 mt-1">审核中</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-xl font-bold text-green-600">{homeStats.approved}</span>
               <span className="text-xs text-gray-500 mt-1">已审核</span>
            </div>
         </div>
      </div>

      {/* One-click Order Button */}
      <div className="mx-4 mt-4">
         <button 
           onClick={() => setActiveTab('shop')}
           className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
         >
           <ShoppingCart size={20} /> 一键进入下单
         </button>
      </div>

      {/* Categories Grid */}
      <div className="mx-4 mt-6">
         <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">商品分类</h3>
            <span className="text-xs text-gray-400 flex items-center cursor-pointer" onClick={() => setActiveTab('shop')}>
              全部 <ChevronRight size={14} />
            </span>
         </div>
         <div className="grid grid-cols-5 gap-3">
            {categories.slice(1, 6).map(cat => (
               <div key={cat} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => { setSelectedCategory(cat); setActiveTab('shop'); }}>
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                     {getCategoryIcon(cat)}
                  </div>
                  <span className="text-xs text-gray-600">{cat}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Hot Recommendations */}
      <div className="mx-4 mt-6">
         <h3 className="font-bold text-gray-800 mb-3">热销推荐</h3>
         <div className="space-y-3">
            {MOCK_PRODUCTS.slice(0, 3).map(product => (
               <div key={product.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                  <img src={product.imageUrl} className="w-20 h-20 rounded-lg object-cover bg-gray-100" alt={product.name} />
                  <div className="flex-1 flex flex-col justify-between py-1">
                     <div>
                        <h4 className="font-bold text-gray-800">{product.name}</h4>
                        <span className="text-xs text-gray-400">/{product.unit}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-bold">¥{product.price}</span>
                        <button 
                          onClick={() => updateCart(product, 1)}
                          className="w-7 h-7 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                        >
                           <Plus size={16} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
       <div className="bg-white sticky top-0 z-20">
         <div className="pt-12 px-4 pb-4">
            <h1 className="text-xl font-bold text-gray-900">采购订单</h1>
         </div>
         {/* Tabs */}
         <div className="flex items-center px-4 border-b border-gray-100 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {[
              { id: 'all', label: '全部' },
              { id: OrderStatus.Auditing, label: '审核中' },
              { id: OrderStatus.Approved, label: '已通过' },
              { id: OrderStatus.Rejected, label: '已驳回' }
            ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setOrderStatusFilter(tab.id)}
                 className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                   orderStatusFilter === tab.id 
                     ? 'border-gray-900 text-gray-900' 
                     : 'border-transparent text-gray-500'
                 }`}
               >
                 {tab.label}
               </button>
            ))}
         </div>
       </div>

       <div className="p-4 space-y-3">
          {MOCK_ORDERS.filter(o => orderStatusFilter === 'all' || o.status === orderStatusFilter).map(order => (
             <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-3">
                   <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                         <Box size={20} />
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-800 text-sm">{order.id}</h3>
                         <div className="text-xs text-gray-400 mt-0.5">{order.orderDate.split(' ')[0]}</div>
                      </div>
                   </div>
                   <span className={`text-xs px-2 py-1 rounded font-medium ${
                     order.status === OrderStatus.Approved ? 'bg-green-50 text-green-600' :
                     order.status === OrderStatus.Auditing ? 'bg-blue-50 text-blue-600' :
                     'bg-orange-50 text-orange-600'
                   }`}>
                      {order.status === OrderStatus.Approved ? '已通过' : 
                       order.status === OrderStatus.Auditing ? '审核中' : '待审核'}
                   </span>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-3">
                   <div className="text-gray-500">
                      商品数量 <span className="text-gray-900 font-bold ml-1">{order.totalQuantity} 件</span>
                   </div>
                   <div className="text-gray-500">
                      订单金额 <span className="text-blue-600 font-bold ml-1">¥2,580</span>
                   </div>
                </div>

                <div className="flex justify-end pt-1">
                   <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">
                      查看详情 <ChevronRight size={10} className="inline ml-1" />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  const renderShop = () => (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Search Header */}
      <div className="p-3 border-b border-gray-100 bg-white z-20">
         <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center text-gray-500 text-sm">
            <Search size={16} className="mr-2" />
            <span className="flex-1">搜索商品...</span>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
         {/* Sidebar Categories */}
         <div className="w-24 bg-gray-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {categories.map(cat => (
               <div 
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`p-4 text-xs font-medium text-center cursor-pointer relative ${
                   selectedCategory === cat 
                     ? 'bg-white text-green-600' 
                     : 'text-gray-500 hover:bg-gray-100'
                 }`}
               >
                 {selectedCategory === cat && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-green-500 rounded-r"></div>}
                 {cat}
               </div>
            ))}
         </div>

         {/* Product List */}
         <div className="flex-1 overflow-y-auto p-3 pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex justify-between items-center mb-3 px-1">
               <span className="font-bold text-sm text-gray-800">{selectedCategory}</span>
               <span className="text-xs text-gray-400">共 {filteredProducts.length} 种</span>
            </div>

            {filteredProducts.map(product => {
               const qty = cart.find(c => c.id === product.id)?.quantity || 0;
               return (
                  <div key={product.id} className="flex gap-3 mb-4 bg-white p-2 rounded-xl border border-gray-50 shadow-sm">
                     <img src={product.imageUrl} className="w-20 h-20 rounded-lg object-cover bg-gray-100" alt="" />
                     <div className="flex-1 flex flex-col justify-between">
                        <div>
                           <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{product.name}</h4>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">起订{product.minOrder}</span>
                             <span className="text-xs text-gray-400">{product.spec}</span>
                           </div>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                           <span className="text-orange-500 font-bold text-sm">¥{product.price}<span className="text-gray-300 text-xs font-normal">/{product.unit}</span></span>
                           
                           {product.isActive ? (
                             <div className="flex items-center gap-2">
                               {qty > 0 && (
                                 <>
                                   <button onClick={() => updateCart(product, -1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 active:bg-gray-100"><Minus size={12} /></button>
                                   <span className="text-sm font-medium w-4 text-center">{qty}</span>
                                 </>
                               )}
                               <button onClick={() => updateCart(product, 1)} className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center active:bg-green-600 shadow-sm"><Plus size={14} /></button>
                             </div>
                           ) : (
                             <span className="text-xs text-gray-400">暂停供应</span>
                           )}
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
         <div className="absolute bottom-[90px] left-4 right-4 bg-gray-900 text-white rounded-full shadow-2xl p-2 pl-4 flex justify-between items-center z-30 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <ShoppingCart size={24} className="text-green-400" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-gray-900">{cartCount}</span>
               </div>
               <div className="flex flex-col">
                  <span className="font-bold text-lg leading-none">¥{cartTotal.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400">已选 {cart.length} 种商品</span>
               </div>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-lg shadow-green-900/50">
               去结算
            </button>
         </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
       <div className="bg-green-500 pt-16 pb-20 px-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full border-2 border-white/50 p-0.5">
                <img src="https://picsum.photos/id/64/200/200" alt="Avatar" className="w-full h-full rounded-full object-cover" />
             </div>
             <div className="text-white">
                <h2 className="text-xl font-bold">李店长</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs bg-white/20 px-2 py-0.5 rounded border border-white/20">门店负责人</span>
                </div>
             </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-100 text-sm">
             <MapPin size={16} /> 五华区翠湖路88号
          </div>
       </div>

       <div className="px-4 -mt-12 relative z-10 space-y-3">
          {/* Stats */}
          <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between text-center divide-x divide-gray-100">
             <div className="flex-1">
                <div className="text-xl font-bold text-gray-900">28</div>
                <div className="text-xs text-gray-400 mt-1">本月订单</div>
             </div>
             <div className="flex-1">
                <div className="text-xl font-bold text-green-500">¥12.8K</div>
                <div className="text-xs text-gray-400 mt-1">订货金额</div>
             </div>
             <div className="flex-1">
                <div className="text-xl font-bold text-gray-900">96%</div>
                <div className="text-xs text-gray-400 mt-1">通过率</div>
             </div>
          </div>

          {/* Menu */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
             {[
               { icon: FileText, label: '账单明细', color: 'text-blue-500', bg: 'bg-blue-50' },
               { icon: Star, label: '我的收藏', color: 'text-orange-500', bg: 'bg-orange-50' },
               { icon: Users, label: '通讯录', color: 'text-green-500', bg: 'bg-green-50' },
               { icon: Settings, label: '设置', color: 'text-gray-500', bg: 'bg-gray-100' },
               { icon: HelpCircle, label: '帮助中心', color: 'text-gray-500', bg: 'bg-gray-100' },
             ].map((item, idx) => (
                <div key={idx} className="flex items-center p-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
                   <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center ${item.color} mr-3`}>
                      <item.icon size={18} />
                   </div>
                   <span className="flex-1 text-sm font-medium text-gray-700">{item.label}</span>
                   <ChevronRight size={16} className="text-gray-300" />
                </div>
             ))}
          </div>
          
          <button className="w-full bg-white py-3 rounded-xl text-sm font-medium text-gray-600 shadow-sm flex items-center justify-center gap-2 mt-4">
             <LogOut size={16} /> 退出登录
          </button>
       </div>
       
       <div className="text-center text-xs text-gray-300 mt-6 pb-4">
          门店端 v1.0.0
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans w-full shadow-2xl relative overflow-hidden">
      {/* View Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative z-0">
         {activeTab === 'home' && renderHome()}
         {activeTab === 'history' && renderHistory()}
         {activeTab === 'shop' && renderShop()}
         {activeTab === 'profile' && renderProfile()}
      </div>

      {/* Bottom Tabbar */}
      <div className="bg-white border-t border-gray-100 h-[84px] pb-5 flex items-center justify-around z-40 shrink-0">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'home' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
           <span className="text-[10px] font-medium">首页</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')} 
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'history' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <FileText size={24} strokeWidth={activeTab === 'history' ? 2.5 : 2} />
           <span className="text-[10px] font-medium">订单</span>
        </button>
        <button 
          onClick={() => setActiveTab('shop')} 
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'shop' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === 'shop' ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-green-50 text-green-600'}`}>
              <ShoppingCart size={20} fill={activeTab === 'shop' ? 'white' : 'none'} />
           </div>
           <span className="text-[10px] font-medium text-green-600 mt-0.5">下单</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')} 
          className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
           <span className="text-[10px] font-medium">我的</span>
        </button>
      </div>
    </div>
  );
};

export default StoreApp;
