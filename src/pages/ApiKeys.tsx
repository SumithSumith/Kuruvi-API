import React, { useState } from 'react';
import { Key, Copy, Trash2, Infinity } from 'lucide-react';

const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([
    { 
      id: 1, 
      name: 'Production Key', 
      key: 'kuruvi_prod_1234567890', 
      created: '2024-03-15', 
      lastUsed: '2024-03-20',
      type: 'unlimited'
    },
    { 
      id: 2, 
      name: 'Development Key', 
      key: 'kuruvi_dev_0987654321', 
      created: '2024-03-10', 
      lastUsed: '2024-03-19',
      type: 'unlimited'
    },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteKey = (id: number) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2">
          <Key className="h-4 w-4" />
          <span>Create New Key</span>
        </button>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-center space-x-2">
        <Infinity className="h-5 w-5 text-indigo-600" />
        <p className="text-sm text-indigo-600">
          <span className="font-medium">Unlimited Plan:</span> All API keys have unlimited access with no rate limiting
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th className="pb-4">Name</th>
                <th className="pb-4">API Key</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Created</th>
                <th className="pb-4">Last Used</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.id}>
                  <td className="py-4">
                    <span className="font-medium text-gray-900">{key.name}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{key.key}</code>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1 text-indigo-600">
                      <Infinity className="h-4 w-4" />
                      <span className="text-sm font-medium">Unlimited</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500">{key.created}</td>
                  <td className="py-4 text-gray-500">{key.lastUsed}</td>
                  <td className="py-4">
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;