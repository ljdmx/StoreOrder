
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Store, 
  Users, 
  Bell, 
  Search, 
  LogOut, 
  Menu,
  ChevronLeft,
  ClipboardList,
  Tag,
  Layers
} from 'lucide-react';
import { MOCK_USER } from '../services/mockData';

type View = 'dashboard' | 'orders' | 'products' | 'categories' | 'stores' | 'users' | 'summary';

interface LayoutProps {
  currentView: View;
  onChangeView: (view: View) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, onLogout, children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: '数据看板', icon: LayoutDashboard },
    { id: 'orders', label: '订单管理', icon: ShoppingCart },
    { id: 'products', label: '商品管理', icon: Package },
    { id: 'categories', label: '商品分类', icon: Layers }, // Updated icon and ensured 4 chars
    { id: 'stores', label: '门店列表', icon: Store },
    { id: 'summary', label: '清单汇总', icon: ClipboardList },
    { id: 'users', label: '权限管理', icon: Users },
  ];

  return (
    <div className="flex h-screen w-full bg-arco-bg overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-arco-border flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b border-arco-border">
          <div className="flex items-center gap-2 text-arco-primary font-bold text-xl overflow-hidden px-4">
             <div className="w-8 h-8 rounded bg-arco-primary flex-shrink-0 flex items-center justify-center text-white">日</div>
             {!isSidebarCollapsed && <span className="whitespace-nowrap transition-opacity duration-300">日新达订货</span>}
          </div>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as View)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                currentView === item.id 
                  ? 'bg-arco-primary/10 text-arco-primary font-medium' 
                  : 'text-arco-text-body hover:bg-gray-100'
              }`}
              title={isSidebarCollapsed ? item.label : ''}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!isSidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-arco-border">
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="flex items-center justify-center w-full p-2 text-arco-text-sub hover:bg-gray-100 rounded-md"
          >
            {isSidebarCollapsed ? <Menu size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span>收起菜单</span></div>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-arco-border flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center text-arco-text-title font-medium text-lg">
             {navItems.find(n => n.id === currentView)?.label}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="搜索..." 
                className="pl-9 pr-4 py-1.5 rounded-full bg-gray-100 text-sm border-none focus:ring-2 focus:ring-arco-primary/50 outline-none w-64 text-arco-text-body"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>

            <div className="relative cursor-pointer">
              <Bell size={20} className="text-arco-text-body hover:text-arco-primary transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-arco-error rounded-full animate-pulse"></span>
            </div>

            <div className="h-8 w-[1px] bg-gray-200"></div>

            <div className="flex items-center gap-3 group relative">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-arco-text-title">{MOCK_USER.name}</div>
                <div className="text-xs text-arco-text-sub uppercase">{MOCK_USER.role}</div>
              </div>
              <img 
                src={MOCK_USER.avatar} 
                alt="Avatar" 
                className="w-9 h-9 rounded-full border border-gray-200 object-cover cursor-pointer"
              />
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 hidden group-hover:block hover:block transform origin-top-right transition-all">
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} /> 退出登录
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Scrollable Area */}
        <div className="flex-1 overflow-auto bg-arco-bg custom-scrollbar">
          {/* Removed max-w constraint, added fluid padding */}
          <div className="w-full h-full p-4 md:p-6 lg:p-8">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
