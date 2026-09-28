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
        {/* Brand */}
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <span className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <span className="brand-text">JWT Auth Demo</span>
          </NavLink>
        </div>

        {/* User Info & Actions */}
        <div className="nav-actions">
          {isAuthenticated && user ? (
            <div className="user-profile-widget">
              <div className="user-info">
                <span className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </span>
                <span className="username">{user.username}</span>
                <span className="role-tag">{user.role}</span>
              </div>
              <button
                id="navbar-logout-btn"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
              >
                Logout
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
