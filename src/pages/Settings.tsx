import React from 'react';
import { Save, Infinity } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">API Settings</h2>
            <div className="flex items-center space-x-2 text-indigo-600">
              <Infinity className="h-5 w-5" />
              <span className="font-medium">Unlimited Plan Active</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-indigo-800 mb-2">Unlimited API Access</h3>
              <p className="text-sm text-indigo-600">Your account has unlimited API access with no rate limiting.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">IP Whitelist</label>
              <div className="mt-1">
                <textarea
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter IP addresses (one per line)"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Optional: Restrict API access to specific IP addresses</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
              <div className="mt-1">
                <input
                  type="url"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">URL to receive webhook notifications</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Log Retention (days)</label>
              <div className="mt-1">
                <input
                  type="number"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="30"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Number of days to retain API logs</p>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;