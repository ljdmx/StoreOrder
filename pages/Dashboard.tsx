
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { MOCK_STATS, CHART_DATA_TREND, CHART_DATA_PRODUCTS, MOCK_STORES } from '../services/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  color: 'primary' | 'success' | 'warning' | 'error';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, trend, color }) => {
  const colorMap = {
    primary: 'bg-blue-50 text-blue-600',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-orange-50 text-orange-600',
    error: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-arco-text-sub text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-arco-text-title">{value}</h3>
          {subValue && (
            <p className={`text-xs mt-2 flex items-center gap-1 ${trend === 'up' ? 'text-arco-success' : 'text-arco-error'}`}>
              {trend === 'up' ? '↑' : '↓'} {subValue}
              <span className="text-gray-400 ml-1">较昨日</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Date Filter & Header (Simulated) */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-arco-text-title">数据概览</h2>
        <div className="bg-white rounded-md border border-arco-border p-1 flex text-sm">
          <button className="px-3 py-1 bg-gray-100 rounded text-arco-text-title font-medium">今日</button>
          <button className="px-3 py-1 text-arco-text-body hover:bg-gray-50 rounded">本周</button>
          <button className="px-3 py-1 text-arco-text-body hover:bg-gray-50 rounded">本月</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="已下单门店" 
          value={MOCK_STATS.orderedStores} 
          subValue="12%" 
          trend="up" 
          icon={ShoppingBag} 
          color="primary" 
        />
        <StatCard 
          title="待审核订单" 
          value="15" 
          subValue="2" 
          trend="down" 
          icon={AlertCircle} 
          color="warning" 
        />
        <StatCard 
          title="订货总件数" 
          value={MOCK_STATS.totalItemsOrdered.toLocaleString()} 
          subValue="5%" 
          trend="up" 
          icon={TrendingUp} 
          color="success" 
        />
        <StatCard 
          title="未下单门店" 
          value={MOCK_STATS.notOrderedStores} 
          subValue="3 家" 
          trend="down" 
          icon={CheckCircle2} 
          color="error" 
        />
      </div>

      {/* Charts Section */}
      {/* Updated grid for 2xl screens to give more space to the trend chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm lg:col-span-2 2xl:col-span-3">
          <h3 className="text-lg font-bold text-arco-text-title mb-6">订货趋势 (近7日)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E6EB" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#86909C', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#86909C', fontSize: 12}} 
                />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#165DFF" 
                  strokeWidth={3} 
                  dot={{r: 4, strokeWidth: 2, fill: '#fff'}} 
                  activeDot={{r: 6}} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm col-span-1">
          <h3 className="text-lg font-bold text-arco-text-title mb-6">热门商品 (今日)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA_PRODUCTS} layout="vertical" margin={{left: 20}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E6EB" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#4E5969', fontSize: 13, fontWeight: 500}} 
                  width={80}
                />
                <Tooltip 
                  cursor={{fill: '#F7F8FA'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar 
                  dataKey="value" 
                  fill="#165DFF" 
                  radius={[0, 4, 4, 0]} 
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Simple Store List */}
      <div className="bg-white rounded-lg border border-arco-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-arco-border flex justify-between items-center">
          <h3 className="text-lg font-bold text-arco-text-title">门店订货状态</h3>
          <button className="text-arco-primary text-sm hover:underline">查看全部</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-arco-text-sub text-xs uppercase">
                <th className="px-6 py-3 font-medium">门店名称</th>
                <th className="px-6 py-3 font-medium">区域</th>
                <th className="px-6 py-3 font-medium">负责人</th>
                <th className="px-6 py-3 font-medium">最后下单</th>
                <th className="px-6 py-3 font-medium">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_STORES.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-arco-text-title">{store.name}</td>
                  <td className="px-6 py-4 text-sm text-arco-text-body">{store.region}</td>
                  <td className="px-6 py-4 text-sm text-arco-text-body">
                    {store.managerName}
                    <div className="text-xs text-gray-400">{store.managerPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-arco-text-body">{store.lastOrderDate || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      store.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {store.status === 'active' ? '营业中' : '已停业'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
