import React from 'react';
import { Activity, Key, Clock, AlertCircle, TrendingUp, Users, Zap, Shield } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <TrendingUp className="h-8 w-8 text-indigo-600 animate-float" />
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-semibold text-gray-900">1,234,567</p>
            </div>
            <div className="relative">
              <Activity className="h-8 w-8 text-indigo-600 icon-spin" />
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-pulse-ring" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active API Keys</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
            <div className="relative">
              <Key className="h-8 w-8 text-indigo-600 icon-spin" />
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-pulse-ring" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Latency</p>
              <p className="text-2xl font-semibold text-gray-900">245ms</p>
            </div>
            <div className="relative">
              <Clock className="h-8 w-8 text-indigo-600 icon-spin" />
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-pulse-ring" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Error Rate</p>
              <p className="text-2xl font-semibold text-gray-900">0.12%</p>
            </div>
            <div className="relative">
              <AlertCircle className="h-8 w-8 text-indigo-600 icon-spin" />
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full animate-pulse-ring" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-6 w-6 text-indigo-600 animate-float" />
              Active Users
            </h2>
            <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
              Last 24 hours
            </div>
          </div>
          <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg animate-gradient flex items-center justify-center">
            <Zap className="h-12 w-12 text-indigo-400 animate-spin-slow" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-600 animate-float" />
              Security Status
            </h2>
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
              All Systems Normal
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0 hover-scale">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <p className="text-sm font-medium text-gray-900">Security Check #{i}</p>
                </div>
                <span className="text-sm text-gray-500">Passed</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-indigo-600 animate-float" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0 hover-scale">
              <div>
                <p className="text-sm font-medium text-gray-900">API Request #{i}</p>
                <p className="text-sm text-gray-500">200 OK - GET /api/v1/data</p>
              </div>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;