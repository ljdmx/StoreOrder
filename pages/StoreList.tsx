
import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Store,
  MoreVertical,
  Plus,
  LayoutGrid,
  List,
  Edit3,
  QrCode,
  X,
  Printer,
  Download
} from 'lucide-react';
import { MOCK_STORES, MOCK_STATS } from '../services/mockData';
import { Store as StoreType } from '../types';

interface BindModalProps {
  store: StoreType;
  onClose: () => void;
}

const BindModal: React.FC<BindModalProps> = ({ store, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">绑定微信账号</h3>
        <p className="text-sm text-gray-500 mb-6">
          请 <span className="font-bold text-gray-800">{store.name}</span> 负责人 
          <span className="font-bold text-gray-800 mx-1">{store.managerName}</span> 
          使用微信扫码
        </p>
        
        <div className="bg-white border-2 border-gray-100 p-4 rounded-xl inline-block mb-4 shadow-inner">
          {/* Simulated QR Code */}
          <div className="w-48 h-48 bg-gray-900 flex items-center justify-center rounded-lg relative overflow-hidden group">
             <QrCode size={120} className="text-white opacity-90" />
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium text-sm">点击刷新</span>
             </div>
             {/* Logo overlay */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                  日
                </div>
             </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 mb-6 bg-gray-50 py-2 rounded">
          二维码有效期为 24 小时<br/>
          绑定后可直接使用微信小程序扫码登录
        </div>
        
        <div className="flex gap-3">
          <button 
            className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
            onClick={() => alert('已触发打印机')}
          >
            <Printer size={16} /> 打印
          </button>
          <button 
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-sm"
            onClick={onClose}
          >
            <Download size={16} /> 保存图片
          </button>
        </div>
      </div>
    </div>
  );
};

const StoreList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
  const [bindingStore, setBindingStore] = useState<StoreType | null>(null);
  
  const activeStores = MOCK_STORES.filter(s => s.status === 'active').length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-arco-text-title">门店管理</h2>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Store size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{MOCK_STORES.length + 3}</div>
              <div className="text-sm text-gray-500">门店总数</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <Store size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{activeStores + 2}</div>
              <div className="text-sm text-gray-500">营业中</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
              <Clock size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900 text-orange-600">{MOCK_STATS.orderedStores}/{MOCK_STATS.totalStores}</div>
              <div className="text-sm text-gray-500">今日已下单</div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg border border-arco-border shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-arco-border flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
                <input 
                type="text" 
                placeholder="搜索门店名称、地址..." 
                className="w-64 pl-4 pr-4 py-2 bg-gray-50 border border-transparent rounded text-sm outline-none focus:bg-white focus:border-arco-primary/50 transition-colors"
                />
                <select className="px-4 py-2 bg-gray-50 border border-transparent rounded text-sm outline-none focus:bg-white text-gray-600">
                <option>全部区域</option>
                <option>五华区</option>
                <option>盘龙区</option>
                <option>官渡区</option>
                <option>西山区</option>
                <option>呈贡区</option>
                </select>
            </div>

            <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-arco-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <List size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('card')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'card' ? 'bg-white shadow text-arco-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-arco-primary hover:bg-blue-700 text-white rounded shadow-sm transition-colors text-sm font-medium">
                    <Plus size={18} /> 新增门店
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50/30">
        {viewMode === 'card' ? (
            // CARD VIEW
            // Updated grid for 2xl screens
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {MOCK_STORES.map((store) => (
                <div key={store.id} className="bg-white rounded border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col group relative">
                    <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <Store size={20} />
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                    </div>
                    
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-900">{store.name}</h3>
                        <div className="text-xs text-gray-400 mt-1">ID: S00{store.id.replace('s','')}</div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                        <MapPin size={14} /> <span>昆明市{store.region}xxx街</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <User size={14} /> <span>{store.managerName}</span>
                        <Phone size={14} className="ml-2" /> <span>{store.managerPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <Clock size={14} /> <span>05:00-10:00</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className={`text-xs px-2 py-0.5 rounded ${store.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {store.status === 'active' ? '营业中' : '已停用'}
                        </span>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setBindingStore(store)}
                            className="flex items-center gap-1 text-xs px-2 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors font-medium"
                            title="绑定微信"
                          >
                            <QrCode size={12} /> 绑定
                          </button>
                          <button className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                            <Edit3 size={12} /> 编辑
                          </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        ) : (
            // LIST VIEW
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium w-24">门店ID</th>
                            <th className="px-6 py-4 font-medium">门店名称</th>
                            <th className="px-6 py-4 font-medium">区域</th>
                            <th className="px-6 py-4 font-medium">负责人</th>
                            <th className="px-6 py-4 font-medium">联系电话</th>
                            <th className="px-6 py-4 font-medium">下单时间限制</th>
                            <th className="px-6 py-4 font-medium">状态</th>
                            <th className="px-6 py-4 font-medium text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                         {MOCK_STORES.map((store) => (
                             <tr key={store.id} className="hover:bg-blue-50/30 transition-colors">
                                 <td className="px-6 py-4 text-sm text-gray-500">S00{store.id.replace('s','')}</td>
                                 <td className="px-6 py-4 font-medium text-gray-900">{store.name}</td>
                                 <td className="px-6 py-4">
                                     <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{store.region}</span>
                                 </td>
                                 <td className="px-6 py-4 text-sm text-gray-700">{store.managerName}</td>
                                 <td className="px-6 py-4 text-sm text-gray-500 font-mono">{store.managerPhone}</td>
                                 <td className="px-6 py-4 text-sm text-gray-500">05:00 - 10:00</td>
                                 <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${store.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${store.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        {store.status === 'active' ? '营业中' : '已停业'}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                      <button 
                                        onClick={() => setBindingStore(store)}
                                        className="text-gray-500 hover:text-green-600 flex items-center gap-1 text-sm font-medium transition-colors"
                                        title="微信绑定"
                                      >
                                          <QrCode size={14} /> 绑定
                                      </button>
                                      <button className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium transition-colors">
                                          <Edit3 size={14} /> 编辑
                                      </button>
                                    </div>
                                 </td>
                             </tr>
                         ))}
                    </tbody>
                </table>
            </div>
        )}
        </div>
      </div>
      
      {/* Bind Modal */}
      {bindingStore && <BindModal store={bindingStore} onClose={() => setBindingStore(null)} />}
    </div>
  );
};

export default StoreList;
