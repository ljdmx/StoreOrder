
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import OrderList from './pages/OrderList';
import ProductList from './pages/ProductList';
import CategoryList from './pages/CategoryList';
import StoreList from './pages/StoreList';
import UserList from './pages/UserList';
import SummaryReport from './pages/SummaryReport';
import Login from './pages/Login';
import StoreApp from './pages/mobile/StoreApp';
import ProcurementApp from './pages/mobile/ProcurementApp';

// Define the view type
type View = 'dashboard' | 'orders' | 'products' | 'categories' | 'stores' | 'users' | 'summary';
type AppMode = 'admin' | 'mobile-store' | 'mobile-procurement';

const App: React.FC = () => {
  const [appMode, setAppMode] = useState<AppMode | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial auth check
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (mode: AppMode) => {
    setAppMode(mode);
  };

  const handleLogout = () => {
    setAppMode(null);
    setCurrentView('dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!appMode) {
    return <Login onLogin={handleLogin} />;
  }

  // Mobile App Container
  if (appMode === 'mobile-store' || appMode === 'mobile-procurement') {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white w-full max-w-[375px] h-[812px] rounded-[30px] border-8 border-gray-900 shadow-2xl overflow-hidden relative">
           {/* Phone Notch Mock */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-xl z-50"></div>
           
           {appMode === 'mobile-store' ? <StoreApp /> : <ProcurementApp />}
        </div>
        
        <button 
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        >
          退出模拟器
        </button>
      </div>
    );
  }

  // PC Admin Portal
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <OrderList />;
      case 'products': return <ProductList />;
      case 'categories': return <CategoryList />;
      case 'stores': return <StoreList />;
      case 'users': return <UserList />;
      case 'summary': return <SummaryReport />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onChangeView={setCurrentView}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
