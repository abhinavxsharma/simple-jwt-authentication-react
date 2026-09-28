import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { parseJWTParts } from '../utils/jwt';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showFullToken, setShowFullToken] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortenedToken = token
    ? `${token.slice(0, 24)}...${token.slice(-16)}`
    : 'No token found';

  const parsedToken = token ? parseJWTParts(token) : null;

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header-card">
          <div className="dashboard-title-row">
            <div>
              <span className="badge-status-live">Protected Route</span>
              <h1 className="dashboard-main-title">Protected Dashboard</h1>
              <p className="dashboard-welcome-msg">
                Welcome, <strong>{user?.username || 'admin'}</strong>!
              </p>
            </div>
            <div className="header-actions">
              <button
                id="dashboard-logout-btn"
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="dashboard-grid">
          {/* User Details */}
          <div className="dashboard-card">
            <h2 className="card-section-title">User Profile</h2>
            <div className="detail-rows-container">
              <div className="detail-item">
                <span className="detail-label">User ID:</span>
                <span className="detail-value highlight-id">
                  {user?.userId !== undefined ? user.userId : 101}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className="role-pill">{user?.role || 'Admin'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Authentication Status:</span>
                <span className="auth-status-badge">Authenticated</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Storage Location:</span>
                <code className="storage-key-code">localStorage.getItem("authToken")</code>
              </div>
            </div>
            <div className="card-footer-action">
              <button onClick={handleLogout} className="btn btn-secondary btn-block">
                Logout
              </button>
            </div>
          </div>

          {/* Token Display */}
          <div className="dashboard-card">
            <div className="token-card-header">
              <h2 className="card-section-title">JWT Token</h2>
              <div className="token-actions">
                <button
                  onClick={() => setShowFullToken(!showFullToken)}
                  className="btn btn-secondary btn-xs"
                >
                  {showFullToken ? 'Shorten' : 'Full'}
                </button>
                <button
                  onClick={handleCopyToken}
                  className="btn btn-secondary btn-xs"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <p className="token-description">
              Simulated token stored in <code>localStorage</code>:
            </p>
            <div className="jwt-display-box">
              <code className="token-code-text">
                {showFullToken ? token : shortenedToken}
              </code>
            </div>
            {parsedToken && (
              <div className="jwt-anatomy-summary">
                <span className="anatomy-label">Token Components:</span>
                <div className="anatomy-tags">
                  <span className="tag-jwt">Header: {parsedToken.header.alg}</span>
                  <span className="tag-jwt">Role: {user?.role}</span>
                  <span className="tag-jwt">Simulated Signature</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Minimal Token Breakdown */}
        {parsedToken && (
          <div className="dashboard-card">
            <div className="inspector-header">
              <div>
                <h3 className="inspector-title">Token Inspection</h3>
                <p className="inspector-subtitle">
                  Header, Payload, and Signature breakdown
                </p>
              </div>
            </div>
            <div className="inspector-grid">
              <div className="inspector-box">
                <div className="box-title">1. Header</div>
                <pre className="code-block">
                  {JSON.stringify(parsedToken.header, null, 2)}
                </pre>
              </div>
              <div className="inspector-box">
                <div className="box-title">2. Payload</div>
                <pre className="code-block">
                  {JSON.stringify(parsedToken.payload, null, 2)}
                </pre>
              </div>
              <div className="inspector-box">
                <div className="box-title">3. Signature</div>
                <div className="signature-info">
                  <code>{parsedToken.signature}</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
