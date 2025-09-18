import React from 'react';
import { isApiConfigured, DEFAULT_CREDENTIALS } from '../../utils/apiConfig';

const ApiStatus: React.FC = () => {
  const isConfigured = isApiConfigured();

  return (
    <div className={`p-4 rounded-lg mb-4 ${
      isConfigured 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-yellow-50 border border-yellow-200'
    }`}>
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded-full mr-2 ${
          isConfigured ? 'bg-green-500' : 'bg-yellow-500'
        }`} />
        <h3 className="font-semibold text-sm">
          {isConfigured ? 'API Connected' : 'API Not Configured'}
        </h3>
      </div>
      
      {isConfigured ? (
        <div className="text-sm text-green-700">
          <p>✅ Connected to real API endpoints</p>
          <div className="mt-2 p-2 bg-green-100 rounded">
            <p className="font-medium mb-1">Test Credentials:</p>
            <div className="space-y-1 text-xs">
              <div>Org IPC: <span className="font-mono bg-white px-1 rounded">{DEFAULT_CREDENTIALS.orgIpc}</span></div>
              <div>Ind IPC: <span className="font-mono bg-white px-1 rounded">{DEFAULT_CREDENTIALS.indIpc}</span></div>
              <div>Password: <span className="font-mono bg-white px-1 rounded">{DEFAULT_CREDENTIALS.password}</span></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-yellow-700">
          <p className="mb-2">⚠️ Using mock data. To connect to real API:</p>
          <div className="bg-yellow-100 p-2 rounded text-xs">
            <p className="font-medium mb-1">Create a <code>.env</code> file in project root:</p>
            <pre className="whitespace-pre-wrap">
{`VITE_API_BASE_URL=https://api-v1.oneklient.net`}
            </pre>
          </div>
          <div className="mt-2 p-2 bg-yellow-100 rounded">
            <p className="font-medium mb-1">Mock Test Credentials:</p>
            <div className="space-y-1 text-xs">
              <div>Org IPC: <span className="font-mono bg-white px-1 rounded">any-value</span></div>
              <div>Ind IPC: <span className="font-mono bg-white px-1 rounded">any-value</span></div>
              <div>Password: <span className="font-mono bg-white px-1 rounded">any-value</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiStatus;
