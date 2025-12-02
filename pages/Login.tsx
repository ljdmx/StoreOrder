import React, { useState } from 'react';
import { Smartphone, Monitor, ShoppingBag, ClipboardList } from 'lucide-react';

interface LoginProps {
  onLogin: (mode: 'admin' | 'mobile-store' | 'mobile-procurement') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<'password' | 'qrcode'>('password');

  return (
    <div className="min-h-screen bg-[#F2F3F5] flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-arco-primary/10 -skew-y-3 origin-top-left transform"></div>
      
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md z-10 mx-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-arco-primary text-white font-bold text-2xl mb-4">
            日
          </div>
          <h1 className="text-2xl font-bold text-gray-900">日新达订货系统</h1>
          <p className="text-gray-500 mt-2">请选择登录端口或角色</p>
        </div>

        {/* Prototype Entry Points */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => onLogin('mobile-store')}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
             <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-600 group-hover:text-white transition-colors">
               <ShoppingBag size={20} />
             </div>
             <span className="text-sm font-bold text-gray-700">门店端小程序</span>
             <span className="text-xs text-gray-400 mt-1">模拟手机预览</span>
          </button>
          
          <button 
            onClick={() => onLogin('mobile-procurement')}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
             <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-600 group-hover:text-white transition-colors">
               <ClipboardList size={20} />
             </div>
             <span className="text-sm font-bold text-gray-700">采购端小程序</span>
             <span className="text-xs text-gray-400 mt-1">模拟手机预览</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">PC 管理后台登录</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* PC Login Form */}
        <div className="mt-4">
           {method === 'password' ? (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin('admin'); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">管理员账号</label>
                <input 
                  type="text" 
                  defaultValue="admin"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-arco-primary/20 focus:border-arco-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-arco-primary/20 focus:border-arco-primary outline-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-arco-primary hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Monitor size={18} /> 进入管理后台
              </button>
            </form>
          ) : null}
        </div>
      </div>
      
      <div className="absolute bottom-6 text-center text-gray-400 text-xs">
        &copy; 2023 日新达订货系统. All rights reserved.
      </div>
    </div>
  );
};

export default Login;