import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://tinyurl-clone-production.up.railway.app';

const MyLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/urls`);
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/urls/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
      } else {
        alert('Failed to delete the link.');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading your links...</div>;

  return (
    <div className="my-links-container" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Links</h2>
      {links.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No shortened links found.</p>
      ) : (
        <div className="links-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
          {links.map((link) => {
            const fullShortUrl = `${API_BASE_URL}/${link.shortId}`;

            return (
              <div 
                key={link._id} 
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ wordBreak: 'break-all', textAlign: 'left' }}>
                  <a
                    href={fullShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '16px', textDecoration: 'none' }}
                  >
                    {fullShortUrl}
                  </a>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
                    {link.longUrl}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginLeft: '12px' }}>
                  <button
                    onClick={() => navigator.clipboard.writeText(fullShortUrl)}
                    style={{ border: 'none', background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    title="Copy Link"
                  >
                    📋
                  </button>

                  <a
                    href={fullShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ border: 'none', background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', textDecoration: 'none', display: 'inline-block' }}
                    title="Open Link"
                  >
                    🔗
                  </a>

                  <button
                    onClick={() => handleDelete(link._id)}
                    style={{ border: 'none', background: '#fee2e2', color: '#dc2626', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    title="Delete Link"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyLinks;