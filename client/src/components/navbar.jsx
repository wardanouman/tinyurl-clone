import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link2, LayoutDashboard, BarChart3, QrCode, BookOpen } from 'lucide-react';

export default function Navbar({ linkCount = 0 }) {
  const location = useLocation();

  const navItems = [
    { name: 'Shorten', path: '/', icon: Link2 },
    { name: 'My Links', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'QR Code', path: '/qr-generator', icon: QrCode },
    { name: 'API Docs', path: '/docs', icon: BookOpen },
  ];

  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
            T
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            TinyLink
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon size={15} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{linkCount} Links Stored</span>
        </div>
      </div>
    </nav>
  );
}