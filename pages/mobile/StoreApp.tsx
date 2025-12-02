
import React, { useState } from 'react';
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
  Bell
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../../services/mockData';
import { Product } from '../../types';

interface CartItem extends Product {
  quantity: number;
}

const StoreApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'order' | 'history' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Derived state
  const categories = ['全部', '蔬菜类', '水果类', '肉禽类', '乳制品', '调味品', '粮油类'];
  const filteredProducts = selectedCategory === '全部' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

  const renderHome = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-blue-600 p-6 text-white rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10 flex justify-between items-start">
           <div>
             <h1 className="text-xl font-bold">五华区南屏街店</h1>
             <p className="text-blue-100 text-sm mt-1">负责人：张三</p>
           </div>
           <Bell className="text-blue-100" />
        </div>
        
        {/* Status Card */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm text-gray-800 flex items-center justify-between">
           <div>
             <div className="text-sm text-gray-500 mb-1">今日订货状态</div>
             <div className="text-lg font-bold text-orange-500 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
               未下单
             </div>
             <div className="text-xs text-gray-400 mt-1">截止时间: 10:00 (剩2小时)</div>
           </div>
           <button 
             onClick={() => setActiveTab('order')}
             className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-blue-200 shadow-md active:scale-95 transition-transform"
           >
             去下单
           </button>
        </div>
      </div>

      {/* Notice Bar */}
      <div className="mx-4 mt-4 bg-orange-50 text-orange-700 text-xs px-3 py-2 rounded-lg flex items-center gap-2 border border-orange-100">
        <Bell size={12} />
        <span>通知：明日部分叶菜供应紧张，请提前备货。</span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mx-4 mt-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
           <div className="text-xs text-gray-400">本月订货</div>
           <div className="text-xl font-bold mt-1">26 <span className="text-xs font-normal text-gray-400">次</span></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
           <div className="text-xs text-gray-400">常用商品</div>
           <div className="text-xl font-bold mt-1">12 <span className="text-xs font-normal text-gray-400">种</span></div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mx-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">最近订单</h3>
          <span className="text-xs text-gray-400" onClick={() => setActiveTab('history')}>查看全部</span>
        </div>
        {MOCK_ORDERS.slice(0, 2).map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100">
            <div className="flex justify-between mb-2">
               <span className="text-sm font-medium">{order.orderDate.split(' ')[0]}</span>
               <span className={`text-xs px-2 py-0.5 rounded ${order.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                 {order.status === 'Approved' ? '已审核' : order.status}
               </span>
            </div>
            <div className="text-xs text-gray-500 flex justify-between">
              <span>共 {order.totalQuantity} 件商品</span>
              <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrder = () => (
    <div className="flex-1 flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2 text-sm text-gray-500">
           <Search size={16} />
           <span>搜索商品...</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-24 bg-gray-50 overflow-y-auto custom-scrollbar">
          {categories.map(cat => (
            <div 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`p-4 text-xs font-medium text-center cursor-pointer transition-colors relative ${
                selectedCategory === cat ? 'bg-white text-blue-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {selectedCategory === cat && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-600 rounded-r"></div>}
              {cat}
            </div>
          ))}
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-3 pb-24 custom-scrollbar">
          <div className="mb-2 text-xs text-gray-500 font-medium px-1">{selectedCategory} ({filteredProducts.length})</div>
          {filteredProducts.map(product => {
             const cartItem = cart.find(c => c.id === product.id);
             const qty = cartItem?.quantity || 0;
             return (
               <div key={product.id} className="flex gap-3 mb-4 bg-white p-2 rounded-lg">
                 <img src={product.imageUrl} className="w-20 h-20 object-cover rounded-lg bg-gray-100" alt="" />
                 <div className="flex-1 flex flex-col justify-between">
                   <div>
                     <h4 className="font-bold text-sm text-gray-800">{product.name}</h4>
                     <p className="text-xs text-gray-400 mt-1">{product.spec}</p>
                   </div>
                   <div className="flex justify-between items-end">
                     <span className="text-red-500 font-bold text-sm">¥{product.price.toFixed(2)}<span className="text-gray-400 text-xs font-normal">/{product.unit}</span></span>
                     
                     {product.isActive ? (
                       <div className="flex items-center gap-2">
                         {qty > 0 && (
                           <>
                             <button onClick={() => updateCart(product, -1)} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 active:bg-gray-100"><Minus size={12} /></button>
                             <span className="text-sm font-medium w-4 text-center">{qty}</span>
                           </>
                         )}
                         <button onClick={() => updateCart(product, 1)} className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center active:bg-blue-700 shadow-sm"><Plus size={12} /></button>
                       </div>
                     ) : (
                       <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded">暂停供应</span>
                     )}
                   </div>
                 </div>
               </div>
             )
          })}
        </div>
      </div>

      {/* Cart Bar */}
      {cart.length > 0 && (
        <div className="absolute bottom-16 left-4 right-4 bg-gray-900 text-white rounded-full shadow-2xl p-3 flex justify-between items-center z-20">
           <div className="flex items-center gap-3 pl-2">
             <div className="relative">
               <ShoppingCart size={24} className="text-white" />
               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-gray-900">{cartCount}</span>
             </div>
             <div className="flex flex-col leading-tight">
               <span className="font-bold text-lg">¥{cartTotal.toFixed(2)}</span>
               <span className="text-[10px] text-gray-400">已选 {cart.length} 种商品</span>
             </div>
           </div>
           <button className="bg-blue-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-500 transition-colors">
             去结算
           </button>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
     <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
       <div className="bg-white p-4 border-b border-gray-100 sticky top-0 z-10">
         <h1 className="text-lg font-bold text-center">历史订单</h1>
       </div>
       <div className="p-4 space-y-4">
         {MOCK_ORDERS.map(order => (
           <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center pb-3 border-b border-gray-50 mb-3">
               <span className="text-sm font-bold text-gray-700">{order.orderDate}</span>
               <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'}`}>
                 {order.status === 'Approved' ? '已审核' : order.status}
               </span>
             </div>
             <div className="space-y-2 mb-3">
               {order.items.slice(0, 2).map((item, i) => (
                 <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.productName}</span>
                    <span className="text-gray-900">x{item.quantityOrdered}</span>
                 </div>
               ))}
               {order.items.length > 2 && <div className="text-xs text-gray-400">... 共 {order.items.length} 种商品</div>}
             </div>
             <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold">合计: {order.totalQuantity} 件</span>
                <button className="text-blue-600 text-xs border border-blue-600 px-3 py-1 rounded-full">查看详情</button>
             </div>
           </div>
         ))}
       </div>
     </div>
  );

  const renderProfile = () => (
    <div className="flex-1 bg-gray-50">
      <div className="bg-blue-600 p-8 text-white flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
           张
        </div>
        <div>
          <h2 className="text-xl font-bold">张三</h2>
          <p className="text-blue-100 text-sm">门店负责人 | 13800138000</p>
        </div>
      </div>
      <div className="mt-4 bg-white">
        {['门店信息', '消息通知', '联系客服', '系统设置'].map(item => (
          <div key={item} className="flex justify-between items-center p-4 border-b border-gray-50 active:bg-gray-50">
            <span className="text-sm text-gray-700">{item}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
        <div className="mt-6 p-4">
          <button className="w-full py-3 text-red-500 bg-white rounded-lg border border-gray-200 text-sm font-medium">退出登录</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl relative">
      {/* Content Area */}
      {activeTab === 'home' && renderHome()}
      {activeTab === 'order' && renderOrder()}
      {activeTab === 'history' && renderHistory()}
      {activeTab === 'profile' && renderProfile()}

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 h-16 flex items-center justify-around absolute bottom-0 left-0 right-0 z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Home size={20} />
          <span className="text-[10px]">首页</span>
        </button>
        <button onClick={() => setActiveTab('order')} className={`flex flex-col items-center gap-1 ${activeTab === 'order' ? 'text-blue-600' : 'text-gray-400'}`}>
          <ShoppingBag size={20} />
          <span className="text-[10px]">订货</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Clock size={20} />
          <span className="text-[10px]">订单</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
          <User size={20} />
          <span className="text-[10px]">我的</span>
        </button>
      </div>
    </div>
  );
};

export default StoreApp;
