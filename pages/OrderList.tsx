
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  MoreHorizontal,
  LayoutGrid,
  List,
  ShoppingCart,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MOCK_ORDERS } from '../services/mockData';
import { Order, OrderStatus } from '../types';
import OrderDetailModal from '../components/OrderDetailModal';

const OrderList: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  // Statistics Calculation
  const stats = {
    total: MOCK_ORDERS.length,
    pending: MOCK_ORDERS.filter(o => o.status === OrderStatus.Submitted).length,
    auditing: MOCK_ORDERS.filter(o => o.status === OrderStatus.Auditing).length,
    approved: MOCK_ORDERS.filter(o => o.status === OrderStatus.Approved).length,
  };

  const toggleExpand = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Approved:
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium flex items-center w-fit gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>已审核</span>;
      case OrderStatus.Auditing:
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center w-fit gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>审核中</span>;
      case OrderStatus.Pending:
        return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium flex items-center w-fit gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>未下单</span>;
      case OrderStatus.Submitted:
        return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium flex items-center w-fit gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>待审核</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">未知状态</span>;
    }
  };

  const statusLabels: Record<string, string> = {
      'all': '全部状态',
      [OrderStatus.Submitted]: '已下单',
      [OrderStatus.Auditing]: '审核中',
      [OrderStatus.Approved]: '已审核',
      [OrderStatus.Pending]: '未下单',
  };

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.storeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-arco-text-title">订单管理</h2>
      </div>

      {/* Top Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <ShoppingCart size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">全部订单</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
              <AlertCircle size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-500">待审核</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Clock size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{stats.auditing}</div>
              <div className="text-sm text-gray-500">审核中</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <CheckCircle2 size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{stats.approved}</div>
              <div className="text-sm text-gray-500">已完成</div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-arco-border shadow-sm min-h-[600px] flex flex-col">
        {/* Header & Filters */}
        <div className="p-5 border-b border-arco-border space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
                <div className="relative">
                <input 
                    type="text" 
                    placeholder="搜索门店名称或订单号..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-arco-border rounded w-64 text-sm focus:border-arco-primary focus:ring-1 focus:ring-arco-primary outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>

                <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 border border-arco-border rounded bg-white text-sm hover:border-arco-primary transition-colors text-arco-text-body">
                    <Filter size={16} />
                    <span>{statusLabels[filterStatus] || filterStatus}</span>
                    <ChevronDown size={14} className="text-gray-400" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-100 shadow-lg rounded-md hidden group-hover:block z-10 py-1">
                    {['all', OrderStatus.Submitted, OrderStatus.Auditing, OrderStatus.Approved, OrderStatus.Pending].map(s => (
                    <div 
                        key={s} 
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-arco-text-body"
                        onClick={() => setFilterStatus(s)}
                    >
                        {statusLabels[s] || s}
                    </div>
                    ))}
                </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                 {/* View Toggle */}
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
                <div className="h-4 w-[1px] bg-gray-300"></div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-arco-border rounded hover:bg-gray-50 text-sm font-medium text-arco-text-body transition-colors">
                  <Download size={16} /> 导出
                </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50/50">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Search size={48} className="text-gray-200 mb-4" />
                <p>没有找到符合条件的订单</p>
            </div>
          ) : viewMode === 'list' ? (
            // LIST VIEW (Collapsible Table)
            <table className="w-full text-left border-collapse bg-white">
                <thead className="sticky top-0 bg-gray-50 z-10 border-b border-arco-border">
                <tr className="text-arco-text-sub text-xs uppercase">
                    <th className="px-6 py-4 font-medium w-12"></th>
                    <th className="px-6 py-4 font-medium">订单号</th>
                    <th className="px-6 py-4 font-medium">门店名称</th>
                    <th className="px-6 py-4 font-medium">下单时间</th>
                    <th className="px-6 py-4 font-medium">商品概览</th>
                    <th className="px-6 py-4 font-medium">订单状态</th>
                    <th className="px-6 py-4 font-medium">审核人</th>
                    <th className="px-6 py-4 font-medium text-right">操作</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map((order) => {
                        const isExpanded = expandedOrders.has(order.id);
                        return (
                            <React.Fragment key={order.id}>
                                <tr className={`hover:bg-blue-50/30 transition-colors ${isExpanded ? 'bg-blue-50/10' : ''}`}>
                                    <td className="px-6 py-4 text-center cursor-pointer" onClick={() => toggleExpand(order.id)}>
                                        <button className="text-gray-400 hover:text-arco-primary transition-colors">
                                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-arco-text-title">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-arco-text-title">{order.storeName}</div>
                                        <div className="text-xs text-gray-400">{order.storeRegion}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-arco-text-body">{order.orderDate}</td>
                                    <td className="px-6 py-4 text-sm text-arco-text-body">
                                        {order.itemCount > 0 ? (
                                        <span className="font-medium">{order.totalQuantity} 件 <span className="text-gray-400 text-xs">({order.itemCount} 种)</span></span>
                                        ) : (
                                        <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(order.status)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-arco-text-body">
                                        {order.auditorName || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            className="text-arco-primary hover:text-blue-700 text-sm font-medium mr-3"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            详情
                                        </button>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                                {/* Expanded Child Row */}
                                {isExpanded && (
                                    <tr className="bg-gray-50/50">
                                        <td colSpan={8} className="px-6 py-4 shadow-inner">
                                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
                                                        <tr>
                                                            <th className="px-4 py-2 font-medium">商品名称</th>
                                                            <th className="px-4 py-2 font-medium">规格</th>
                                                            <th className="px-4 py-2 font-medium text-center">订货数量</th>
                                                            <th className="px-4 py-2 font-medium text-center">实发数量</th>
                                                            <th className="px-4 py-2 font-medium">单价</th>
                                                            <th className="px-4 py-2 font-medium">备注</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {order.items.map((item, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-2 text-gray-900 font-medium">{item.productName}</td>
                                                                <td className="px-4 py-2 text-gray-500">{item.spec}/{item.unit}</td>
                                                                <td className="px-4 py-2 text-center text-gray-900">{item.quantityOrdered}</td>
                                                                <td className={`px-4 py-2 text-center font-bold ${item.quantityApproved !== undefined && item.quantityApproved !== item.quantityOrdered ? 'text-orange-500' : 'text-green-600'}`}>
                                                                    {item.quantityApproved ?? '-'}
                                                                </td>
                                                                <td className="px-4 py-2 text-gray-500">¥{item.price}</td>
                                                                <td className="px-4 py-2 text-gray-500 text-xs">{item.remark || '-'}</td>
                                                            </tr>
                                                        ))}
                                                        {order.items.length === 0 && (
                                                            <tr><td colSpan={6} className="px-4 py-2 text-center text-gray-400">无商品明细</td></tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
          ) : (
            // CARD VIEW
            // Updated grid for 2xl screens
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white border border-arco-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900 line-clamp-1">{order.storeName}</h3>
                                <p className="text-xs text-gray-500 mt-1">{order.id}</p>
                            </div>
                            {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="space-y-3 flex-1">
                            <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                                <span className="text-gray-500">下单时间</span>
                                <span className="text-gray-900">{order.orderDate.split(' ')[0]}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                                <span className="text-gray-500">商品种类</span>
                                <span className="text-gray-900">{order.itemCount} 种</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                                <span className="text-gray-500">总件数</span>
                                <span className="text-lg font-bold text-blue-600">{order.totalQuantity}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                             <button 
                                onClick={() => setSelectedOrder(order)}
                                className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded text-sm font-medium transition-colors"
                            >
                                查看详情
                             </button>
                             {order.status === OrderStatus.Submitted && (
                                 <button className="flex-1 py-2 bg-arco-primary hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
                                     审核
                                 </button>
                             )}
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-arco-border flex justify-between items-center bg-gray-50 rounded-b-lg">
          <span className="text-sm text-gray-500">显示 1 到 {filteredOrders.length} 共 {filteredOrders.length} 条</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded bg-white text-gray-400 text-sm disabled:opacity-50" disabled>上一页</button>
            <button className="px-3 py-1 border border-arco-primary bg-arco-primary text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white text-gray-600 hover:bg-gray-50 text-sm">下一页</button>
          </div>
        </div>
      </div>
      
      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrderList;
