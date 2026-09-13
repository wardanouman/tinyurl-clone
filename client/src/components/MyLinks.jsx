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

  if (loading) return <div className="loading">Loading your links...</div>;

  return (
    <div className="my-links-container">
      <h2>My Links</h2>
      {links.length === 0 ? (
        <p>No shortened links found.</p>
      ) : (
        <div className="links-list">
          {links.map((link) => {
            // Using shortId and longUrl matching your Mongoose Schema
            const fullShortUrl = `${API_BASE_URL}/${link.shortId}`;

            return (
              <div key={link._id} className="link-card">
                <div className="link-info">
                  <a
                    href={fullShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-url"
                  >
                    {fullShortUrl}
                  </a>
                  <p className="original-url">{link.longUrl}</p>
                </div>

                <div className="link-actions">
                  {/* Copy Button */}
                  <button
                    onClick={() => navigator.clipboard.writeText(fullShortUrl)}
                    className="action-btn copy-btn"
                    title="Copy Link"
                  >
                    📋
                  </button>

                  {/* Open Link Button */}
                  <a
                    href={fullShortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn open-btn"
                    title="Open Link"
                  >
                    🔗
                  </a>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(link._id)}
                    className="action-btn delete-btn"
                    title="Delete Link"
                    style={{ color: '#ff4d4f', cursor: 'pointer' }}
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