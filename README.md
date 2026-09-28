# Simple JWT Authentication

An educational React.js web application demonstrating simulated **JSON Web Token (JWT)** authentication, token storage in `localStorage`, session persistence across page reloads, and access control via protected routing.

🔗 **Live Demo (GitHub Pages):** [https://abhinavxsharma.github.io/simple-jwt-authentication-react/](https://abhinavxsharma.github.io/simple-jwt-authentication-react/)  
📦 **Repository:** [https://github.com/abhinavxsharma/simple-jwt-authentication-react](https://github.com/abhinavxsharma/simple-jwt-authentication-react)

---

## Features

- **Simulated JWT Generation**: Generates 3-part tokens (`Header.Payload.Signature`) using RFC 7515 Base64URL encoding on the client.
- **Form Validation**: Checks for empty inputs and alerts on invalid credentials.
- **Token Persistence**: Saves token under `authToken` in `localStorage` without storing raw passwords; restores user session on refresh.
- **Protected Routing**: React Router `ProtectedRoute` restricts access to `/dashboard` for unauthenticated visitors.
- **Interactive JWT Inspector**: Color-coded breakdown of Header, Payload, and Signature (`jwt.io` style).
- **Theory & Viva Guide**: Comprehensive explanation of Authentication vs Authorization, token structure, 8-step flow, and security trade-offs.

---

## Demo Credentials

- **Username**: `admin`
- **Password**: `admin123`

*(A "Fill Credentials" one-click button is available directly on the login form)*

---

## How JWT Works

A standard JWT consists of three dot-separated components:

$$\text{header}.\text{payload}.\text{signature}$$

1. **Header (Red)**: Algorithm & Token type (`{"alg": "HS256", "typ": "JWT"}`).
2. **Payload (Purple)**: Claims including `userId: 101`, `username: "admin"`, `role: "Admin"`, `iat`, and `exp`.
3. **Signature (Teal)**: Cryptographic signature to verify integrity. (Simulated with a frontend mock hash in this educational demo).

---

## Crucial Viva Distinction

| Concept | Production Architecture | This Practical Demo |
| :--- | :--- | :--- |
| **Generation** | Backend server with private `SECRET_KEY` | Browser simulated with Base64URL encoding |
| **Integrity** | Cryptographically verified on server | Decoded on client to render UI state |
| **Storage** | Typically `HttpOnly`, `Secure` cookies | `localStorage` for easy inspection |
| **Flow** | `Login → Backend signs JWT → Client stores → Protected requests verify signature` | `Login → Client checks demo credentials → Client creates JWT → localStorage → Protected Dashboard` |

---

## Authentication Flow

1. **Input**: User inputs `admin` / `admin123`.
2. **Validation**: Form validates non-empty fields.
3. **Creation**: `generateSimulatedJWT()` creates the token with claims (`userId: 101`, `role: "Admin"`).
4. **Storage**: Token is saved to `localStorage` under `authToken`.
5. **State**: React Context sets `isAuthenticated = true` and updates user state.
6. **Navigation**: User is redirected to `/dashboard`.
7. **Refresh**: On reload ($F5$), `AuthContext` re-hydrates user state from `localStorage`.
8. **Logout**: Clears `authToken` from `localStorage` and redirects to `/login`.

---

## Project Structure

```
simple-jwt-authentication-react/
├── .github/workflows/deploy.yml # GitHub Actions workflow for GitHub Pages
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header with branding & logout
│   │   └── ProtectedRoute.jsx  # Route guard for protected pages
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state, localStorage persistence & hooks
│   ├── pages/
│   │   ├── Login.jsx           # Login page with validation & demo credentials
│   │   ├── Dashboard.jsx       # Protected view displaying claims & token
│   │   └── Theory.jsx          # Educational JWT theory & viva guide
│   ├── utils/
│   │   └── jwt.js              # Base64URL encode/decode & token generator
│   ├── App.jsx                 # Routing setup (HashRouter)
│   ├── index.css               # Modern vanilla CSS design system
│   └── main.jsx                # React root entry point
├── index.html                  # HTML entry point
├── package.json                # Dependencies and build scripts
├── vite.config.js              # Vite configuration with base path
├── flow.md                     # Architecture & process flow document
└── README.md                   # Project documentation
```

---

## Quick Start (Run Locally)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:5173/` in your browser.

---

## GitHub Deployment

To push this repository to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Simple JWT Authentication React App"
git branch -M main
git remote add origin https://github.com/abhinavxsharma/simple-jwt-authentication-react.git
git push -u origin main
```

### Enable GitHub Pages
1. Go to repository **Settings** &rarr; **Pages**.
2. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy the app to:  
   `https://abhinavxsharma.github.io/simple-jwt-authentication-react/`
