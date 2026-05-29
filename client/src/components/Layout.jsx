import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, BarChart3, Sun, Moon } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const navItems = [
    { path: '/', icon: Home, label: 'POS' },
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <nav className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 shadow-sm sticky top-0 z-50">
        <div className={`${location.pathname === '/' ? 'w-full px-6' : 'max-w-7xl mx-auto px-4'}`}>
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-11 h-11 bg-gradient-to-tr from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105 duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping opacity-75"></span>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-glow"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-surface-900 dark:text-white leading-none">
                  DESI CAFE
                </span>
                <span className="text-[8px] font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase leading-none mt-1">
                  Premium Spice POS
                </span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-8">
              <div className="flex space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Theme Toggle Slider */}
              <div 
                onClick={() => setIsDark(!isDark)}
                className="theme-slider"
              >
                <div className="theme-slider-thumb">
                  {isDark ? <Moon size={12} className="text-primary-600" /> : <Sun size={12} className="text-primary-500" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className={`${location.pathname === '/' ? 'w-full px-6 py-4' : 'max-w-7xl mx-auto p-6'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;