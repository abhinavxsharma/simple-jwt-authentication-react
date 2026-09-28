import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  // Shorten token for clean display (e.g., first 24 chars ... last 16 chars)
  const shortenedToken = token
    ? `${token.slice(0, 24)}...${token.slice(-16)}`
    : 'No token found';

  // Parse JWT parts for educational visualizer
  const parsedToken = token ? parseJWTParts(token) : null;

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-content">
        {/* Top Header Card */}
        <div className="dashboard-header-card">
          <div className="dashboard-title-row">
            <div>
              <span className="badge-status-live">
                <span className="pulsing-dot"></span> Protected Route
              </span>
              <h1 className="dashboard-main-title">Protected Dashboard</h1>
              <p className="dashboard-welcome-msg">
                Welcome, <span className="highlight-username">{user?.username || 'admin'}</span>!
              </p>
            </div>
            <div className="header-actions">
              <button
                id="dashboard-logout-btn"
                onClick={handleLogout}
                className="btn btn-danger"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Required Information Card */}
        <div className="dashboard-grid">
          {/* User & Auth Status Details */}
          <div className="dashboard-card user-details-card">
            <h2 className="card-section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>User Profile & Authentication</span>
            </h2>

            <div className="detail-rows-container">
              {/* User ID */}
              <div className="detail-item">
                <span className="detail-label">User ID:</span>
                <span className="detail-value highlight-id">
                  {user?.userId !== undefined ? user.userId : 101}
                </span>
              </div>

              {/* Username */}
              <div className="detail-item">
                <span className="detail-label">Username:</span>
                <span className="detail-value">{user?.username || 'admin'}</span>
              </div>

              {/* Role */}
              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className="role-pill">{user?.role || 'Admin'}</span>
              </div>

              {/* Authentication Status */}
              <div className="detail-item">
                <span className="detail-label">Authentication Status:</span>
                <span className="auth-status-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Authenticated
                </span>
              </div>

              {/* Storage Key */}
              <div className="detail-item">
                <span className="detail-label">Storage Location:</span>
                <code className="storage-key-code">localStorage.getItem("authToken")</code>
              </div>
            </div>

            <div className="card-footer-action">
              <button onClick={handleLogout} className="btn btn-outline-danger btn-block">
                Logout from System
              </button>
            </div>
          </div>

          {/* JWT Token Card */}
          <div className="dashboard-card token-card">
            <div className="token-card-header">
              <h2 className="card-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>JWT Token</span>
              </h2>
              <div className="token-actions">
                <button
                  onClick={() => setShowFullToken(!showFullToken)}
                  className="btn btn-secondary btn-xs"
                >
                  {showFullToken ? 'Show Shortened' : 'Show Full'}
                </button>
                <button
                  onClick={handleCopyToken}
                  className="btn btn-secondary btn-xs"
                >
                  {copied ? '✓ Copied' : 'Copy Token'}
                </button>
              </div>
            </div>

            <p className="token-description">
              Simulated Base64URL-encoded token stored in <code>localStorage</code>:
            </p>

            {/* JWT Token Display Box */}
            <div className="jwt-display-box">
              <code className="token-code-text">
                {showFullToken ? token : shortenedToken}
              </code>
            </div>

            {/* Quick Token Inspector Breakdown */}
            {parsedToken && (
              <div className="jwt-anatomy-summary">
                <span className="anatomy-label">Token Components:</span>
                <div className="anatomy-tags">
                  <span className="tag-jwt tag-header">
                    Header: {parsedToken.header.alg} ({parsedToken.header.typ})
                  </span>
                  <span className="tag-jwt tag-payload">
                    Payload: {user?.role} (#{user?.userId})
                  </span>
                  <span className="tag-jwt tag-signature">
                    Signature: 43 chars (Simulated)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Interactive Token Inspector */}
        {parsedToken && (
          <div className="dashboard-card inspector-card">
            <div className="inspector-header">
              <div>
                <h3 className="inspector-title">JWT Anatomy Breakdown</h3>
                <p className="inspector-subtitle">
                  Inspect the 3 color-coded segments that make up this JSON Web Token
                </p>
              </div>
              <Link to="/theory" className="btn btn-outline-primary btn-sm">
                View Full Theory & Flow &rarr;
              </Link>
            </div>

            <div className="jwt-colored-stream">
              <span className="part-header" title="Header (Base64URL)">
                {parsedToken.rawHeader}
              </span>
              <span className="part-dot">.</span>
              <span className="part-payload" title="Payload (Base64URL)">
                {parsedToken.rawPayload}
              </span>
              <span className="part-dot">.</span>
              <span className="part-signature" title="Signature (Base64URL)">
                {parsedToken.rawSignature}
              </span>
            </div>

            <div className="inspector-grid">
              {/* Header Box */}
              <div className="inspector-box box-header">
                <div className="box-title">
                  <span className="dot dot-red"></span>
                  <span>1. Header (Algorithm & Token Type)</span>
                </div>
                <pre className="code-block">
                  {JSON.stringify(parsedToken.header, null, 2)}
                </pre>
              </div>

              {/* Payload Box */}
              <div className="inspector-box box-payload">
                <div className="box-title">
                  <span className="dot dot-purple"></span>
                  <span>2. Payload (User Claims & Expiration)</span>
                </div>
                <pre className="code-block">
                  {JSON.stringify(parsedToken.payload, null, 2)}
                </pre>
              </div>

              {/* Signature Box */}
              <div className="inspector-box box-signature">
                <div className="box-title">
                  <span className="dot dot-teal"></span>
                  <span>3. Verify Signature</span>
                </div>
                <div className="signature-info">
                  <p>
                    HMACSHA256(
                    <br />
                    &nbsp;&nbsp;base64UrlEncode(header) + "." +
                    <br />
                    &nbsp;&nbsp;base64UrlEncode(payload),
                    <br />
                    &nbsp;&nbsp;<strong>[simulated-secret-key]</strong>
                    <br />
                    )
                  </p>
                  <p className="signature-note">
                    Simulated frontend signature: <code>{parsedToken.signature}</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Persistence Verification Note */}
        <div className="callout-card callout-info">
          <div className="callout-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div className="callout-body">
            <h4>Session Persistence Demonstration</h4>
            <p>
              Your token is actively stored in browser <code>localStorage</code> under <code>"authToken"</code>.
              Try refreshing the page (<kbd>F5</kbd> or <kbd>Ctrl+R</kbd>) — you will remain logged in because
              React re-hydrates the authentication state by decoding the token on page load!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
