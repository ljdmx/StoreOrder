
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Package,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List,
  MoreVertical,
  Scale
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../services/mockData';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = MOCK_PRODUCTS.length;
  const activeProducts = MOCK_PRODUCTS.filter(p => p.isActive).length;
  const inactiveProducts = totalProducts - activeProducts;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-arco-text-title">商品管理</h2>
      </div>

      {/* Top Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Package size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
              <div className="text-sm text-gray-500">商品总数</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <CheckCircle size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{activeProducts}</div>
              <div className="text-sm text-gray-500">已上架</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <XCircle size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{inactiveProducts}</div>
              <div className="text-sm text-gray-500">已下架</div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg border border-arco-border shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-arco-border flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索商品名称、编号..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent hover:bg-white hover:border-arco-primary/50 focus:bg-white focus:border-arco-primary rounded transition-all outline-none text-sm"
              />
            </div>
            <div className="flex gap-2">
               {['全部', '叶菜类', '根茎类', '豆类', '调味类', '肉类', '海鲜类'].map(cat => (
                 <button key={cat} className="px-3 py-1.5 text-sm rounded hover:bg-gray-100 text-gray-600 transition-colors border border-transparent hover:border-gray-200">
                   {cat}
                 </button>
               ))}
            </div>
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
               <Plus size={18} /> 新增商品
             </button>
          </div>
        </div>

        {/* Views */}
        <div className="bg-gray-50/30">
        {viewMode === 'list' ? (
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                    <th className="px-6 py-4 font-medium w-20">商品编号</th>
                    <th className="px-6 py-4 font-medium">商品名称</th>
                    <th className="px-6 py-4 font-medium">规格</th>
                    <th className="px-6 py-4 font-medium">分类</th>
                    <th className="px-6 py-4 font-medium">单位</th>
                    <th className="px-6 py-4 font-medium">单价</th>
                    <th className="px-6 py-4 font-medium">下限/上限</th>
                    <th className="px-6 py-4 font-medium text-center">状态</th>
                    <th className="px-6 py-4 font-medium text-right">操作</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                {filteredProducts.map((product, idx) => (
                    <tr key={product.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-500">P00{idx + 1}</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt="" className="w-10 h-10 rounded bg-gray-100 object-cover" />
                        <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.spec}</td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded font-medium">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.unit}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">¥{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.minOrder} - {product.maxOrder}</td>
                    <td className="px-6 py-4 text-center">
                        <div className={`relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full border-2 cursor-pointer align-middle ${product.isActive ? 'bg-blue-600 border-blue-600' : 'bg-gray-200 border-gray-200'}`}>
                        <span className={`inline-block w-4 h-4 transform transition duration-200 ease-in-out bg-white rounded-full ${product.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className="text-gray-500 hover:text-blue-600 flex items-center justify-end gap-1 ml-auto text-sm">
                        <Edit3 size={14} /> 编辑
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : (
            // Updated Grid: added 2xl:grid-cols-6 and xl:grid-cols-5
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {filteredProducts.map((product, idx) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                            <img src={product.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            {!product.isActive && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <span className="bg-gray-800 text-white px-3 py-1 text-xs rounded-full">已下架</span>
                                </div>
                            )}
                             <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-blue-600">
                                <Edit3 size={16} />
                            </button>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs text-gray-400">P00{idx + 1}</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{product.category}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{product.spec}</p>
                            
                            {/* Min/Max Order Display Optimization */}
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 bg-gray-50 px-2 py-1 rounded w-fit border border-gray-100">
                                <Scale size={12} className="text-gray-400" />
                                <span>起订: <span className="text-gray-700 font-medium">{product.minOrder}</span></span>
                                <span className="w-[1px] h-3 bg-gray-300"></span>
                                <span>限购: <span className="text-gray-700 font-medium">{product.maxOrder}</span></span>
                            </div>

                            <div className="mt-auto flex items-end justify-between">
                                <span className="text-lg font-bold text-blue-600">¥{product.price}</span>
                                <div className={`relative inline-block w-8 h-4 transition duration-200 ease-in-out rounded-full border-2 cursor-pointer ${product.isActive ? 'bg-blue-600 border-blue-600' : 'bg-gray-200 border-gray-200'}`}>
                                    <span className={`inline-block w-3 h-3 transform transition duration-200 ease-in-out bg-white rounded-full ${product.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-white rounded-b-lg">
            <span className="text-sm text-gray-500 py-2 px-2">共 {filteredProducts.length} 条</span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
