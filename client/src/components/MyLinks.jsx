import React from 'react';
import { Copy, ExternalLink, Trash2, Link2 } from 'lucide-react';

export default function MyLinks({ links = [], onDelete }) {
  if (links.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-4xl mx-auto my-8">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Link2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No links created yet</h3>
        <p className="text-slate-500 text-sm">Shorten a URL on the home tab to start tracking it here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Shortened Links</h2>
      <div className="space-y-4">
        {links.map((link) => {
          const shortUrl = link.shortUrl || `http://localhost:5050/${link.shortId}`;
          return (
            <div key={link._id || link.shortId} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="truncate flex-1">
                <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline text-lg block truncate">
                  {shortUrl}
                </a>
                <p className="text-xs text-slate-400 truncate mt-1">{link.longUrl}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 transition"
                  title="Copy Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 transition"
                  title="Visit Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}