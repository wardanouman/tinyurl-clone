import React from 'react';
import { Code, Terminal } from 'lucide-react';

export default function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-600 text-white rounded-lg">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Developer API Documentation</h2>
          <p className="text-slate-500 text-sm">Integrate URL shortening directly into your backend or app.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">POST</span>
            <code className="text-sm font-semibold text-slate-800">/api/shorten</code>
          </div>
          <p className="text-slate-600 text-sm mb-4">Create a shortened URL with an optional custom slug.</p>

          <p className="text-xs font-bold uppercase text-slate-400 mb-2">Request Body (JSON)</p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs overflow-x-auto mb-4">
{`{
  "longUrl": "https://example.com/long-page-path",
  "customSlug": "my-custom-alias"
}`}
          </pre>

          <p className="text-xs font-bold uppercase text-slate-400 mb-2">Success Response (201 Created)</p>
          <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto">
{`{
  "ok": true,
  "shortUrl": "http://localhost:5050/my-custom-alias",
  "shortId": "my-custom-alias"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}