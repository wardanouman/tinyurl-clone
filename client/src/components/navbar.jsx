import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2563eb',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '16px',
            }}
          >
            🔗
          </span>
          TinyURL
        </Link>
      </div>

      {/* Navigation Links - Set to flex and wrap so they remain visible on mobile */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link
          to="/"
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Home
        </Link>

        <Link
          to="/links"
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          My Links
        </Link>

        <Link
          to="/analytics"
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Analytics
        </Link>

        <Link
          to="/qr"
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          QR Generator
        </Link>
      </nav>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#475569',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>

        <button
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Navbar;