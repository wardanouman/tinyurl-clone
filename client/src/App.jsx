import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import MyLinks from './components/MyLinks';
import Analytics from './components/Analytics';
import QRCodeGen from './components/QRCodeGen';
import ApiDocs from './components/ApiDocs';
import { Link2, LayoutDashboard, BarChart2, QrCode, Code2 } from 'lucide-react';


const API_BASE_URL = 'https://tinyurl-clone-production.up.railway.app';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/urls`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setLinks(data))
      .catch((err) => console.error('Failed to fetch links:', err));
  }, []);

  const handleAddLink = (newLink) => {
    setLinks((prevLinks) => [newLink, ...prevLinks]);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Link2 },
    { id: 'links', label: 'My Links', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'qrcode', label: 'QR Generator', icon: QrCode },
    { id: 'api', label: 'API Docs', icon: Code2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div onClick={() => setActiveTab('home')} className="flex items-center gap-2.5 cursor-pointer select-none group">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Link2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Tiny<span className="text-blue-600">URL</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-2 transition">
              Log In
            </button>
            <button className="text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {activeTab === 'home' && <Home onAddLink={handleAddLink} />}
        {activeTab === 'links' && <MyLinks links={links} />}
        {activeTab === 'analytics' && <Analytics links={links} />}
        {activeTab === 'qrcode' && <QRCodeGen />}
        {activeTab === 'api' && <ApiDocs />}
      </main>
    </div>
  );
}