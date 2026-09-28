# Architecture & Flow Guide: Simple JWT Authentication

This document outlines the architecture, data flow, token lifecycle, and practical implementation details of this project.

---

## 1. System Architecture

```mermaid
graph TD
    User([User / Browser])
    
    subgraph Frontend [React Application]
        Router[HashRouter]
        AuthContext[AuthContext Provider]
        JWTUtil[jwt.js Utility]
        
        subgraph Pages
            LoginPage[Login.jsx]
            DashboardPage[Dashboard.jsx]
            TheoryPage[Theory.jsx]
        end
        
        subgraph Components
            Navbar[Navbar.jsx]
            ProtectedRoute[ProtectedRoute.jsx]
        end
    end
    
    subgraph Storage [Browser Storage]
        LocalStorage[(localStorage: authToken)]
    end

    User -->|Interacts with| Router
    Router --> Navbar
    Router --> LoginPage
    Router --> TheoryPage
    Router --> ProtectedRoute
    ProtectedRoute -->|Authenticated| DashboardPage
    ProtectedRoute -->|Unauthenticated| LoginPage
    
    LoginPage -->|login credentials| AuthContext
    AuthContext -->|generateSimulatedJWT| JWTUtil
    AuthContext -->|Save Token| LocalStorage
    LocalStorage -->|Restore Token on Mount| AuthContext
    AuthContext -->|decodeJWT| JWTUtil
```

---

## 2. End-to-End Sequence Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Login as Login (Login.jsx)
    participant Auth as AuthContext (AuthContext.jsx)
    participant JWT as JWT Utility (jwt.js)
    participant Store as localStorage
    participant Guard as ProtectedRoute
    participant Dash as Dashboard (Dashboard.jsx)

    Note over User,Dash: 1. Login & Token Generation
    User->>Login: Submits credentials (admin / admin123)
    Login->>Auth: login("admin", "admin123")
    Auth->>JWT: generateSimulatedJWT({userId: 101, username: "admin", role: "Admin"})
    JWT-->>Auth: Returns "header.payload.signature"
    Auth->>Store: setItem("authToken", token)
    Auth-->>Login: { success: true }
    Login->>Guard: Redirects to /dashboard

    Note over User,Dash: 2. Route Protection & Render
    Guard->>Auth: Check isAuthenticated
    Auth-->>Guard: true
    Guard->>Dash: Render Dashboard
    Dash->>User: Displays User ID: 101, Role: Admin, Shortened JWT

    Note over User,Dash: 3. Session Persistence (Page Refresh)
    User->>Dash: Press F5 (Reload)
    Auth->>Store: getItem("authToken")
    Store-->>Auth: Raw JWT string
    Auth->>JWT: decodeJWT(token)
    JWT-->>Auth: Decoded claims payload
    Auth-->>Dash: Session restored without re-login

    Note over User,Dash: 4. Logout Lifecycle
    User->>Dash: Clicks "Logout"
    Dash->>Auth: logout()
    Auth->>Store: removeItem("authToken")
    Auth->>Auth: Reset state (token=null, user=null)
    Auth->>Login: Redirects to /login
```

---

## 3. JWT Anatomy & Claims

A JSON Web Token consists of three parts separated by dots: `header.payload.signature`

| Component | Standard | Content in This Application |
| :--- | :--- | :--- |
| **Header** | Base64URL-encoded JSON | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | Base64URL-encoded JSON claims | `{"userId": 101, "username": "admin", "role": "Admin", "iat": ..., "exp": ...}` |
| **Signature** | Cryptographic hash | Simulated hash representing HMAC-SHA256 signature |

---

## 4. Component Responsibility Matrix

| Component / File | Purpose | Key Logic |
| :--- | :--- | :--- |
| [`src/utils/jwt.js`](file:///c:/Users/Abhinav/Desktop/MST/src/utils/jwt.js) | Token encoding & decoding | `generateSimulatedJWT()`, `decodeJWT()`, Base64URL encode/decode |
| [`src/context/AuthContext.jsx`](file:///c:/Users/Abhinav/Desktop/MST/src/context/AuthContext.jsx) | Global auth state & persistence | `AuthProvider`, `useAuth()`, `login()`, `logout()`, `localStorage` sync |
| [`src/components/ProtectedRoute.jsx`](file:///c:/Users/Abhinav/Desktop/MST/src/components/ProtectedRoute.jsx) | Route guard | Inspects `isAuthenticated`; redirects unauthenticated users to `/login` |
| [`src/pages/Login.jsx`](file:///c:/Users/Abhinav/Desktop/MST/src/pages/Login.jsx) | Authentication UI | Controlled form, input validation, error alerts, demo credentials autofill |
| [`src/pages/Dashboard.jsx`](file:///c:/Users/Abhinav/Desktop/MST/src/pages/Dashboard.jsx) | Protected view | Displays user ID, role, shortened token, and color-coded JWT anatomy |
| [`src/pages/Theory.jsx`](file:///c:/Users/Abhinav/Desktop/MST/src/pages/Theory.jsx) | Viva & theory guide | Full explanation of auth flow, real vs. demo distinction, security considerations |
| [`src/App.jsx`](file:///c:/Users/Abhinav/Desktop/MST/src/App.jsx) | Routing configuration | Sets up `HashRouter` for GitHub Pages compatibility |

---

## 5. Security & Practical Notes

1. **Client Simulation**: In real systems, tokens must be created and signed on a secure backend using a private secret key. In this demo, tokens are simulated in the browser for educational transparency.
2. **`localStorage` vs. `HttpOnly` Cookies**:
   - `localStorage` allows client-side inspection and simple persistence, but is vulnerable to XSS.
   - Production systems commonly store tokens in `HttpOnly`, `Secure` cookies to prevent token theft by malicious scripts.
3. **Stateless Nature**: The application does not need a session database on the server because user identity claims (`userId`, `role`) travel inside the token itself.
