import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <span className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <span className="brand-text">JWT Auth Demo</span>
          </NavLink>
          <span className="demo-badge">Practical Assignment</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <NavLink
            to="/theory"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span>JWT Concepts & Theory</span>
          </NavLink>

          {isAuthenticated ? (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              <span>Dashboard</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Login</span>
            </NavLink>
          )}
        </nav>

        {/* User Info & Actions */}
        <div className="nav-actions">
          {isAuthenticated && user ? (
            <div className="user-profile-widget">
              <div className="user-info">
                <span className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </span>
                <div className="user-meta">
                  <span className="username">{user.username}</span>
                  <span className="role-tag">{user.role}</span>
                </div>
              </div>
              <button
                id="navbar-logout-btn"
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
                title="Log out and clear token"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm">
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
