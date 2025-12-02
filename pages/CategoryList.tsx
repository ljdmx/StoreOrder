
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  Folder, 
  ChevronRight, 
  ChevronDown, 
  Edit3, 
  MoreHorizontal,
  Tag,
  Layers,
  Box
} from 'lucide-react';
import { MOCK_CATEGORIES } from '../services/mockData';
import { Category } from '../types';

const CategoryList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(MOCK_CATEGORIES.map(c => c.id)));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const totalCategories = MOCK_CATEGORIES.length;
  const subCategoriesCount = MOCK_CATEGORIES.reduce((acc, curr) => acc + (curr.children?.length || 0), 0);
  const totalItems = MOCK_CATEGORIES.reduce((acc, curr) => acc + curr.productCount + (curr.children?.reduce((a, c) => a + c.productCount, 0) || 0), 0);

  const filteredCategories = MOCK_CATEGORIES.filter(cat => 
    cat.name.includes(searchTerm) || 
    cat.children?.some(child => child.name.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-arco-text-title">商品分类</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Folder size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{totalCategories}</div>
              <div className="text-sm text-gray-500">一级分类</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
              <Tag size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{subCategoriesCount}</div>
              <div className="text-sm text-gray-500">二级分类</div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-arco-border shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <Box size={24} />
           </div>
           <div>
              <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
              <div className="text-sm text-gray-500">商品总数</div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-arco-border shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-arco-border flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索分类名称..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent hover:bg-white hover:border-arco-primary/50 focus:bg-white focus:border-arco-primary rounded transition-all outline-none text-sm"
              />
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
               <Plus size={18} /> 新增分类
             </button>
          </div>
        </div>

        {/* Views */}
        <div className="bg-gray-50/30">
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium w-64">分类名称</th>
                    <th className="px-6 py-4 font-medium">分类编码</th>
                    <th className="px-6 py-4 font-medium">商品数量</th>
                    <th className="px-6 py-4 font-medium">排序</th>
                    <th className="px-6 py-4 font-medium text-center">状态</th>
                    <th className="px-6 py-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCategories.map((cat) => (
                    <React.Fragment key={cat.id}>
                      {/* Parent Row */}
                      <tr className="hover:bg-blue-50/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand(cat.id)}>
                             <button className="text-gray-400 hover:text-blue-600 transition-colors">
                               {expandedCategories.has(cat.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                             </button>
                             <Folder size={18} className="text-blue-500 fill-blue-50" />
                             <span className="font-bold text-gray-800">{cat.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">{cat.code}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{cat.productCount + (cat.children?.reduce((a,c)=>a+c.productCount,0) || 0)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{cat.sort}</td>
                        <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">已启用</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                             <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"><Plus size={14}/> 添加子类</button>
                             <button className="text-gray-500 hover:text-gray-700"><Edit3 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                      {/* Children Rows */}
                      {expandedCategories.has(cat.id) && cat.children?.map(child => (
                        <tr key={child.id} className="bg-gray-50/40 hover:bg-blue-50/20">
                           <td className="px-6 py-3 pl-14">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                 <span className="text-gray-600 text-sm">{child.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-3 text-sm text-gray-400 font-mono">{child.code}</td>
                           <td className="px-6 py-3 text-sm text-gray-500">{child.productCount}</td>
                           <td className="px-6 py-3 text-sm text-gray-500">{child.sort}</td>
                           <td className="px-6 py-3 text-center">
                               <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">已启用</span>
                           </td>
                           <td className="px-6 py-3 text-right">
                              <div className="flex justify-end gap-3">
                                 <button className="text-gray-400 hover:text-gray-600"><Edit3 size={14} /></button>
                                 <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Updated grid for 2xl screens
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
               {filteredCategories.map(cat => (
                 <div key={cat.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-50">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                             <Layers size={20} />
                          </div>
                          <div>
                             <h3 className="font-bold text-gray-900 text-lg">{cat.name}</h3>
                             <div className="text-xs text-gray-400 mt-0.5 font-mono">{cat.code}</div>
                          </div>
                       </div>
                       <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={18} />
                       </button>
                    </div>

                    <div className="mb-4 flex-1">
                       <h4 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                         <Tag size={12} /> 二级子分类
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {cat.children?.map(child => (
                            <span key={child.id} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-md border border-gray-200 flex items-center gap-2 group/tag hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer">
                               {child.name}
                               <span className="min-w-[1.25rem] h-5 rounded-full bg-white text-xs flex items-center justify-center text-gray-400 group-hover/tag:text-blue-500 shadow-sm border border-gray-100 px-1">{child.productCount}</span>
                            </span>
                          ))}
                          <button className="px-3 py-1.5 border border-dashed border-gray-300 rounded-md text-gray-400 text-sm hover:border-blue-400 hover:text-blue-500 flex items-center gap-1 transition-colors bg-white">
                             <Plus size={14} /> 添加
                          </button>
                       </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm mt-auto">
                       <div className="text-gray-500">
                          商品总数: <span className="font-bold text-gray-900 ml-1">{cat.productCount + (cat.children?.reduce((a,c)=>a+c.productCount,0) || 0)}</span>
                       </div>
                       <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1">
                          查看详情 <ChevronRight size={12} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
