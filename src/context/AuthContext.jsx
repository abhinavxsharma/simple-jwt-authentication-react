import React, { createContext, useContext, useState } from 'react';
import { generateSimulatedJWT, decodeJWT } from '../utils/jwt';

// Key used for storing the token in localStorage
const TOKEN_STORAGE_KEY = 'authToken';

// Helper function to lazily initialize authentication state from localStorage
function getInitialAuthState() {
  try {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      // Decode and validate token payload
      const decodedPayload = decodeJWT(storedToken);
      if (decodedPayload && decodedPayload.userId && decodedPayload.role) {
        return {
          token: storedToken,
          user: {
            userId: decodedPayload.userId,
            username: decodedPayload.username,
            role: decodedPayload.role,
            iat: decodedPayload.iat,
            exp: decodedPayload.exp,
          },
        };
      }
      // Malformed or expired token
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
  return { token: null, user: null };
}

// Create the Authentication Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize state synchronously from localStorage (prevents cascading renders)
  const [authState, setAuthState] = useState(getInitialAuthState);

  /**
   * Login function (Simulated frontend authentication)
   * Validates demo credentials and creates simulated JWT
   * 
   * Demo Credentials:
   * Username: admin
   * Password: admin123
   */
  const login = (username, password) => {
    // 1. Validation for empty credentials
    if (!username || !username.trim()) {
      return { success: false, error: 'Username is required.' };
    }
    if (!password || !password.trim()) {
      return { success: false, error: 'Password is required.' };
    }

    const trimmedUsername = username.trim();

    // 2. Validate against Demo Credentials
    if (trimmedUsername === 'admin' && password === 'admin123') {
      // 3. Simulated JWT payload with userId and role
      const payload = {
        userId: 101,
        username: 'admin',
        role: 'Admin',
      };

      // 4. Generate the simulated JWT
      const generatedToken = generateSimulatedJWT(payload);

      // 5. Store the token in localStorage (Raw password is NEVER stored!)
      localStorage.setItem(TOKEN_STORAGE_KEY, generatedToken);

      // 6. Update React state
      setAuthState({
        token: generatedToken,
        user: payload,
      });

      return { success: true };
    }

    // Invalid credentials
    return {
      success: false,
      error: 'Invalid username or password. Please use the demo credentials.',
    };
  };

  /**
   * Logout function
   * Clears token from localStorage and resets application auth state
   */
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    // Reset authentication state
    setAuthState({
      token: null,
      user: null,
    });
  };

  const value = {
    user: authState.user,
    token: authState.token,
    isAuthenticated: !!authState.token && !!authState.user,
    loading: false,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to easily consume the AuthContext in any component
 */
// oxlint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
