import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Theory from './pages/Theory';

export default function App() {
  return (
    <AuthProvider>
      {/* 
        We use HashRouter to ensure 100% reliable routing on GitHub Pages
        without needing custom server rewrite rules for 404s.
      */}
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<Login />} />

              {/* Educational Theory / Concepts Route */}
              <Route path="/theory" element={<Theory />} />

              {/* Protected Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Default redirects */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <div className="footer-container">
              <p>
                <strong>JWT Auth Demo</strong> &bull; Simple JWT Authentication Practical Assignment &bull; Client-Side Educational Demo
              </p>
              <div className="footer-links">
                <a
                  href="#/theory"
                  className="footer-link"
                >
                  Theory &amp; Flow
                </a>
                <span className="footer-divider">&bull;</span>
                <span className="footer-tag">React + Vite</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
