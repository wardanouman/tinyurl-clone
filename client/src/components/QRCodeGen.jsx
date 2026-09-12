import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Download } from 'lucide-react';

export default function QRCodeGen() {
  const [qrText, setQrText] = useState('https://google.com');

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">QR Code Generator</h2>
        <p className="text-slate-500 text-sm mb-6">Enter any URL or text below to generate a real-time QR Code.</p>

        <input
          type="text"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          placeholder="Enter link or text..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition text-slate-800 text-sm mb-6"
        />

        {qrText.trim() && (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 inline-block mb-4">
            <QRCodeSVG value={qrText} size={180} level="H" />
          </div>
        )}
      </div>
    </div>
  );
}