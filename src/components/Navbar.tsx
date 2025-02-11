import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bird, Key, BarChart2, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="relative">
              <Bird className="h-8 w-8 animate-float" />
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse-ring" />
            </div>
            <span className="text-xl font-bold">Kuruvi API</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 card-hover ${isActive('/')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/api-keys"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center space-x-1 card-hover ${isActive('/api-keys')}`}
            >
              <Key className="h-4 w-4 icon-spin" />
              <span>API Keys</span>
            </Link>
            <Link
              to="/usage"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center space-x-1 card-hover ${isActive('/usage')}`}
            >
              <BarChart2 className="h-4 w-4 icon-spin" />
              <span>Usage</span>
            </Link>
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center space-x-1 card-hover ${isActive('/settings')}`}
            >
              <Settings className="h-4 w-4 animate-spin-slow" />
              <span>Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 flex items-center space-x-1 hover-scale"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;