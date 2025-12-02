import React from 'react';
import { X, Clock, User, Store, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Approved: return 'text-green-600 bg-green-50';
      case OrderStatus.Auditing: return 'text-blue-600 bg-blue-50';
      case OrderStatus.Submitted: return 'text-orange-600 bg-orange-50';
      case OrderStatus.Rejected: return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Approved: return '已审核';
      case OrderStatus.Auditing: return '审核中';
      case OrderStatus.Submitted: return '已下单';
      case OrderStatus.Pending: return '未下单';
      case OrderStatus.Rejected: return '已退回';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">订单详情</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">订单号: {order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Store size={16} /> <span className="text-sm font-medium">门店信息</span>
              </div>
              <div className="font-bold text-gray-900">{order.storeName}</div>
              <div className="text-sm text-gray-500">{order.storeRegion}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock size={16} /> <span className="text-sm font-medium">时间信息</span>
              </div>
              <div className="text-sm text-gray-900"><span className="text-gray-500">下单:</span> {order.orderDate}</div>
              {order.timeline && order.timeline.some(t => t.title.includes('审核')) && (
                 <div className="text-sm text-gray-900"><span className="text-gray-500">审核:</span> {order.timeline.find(t => t.title.includes('审核'))?.time}</div>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <User size={16} /> <span className="text-sm font-medium">人员信息</span>
              </div>
              <div className="text-sm text-gray-900"><span className="text-gray-500">负责人:</span> 张三</div>
              <div className="text-sm text-gray-900"><span className="text-gray-500">审核人:</span> {order.auditorName || '-'}</div>
            </div>
          </div>

          {/* Product Table */}
          <h4 className="font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">商品明细</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">商品名称</th>
                  <th className="px-4 py-3 font-medium text-gray-600">规格/单位</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">下单数量</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">审核数量</th>
                  <th className="px-4 py-3 font-medium text-gray-600">单价</th>
                  <th className="px-4 py-3 font-medium text-gray-600">备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => {
                    const isChanged = item.quantityApproved !== undefined && item.quantityApproved !== item.quantityOrdered;
                    return (
                      <tr key={idx} className={`hover:bg-gray-50 ${isChanged ? 'bg-yellow-50/50' : ''}`}>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.productName}</td>
                        <td className="px-4 py-3 text-gray-500">{item.spec} / {item.unit}</td>
                        <td className="px-4 py-3 text-center">{item.quantityOrdered}</td>
                        <td className="px-4 py-3 text-center font-bold">
                          {item.quantityApproved !== undefined ? (
                            <span className={isChanged ? 'text-orange-600' : 'text-green-600'}>
                              {item.quantityApproved}
                            </span>
                          ) : '-'}
                        </td>
                        <td className="px-4 py-3">¥{item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {item.remark && (
                             <div className="flex items-center gap-1 text-orange-600 text-xs">
                               <AlertCircle size={12} /> {item.remark}
                             </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">暂无商品明细</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-right">
               <span className="text-gray-500 mr-4">共 {order.items?.length || 0} 种商品</span>
               <span className="font-bold text-lg text-blue-600">合计: {order.totalQuantity} 件</span>
            </div>
          </div>

          {/* Timeline */}
          {order.timeline && (
            <>
              <h4 className="font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">订单进度</h4>
              <div className="pl-2">
                {order.timeline.map((event, idx) => (
                  <div key={idx} className="relative pl-8 pb-6 last:pb-0">
                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 
                      ${event.status === 'completed' ? 'bg-blue-600' : event.status === 'processing' ? 'bg-blue-400' : 'bg-gray-300'}"
                      style={{backgroundColor: event.status === 'completed' ? '#165DFF' : event.status === 'processing' ? '#0FC6C2' : '#E5E6EB'}}
                    ></div>
                    {idx !== order.timeline!.length - 1 && (
                      <div className="absolute left-[5px] top-4 w-0.5 h-full bg-gray-200"></div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="font-medium text-gray-900">{event.title}</span>
                      <span className="text-xs text-gray-400">{event.time}</span>
                    </div>
                    {event.description && <p className="text-sm text-gray-500 mt-1">{event.description}</p>}
                    {event.user && <p className="text-xs text-gray-400 mt-1">操作人: {event.user}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white transition-colors">关闭</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors shadow-sm">打印订单</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;