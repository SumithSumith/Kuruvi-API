import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

const Usage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">API Usage</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Request Volume</h2>
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Response Times</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Details</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th className="pb-4">Endpoint</th>
                <th className="pb-4">Requests</th>
                <th className="pb-4">Avg. Response Time</th>
                <th className="pb-4">Error Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { endpoint: '/api/v1/data', requests: '45,678', avgResponse: '235ms', errorRate: '0.1%' },
                { endpoint: '/api/v1/users', requests: '23,456', avgResponse: '189ms', errorRate: '0.2%' },
                { endpoint: '/api/v1/auth', requests: '12,345', avgResponse: '156ms', errorRate: '0.3%' },
              ].map((item, i) => (
                <tr key={i}>
                  <td className="py-4">
                    <code className="text-sm">{item.endpoint}</code>
                  </td>
                  <td className="py-4 text-gray-900">{item.requests}</td>
                  <td className="py-4 text-gray-900">{item.avgResponse}</td>
                  <td className="py-4 text-gray-900">{item.errorRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Usage;