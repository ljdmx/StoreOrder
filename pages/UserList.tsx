import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Shield, User, Lock, Edit3 } from 'lucide-react';
import { MOCK_USERS } from '../services/mockData';

const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.includes(searchTerm) || user.role.includes(searchTerm)
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold border border-purple-200">管理员</span>;
      case 'auditor':
        return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold border border-blue-200">审核员</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-bold border border-gray-200">查看员</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">权限管理</h2>
          <p className="text-gray-500 text-sm mt-1">管理后台用户、角色分配及账号状态。</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm flex items-center gap-2 transition-colors">
          <Plus size={18} /> 新增用户
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-wrap gap-4 justify-between items-center">
          <div className="relative max-w-sm w-full">
            <input 
              type="text" 
              placeholder="搜索用户姓名或手机号..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">全部角色</button>
            <button className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">状态筛选</button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4 w-64">用户信息</th>
              <th className="px-6 py-4">角色权限</th>
              <th className="px-6 py-4">联系方式</th>
              <th className="px-6 py-4">账号状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt="" className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-400">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === 'admin' ? <Shield size={14} className="text-purple-500"/> : <User size={14} className="text-blue-500"/>}
                    {getRoleBadge(user.role)}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                  {user.phone}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {user.status === 'active' ? '已启用' : '已禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600 transition-colors" title="编辑">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-orange-600 transition-colors" title="重置密码">
                      <Lock size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;