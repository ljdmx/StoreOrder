import React, { useState } from 'react';
import { 
  Calendar,
  Download,
  FileText,
  TrendingUp,
  Package,
  Store,
  Box,
  LayoutGrid,
  List
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { MOCK_SUMMARY_STATS } from '../services/mockData';

const COLORS = ['#00B42A', '#FF7D00', '#165DFF', '#F53F3F', '#722ED1'];

const SummaryReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'store'>('product');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-arco-text-title">清单汇总</h2>
        <div className="flex gap-3">
           <div className="bg-white border border-gray-200 rounded px-3 py-1.5 flex items-center gap-2 text-sm text-gray-600">
             <Calendar size={16} />
             <span>今日</span>
           </div>
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded text-sm transition-colors">
              <FileText size={16} /> 生成汇总单
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors shadow-sm">
              <Download size={16} /> 导出报表
           </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <TrendingUp size={24} />
           </div>
           <div>
              <div className="text-sm text-gray-500">订货总金额</div>
              <div className="text-2xl font-bold text-gray-900">¥{MOCK_SUMMARY_STATS.totalAmount.toLocaleString()}</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <Package size={24} />
           </div>
           <div>
              <div className="text-sm text-gray-500">订货总件数</div>
              <div className="text-2xl font-bold text-gray-900">{MOCK_SUMMARY_STATS.totalItems.toLocaleString()}</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
              <Box size={24} />
           </div>
           <div>
              <div className="text-sm text-gray-500">商品种类</div>
              <div className="text-2xl font-bold text-gray-900">{MOCK_SUMMARY_STATS.productTypes}</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Store size={24} />
           </div>
           <div>
              <div className="text-sm text-gray-500">下单门店数</div>
              <div className="text-2xl font-bold text-gray-900">{MOCK_SUMMARY_STATS.orderedStoreCount}</div>
           </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm">
           <h3 className="font-bold text-gray-900 mb-6">近7日订货趋势</h3>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_SUMMARY_STATS.trendData} barSize={40}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E6EB" />
                   <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#86909C', fontSize: 12}} dy={10} />
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <Bar dataKey="value" fill="#165DFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex flex-col">
           <h3 className="font-bold text-gray-900 mb-6">品类分布</h3>
           <div className="h-64 flex items-center">
              <div className="flex-1 h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={MOCK_SUMMARY_STATS.categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {MOCK_SUMMARY_STATS.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-40 space-y-3">
                  {MOCK_SUMMARY_STATS.categoryData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                         <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></span>
                            <span className="text-gray-600">{entry.name}</span>
                         </div>
                         <span className="font-medium">¥{entry.value.toLocaleString()}</span>
                      </div>
                  ))}
              </div>
           </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-lg border border-arco-border shadow-sm">
         <div className="p-4 border-b border-gray-100 flex items-center gap-4">
             <h3 className="font-bold text-gray-900">商品汇总清单</h3>
             <p className="text-xs text-gray-400">用于采购备货参考</p>
             <div className="ml-auto flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('product')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeTab === 'product' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <div className="flex items-center gap-1"><LayoutGrid size={14}/> 按商品统计</div>
                </button>
                <button 
                  onClick={() => setActiveTab('store')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeTab === 'store' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <div className="flex items-center gap-1"><Store size={14}/> 按门店统计</div>
                </button>
             </div>
         </div>
         
         <div className="overflow-x-auto">
           {activeTab === 'product' ? (
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                   <tr>
                      <th className="px-6 py-3 font-medium">商品名称</th>
                      <th className="px-6 py-3 font-medium">分类</th>
                      <th className="px-6 py-3 font-medium text-right">总订货量</th>
                      <th className="px-6 py-3 font-medium text-right">涉及门店数</th>
                      <th className="px-6 py-3 font-medium text-right">总金额</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {MOCK_SUMMARY_STATS.productDetails.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                         <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                         <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">{item.category}</span>
                         </td>
                         <td className="px-6 py-4 text-right text-gray-900">{item.quantity}</td>
                         <td className="px-6 py-4 text-right text-gray-900">{item.storeCount}</td>
                         <td className="px-6 py-4 text-right font-medium text-gray-900">¥{item.amount.toLocaleString()}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
           ) : (
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                   <tr>
                      <th className="px-6 py-3 font-medium">门店名称</th>
                      <th className="px-6 py-3 font-medium">区域</th>
                      <th className="px-6 py-3 font-medium text-right">商品种类</th>
                      <th className="px-6 py-3 font-medium text-right">总件数</th>
                      <th className="px-6 py-3 font-medium text-right">总金额</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {MOCK_SUMMARY_STATS.storeDetails.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                         <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                         <td className="px-6 py-4 text-gray-500">{item.region}</td>
                         <td className="px-6 py-4 text-right text-gray-900">{item.itemCount}</td>
                         <td className="px-6 py-4 text-right text-gray-900">{item.totalQty}</td>
                         <td className="px-6 py-4 text-right font-medium text-gray-900">¥{item.totalAmount.toLocaleString()}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
           )}
         </div>
      </div>
    </div>
  );
};

export default SummaryReport;