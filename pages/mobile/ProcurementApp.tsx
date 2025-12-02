import React, { useState } from 'react';
import { 
  ClipboardList, 
  CheckSquare, 
  User, 
  Search, 
  ChevronRight,
  Filter,
  Check,
  X
} from 'lucide-react';
import { MOCK_ORDERS } from '../../services/mockData';
import { Order, OrderStatus } from '../../types';

const ProcurementApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'todo' | 'done' | 'profile'>('todo');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const todoOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.Submitted || o.status === OrderStatus.Auditing);
  const doneOrders = MOCK_ORDERS.filter(o => o.status === OrderStatus.Approved || o.status === OrderStatus.Rejected);

  const renderOrderList = (orders: Order[], title: string) => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex gap-2">
           <div className="flex-1 bg-gray-100 rounded px-3 py-2 flex items-center gap-2 text-sm text-gray-500">
             <Search size={16} />
             <span>搜索单号/门店</span>
           </div>
           <button className="p-2 bg-gray-100 rounded text-gray-600"><Filter size={18} /></button>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {orders.length === 0 ? (
           <div className="text-center py-20 text-gray-400">
             <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
             <p>暂无相关订单</p>
           </div>
        ) : (
          orders.map(order => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrder(order)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">{order.storeName}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{order.orderDate}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  order.status === 'Submitted' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status === 'Submitted' ? '待审核' : '审核中'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                 <span>共 {order.items.length} 种商品</span>
                 <span className="font-bold text-gray-900">总量: {order.totalQuantity}</span>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  立即审核 <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAuditDetail = () => {
    if (!selectedOrder) return null;
    return (
      <div className="absolute inset-0 z-50 bg-gray-50 flex flex-col">
        <div className="bg-white p-4 border-b border-gray-200 flex items-center gap-3">
           <button onClick={() => setSelectedOrder(null)} className="text-gray-600"><ChevronRight className="rotate-180" /></button>
           <h2 className="font-bold text-lg">订单审核</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24">
           {/* Store Info */}
           <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <h3 className="font-bold text-gray-900">{selectedOrder.storeName}</h3>
              <div className="text-sm text-gray-500 mt-2 grid grid-cols-2 gap-2">
                 <span>区域: {selectedOrder.storeRegion}</span>
                 <span>联系: 张三</span>
                 <span className="col-span-2">下单时间: {selectedOrder.orderDate}</span>
              </div>
           </div>

           {/* Items */}
           <div className="space-y-3">
             {selectedOrder.items.map((item, idx) => (
               <div key={idx} className="bg-white p-4 rounded-xl shadow-sm">
                 <div className="flex justify-between mb-2">
                   <span className="font-bold text-gray-800">{item.productName}</span>
                   <span className="text-gray-500 text-xs">{item.spec}</span>
                 </div>
                 <div className="flex items-center justify-between mt-2">
                   <div className="text-sm text-gray-500">
                     下单: <span className="font-bold text-gray-900 text-lg">{item.quantityOrdered}</span> {item.unit}
                   </div>
                   <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                     <span className="text-xs text-gray-500 pl-2">审核:</span>
                     <input 
                       type="number" 
                       defaultValue={item.quantityOrdered}
                       className="w-16 bg-white border border-gray-200 rounded text-center py-1 text-blue-600 font-bold outline-none focus:ring-1 focus:ring-blue-500"
                     />
                   </div>
                 </div>
                 <input 
                    type="text" 
                    placeholder="添加审核备注..." 
                    className="w-full mt-3 text-xs border-b border-gray-100 py-1 outline-none focus:border-blue-500 bg-transparent"
                 />
               </div>
             ))}
           </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white border-t border-gray-200 p-4 absolute bottom-0 left-0 right-0 flex gap-3 shadow-lg">
           <button className="flex-1 bg-red-50 text-red-600 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
             <X size={18} /> 退回订单
           </button>
           <button className="flex-[2] bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700">
             <Check size={18} /> 审核通过
           </button>
        </div>
      </div>
    )
  }

  const renderProfile = () => (
    <div className="flex-1 bg-gray-50">
      <div className="bg-gray-800 p-8 text-white flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
           审
        </div>
        <div>
          <h2 className="text-xl font-bold">张审核</h2>
          <p className="text-gray-300 text-sm">高级采购专员 | A区域</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
         <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">128</div>
            <div className="text-xs text-gray-500 mt-1">今日已审</div>
         </div>
         <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-500">15</div>
            <div className="text-xs text-gray-500 mt-1">待处理</div>
         </div>
      </div>
      <div className="bg-white mx-4 rounded-lg">
        {['待审核列表', '已审核记录', '采购汇总表', '个人设置'].map(item => (
          <div key={item} className="flex justify-between items-center p-4 border-b border-gray-50 active:bg-gray-50">
            <span className="text-sm text-gray-700">{item}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl relative">
      {selectedOrder && renderAuditDetail()}
      
      {activeTab === 'todo' && renderOrderList(todoOrders, '待审核订单')}
      {activeTab === 'done' && renderOrderList(doneOrders, '已完成审核')}
      {activeTab === 'profile' && renderProfile()}

      <div className="bg-white border-t border-gray-200 h-16 flex items-center justify-around absolute bottom-0 left-0 right-0 z-40">
        <button onClick={() => setActiveTab('todo')} className={`flex flex-col items-center gap-1 ${activeTab === 'todo' ? 'text-blue-600' : 'text-gray-400'}`}>
          <ClipboardList size={20} />
          <span className="text-[10px]">待办</span>
        </button>
        <button onClick={() => setActiveTab('done')} className={`flex flex-col items-center gap-1 ${activeTab === 'done' ? 'text-blue-600' : 'text-gray-400'}`}>
          <CheckSquare size={20} />
          <span className="text-[10px]">已审</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
          <User size={20} />
          <span className="text-[10px]">我的</span>
        </button>
      </div>
    </div>
  );
};

export default ProcurementApp;