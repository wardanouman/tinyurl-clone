import React, { useState } from 'react';
import { Search, ExternalLink, Copy, Trash2, Check, BarChart2 } from 'lucide-react';

export default function Dashboard({ links, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredLinks = links.filter(
    (l) =>
      l.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Manage URLs</span>
            <h1 className="text-3xl font-bold">Link Management</h1>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search links or codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950 text-slate-300 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Short Link</th>
                  <th className="p-4">Original Destination</th>
                  <th className="p-4">Clicks</th>
                  <th className="p-4">Created</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-400">{link.shortUrl}</td>
                    <td className="p-4 max-w-xs truncate text-slate-300">{link.originalUrl}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        <BarChart2 size={12} /> {link.clicks}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">{link.createdAt}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                        className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 cursor-pointer"
                        title="Copy Short Link"
                      >
                        {copiedId === link.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 inline-block"
                        title="Visit Link"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => onDelete(link.id)}
                        className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 cursor-pointer"
                        title="Delete Link"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}