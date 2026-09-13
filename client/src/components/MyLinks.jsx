import React, { useState, useEffect } from 'react';

// Replace with your actual Railway backend URL
const API_BASE_URL = 'https://tinyurl-clone-production.up.railway.app';

const MyLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all saved URLs from the backend
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

  // Delete a specific link by its ID
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/urls/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted link from local state to refresh the UI instantly
        setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
      } else {
        alert('Failed to delete the link. Please try again.');
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
          {links.map((link) => (
            <div key={link._id} className="link-card">
              <div className="link-info">
                <a
                  href={`${API_BASE_URL}/${link.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-url"
                >
                  {`${API_BASE_URL}/${link.shortCode}`}
                </a>
                <p className="original-url">{link.originalUrl}</p>
              </div>

              <div className="link-actions">
                {/* Copy Button */}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`${API_BASE_URL}/${link.shortCode}`)
                  }
                  className="action-btn copy-btn"
                  title="Copy Link"
                >
                  📋
                </button>

                {/* External Link Button */}
                <a
                  href={`${API_BASE_URL}/${link.shortCode}`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLinks;