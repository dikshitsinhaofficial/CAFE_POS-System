import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, BarChart3 } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'POS' },
    { path: '/menu', icon: Utensils, label: 'Menu' },
    { path: '/sales', icon: BarChart3, label: 'Sales' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Utensils size={32} />
              <h1 className="text-2xl font-bold">My POS</h1>
            </div>
            
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive ? 'bg-white text-purple-700' : 'hover:bg-purple-600'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Layout;