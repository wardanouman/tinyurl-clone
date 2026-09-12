import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Link2, Copy, Check, Sparkles, QrCode, 
  BarChart3, ShieldCheck, Zap, ArrowRight, User, Lock 
} from 'lucide-react';

export default function Home({ onAddLink }) {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [recentLink, setRecentLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    setLoading(true);
    try {
      const formattedUrl = longUrl.trim();

      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          longUrl: formattedUrl,
          customSlug: customAlias.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        if (onAddLink) onAddLink(data);
        setRecentLink(data);
        setLongUrl('');
        setCustomAlias('');
        setShowQR(false);
      } else {
        alert(data.msg || data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      console.error('Error shortening URL:', err);
      alert('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!recentLink) return;
    const urlToCopy = recentLink.shortUrl || `http://localhost:5050/${recentLink.shortId}`;
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortUrl = recentLink ? (recentLink.shortUrl || `http://localhost:5050/${recentLink.shortId}`) : '';

  return (
    // Top of Home.jsx JSX return:
  <div className="relative min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-800 overflow-hidden">
    {/* Subtle Glow Background Effects */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-transparent blur-3xl pointer-events-none rounded-full" />
    
    {/* HERO SECTION */}
    <section className="relative max-w-4xl mx-auto pt-16 pb-12 px-6 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-200/60 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Next-Gen Link Management Platform
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
        Shorten links, create QR codes, <br className="hidden md:inline" />
        and track audience performance.
      </h1>

      <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
        A fast, modern URL shortener built for dynamic link generation, custom branding, and real-time performance tracking.
      </p>

      {/* UPGRADED URL SHORTENER FORM BOX */}
<div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-500/10 border border-slate-200/80 text-left transition-all hover:border-slate-300">
  <form onSubmit={handleSubmit} className="space-y-6">
    
    {/* Long URL Input Group */}
    <div>
      <label className="block text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
        <span>Paste your long destination URL</span>
        <span className="text-blue-600 font-bold">*</span>
      </label>
      <div className="relative group">
        <input
          type="text"
          placeholder="https://example.com/very-long-link-structure"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-slate-50/70 border border-slate-300/80 rounded-2xl text-slate-900 text-base font-medium placeholder-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-600 focus:bg-white focus:outline-none transition-all shadow-inner"
          required
        />
        <Link2 className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 absolute left-4 top-4.5 transition-colors" />
      </div>
    </div>

    {/* Custom Alias & Submit Button Grid */}
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-1">
        <label className="block text-sm font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
          Custom Alias <span className="text-xs font-semibold text-slate-400 capitalize">(Optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. my-promo-2026"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50/70 border border-slate-300/80 rounded-2xl text-slate-900 text-base font-medium placeholder-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-600 focus:bg-white focus:outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="md:w-52 flex items-end">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  </form>

  {/* GENERATED SHORT LINK RESULT CARD */}
  {recentLink && (
    <div className="mt-8 pt-6 border-t border-slate-100 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-5 rounded-2xl border border-blue-100/80 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="truncate w-full">
          <p className="text-xs font-extrabold text-blue-700 uppercase tracking-wider mb-1">
            Your Shortened Link:
          </p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xl font-bold text-blue-600 hover:underline truncate block"
          >
            {shortUrl}
          </a>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={handleCopy}
            className="flex-1 md:flex-none px-5 py-2.5 bg-white text-blue-600 font-bold text-sm rounded-xl border border-blue-200 hover:bg-blue-50 transition shadow-sm flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            onClick={() => setShowQR(!showQR)}
            className="flex-1 md:flex-none px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            {showQR ? 'Hide QR' : 'QR Code'}
          </button>
        </div>
      </div>

      {/* QR CODE DISPLAY */}
      {showQR && (
        <div className="mt-6 pt-5 border-t border-blue-100 flex flex-col items-center justify-center">
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200/80">
            <QRCodeSVG value={shortUrl} size={160} level="H" />
          </div>
          <p className="text-xs font-medium text-slate-500 mt-3">Scan to open on mobile device</p>
        </div>
      )}
    </div>
  )}
</div>

      </section>

      {/* 3. FACTS & STATS SECTION */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">99.9%</p>
              <p className="text-sm text-slate-500 font-medium mt-1">Uptime SLA</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">500k+</p>
              <p className="text-sm text-slate-500 font-medium mt-1">Links Created</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">&lt;50ms</p>
              <p className="text-sm text-slate-500 font-medium mt-1">Global Latency</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-600">100%</p>
              <p className="text-sm text-slate-500 font-medium mt-1">HTTPS Encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES & BENEFITS SECTION */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Everything you need for link optimization
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Build custom links, drive higher conversion, and manage your campaigns effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Detailed Click Analytics</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track click performance and audience engagement metrics in real time right from your dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Instant QR Codes</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate scannable QR codes instantly for mobile campaigns, menus, and print materials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Custom Branded Aliases</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Replace random strings with memorable, custom slugs that increase brand trust and clicks.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>© 2026 ShortURL. All rights reserved. Designed with React & Node.js.</p>
      </footer>
    </div>
  );
}