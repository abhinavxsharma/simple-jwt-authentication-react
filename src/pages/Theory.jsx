import React from 'react';
import { Link } from 'react-router-dom';

export default function Theory() {
  const examplePayload = {
    userId: 101,
    username: 'admin',
    role: 'Admin',
  };

  return (
    <div className="theory-page-container">
      <div className="theory-content">
        {/* Page Header */}
        <div className="theory-header">
          <span className="section-pill">Educational Guide & Viva Notes</span>
          <h1 className="theory-title">JWT Concepts & Authentication Theory</h1>
          <p className="theory-subtitle">
            A comprehensive, simple explanation of authentication fundamentals, JWT anatomy,
            stateless token architecture, and security best practices.
          </p>
        </div>

        {/* CRITICAL SECURITY & VIVA NOTICE */}
        <div className="alert-card security-alert">
          <div className="alert-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="alert-card-content">
            <h3 className="alert-card-title">Crucial Security Notice for Viva & Production</h3>
            <blockquote className="highlight-quote">
              "This project simulates JWT authentication for educational purposes. In a real application,
              credentials must be verified by a backend server and JWTs must be generated and cryptographically
              signed by the server. Never trust a client-generated token for real authorization."
            </blockquote>
            <p className="alert-card-text">
              In this practical demo, all generation happens in the browser so you can understand the
              token's structure, storage, and decoding lifecycle without running an external server.
            </p>
          </div>
        </div>

        {/* VIVA KEY DISTINCTION SECTION */}
        <div className="theory-card viva-card">
          <h2 className="theory-card-title">
            <span className="star-icon">★</span> Crucial Viva Distinction: Real vs Practical Demo Flow
          </h2>
          <p className="viva-intro">
            Examiners frequently ask how a simulated demo differs from a production backend implementation:
          </p>

          <div className="comparison-flow-grid">
            {/* Real Flow Box */}
            <div className="flow-card real-flow">
              <div className="flow-card-header">
                <span className="badge-tag tag-real">PRODUCTION ARCHITECTURE</span>
                <h3>Real JWT Flow (Backend Signed)</h3>
              </div>
              <div className="flow-steps-chain">
                <div className="chain-step">1. User submits login credentials to server</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">2. Backend verifies password hash against database</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">3. Backend generates &amp; cryptographically signs JWT using private SECRET_KEY</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">4. Client receives signed JWT and stores it (e.g. HttpOnly cookie)</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">5. Client sends token in <code>Authorization: Bearer</code> header</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">6. Backend verifies signature before serving protected API</div>
              </div>
            </div>

            {/* Practical Demo Box */}
            <div className="flow-card demo-flow">
              <div className="flow-card-header">
                <span className="badge-tag tag-demo">EDUCATIONAL SIMULATION</span>
                <h3>This Practical Demo (Client-Side)</h3>
              </div>
              <div className="flow-steps-chain">
                <div className="chain-step">1. User enters demo credentials (admin / admin123)</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">2. React frontend validates input fields in browser</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">3. Frontend creates simulated 3-part Base64 token with mock signature</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">4. Token stored in browser <code>localStorage</code></div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">5. AuthContext restores session on refresh by decoding payload</div>
                <div className="chain-arrow">&darr;</div>
                <div className="chain-step">6. React Router ProtectedRoute grants access to Dashboard</div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. AUTHENTICATION */}
        <section className="theory-section">
          <div className="theory-card">
            <h2 className="theory-card-title">1. What is Authentication?</h2>
            <p>
              <strong>Authentication (AuthN)</strong> is the process of verifying the identity of a user, device, or system.
              In simple terms, it answers the foundational question: <em>"Who are you?"</em>
            </p>
            <div className="info-bullets">
              <div className="bullet-item">
                <div className="bullet-title">Why Authentication is Used:</div>
                <p>
                  Without authentication, any client could impersonate any user, access sensitive private data,
                  or perform unauthorized modifications. It establishes trust before granting permissions.
                </p>
              </div>
              <div className="bullet-item">
                <div className="bullet-title">Authentication vs Authorization:</div>
                <p>
                  <strong>Authentication</strong> verifies <em>identity</em> (e.g. verifying username &amp; password).<br />
                  <strong>Authorization</strong> determines <em>privileges</em> (e.g. can user <code>admin</code> delete records or only view them?).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT IS JWT */}
        <section className="theory-section">
          <div className="theory-card">
            <h2 className="theory-card-title">2. What is a JWT (JSON Web Token)?</h2>
            <p>
              A <strong>JSON Web Token (JWT)</strong> is an open, industry-standard (RFC 7519) method for representing claims
              securely between two parties. It is compact, URL-safe, and self-contained.
            </p>
            <div className="grid-2-col">
              <div className="feature-box">
                <h4>Stateless Architecture</h4>
                <p>
                  The server does not need to maintain server-side session state or memory in a session store.
                  All user claims (such as <code>userId</code> and <code>role</code>) are packed directly inside the token.
                </p>
              </div>
              <div className="feature-box">
                <h4>Compact &amp; URL-Safe</h4>
                <p>
                  Because it is Base64URL-encoded, it can be passed easily via HTTP headers (<code>Authorization: Bearer &lt;token&gt;</code>),
                  query strings, or cookies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. JWT STRUCTURE */}
        <section className="theory-section">
          <div className="theory-card">
            <h2 className="theory-card-title">3. JWT Structure</h2>
            <p>
              A JSON Web Token consists of three parts separated by dots (<code>.</code>):
            </p>
            <div className="jwt-formula-box">
              <span className="f-header">Header</span>
              <span className="f-dot">.</span>
              <span className="f-payload">Payload</span>
              <span className="f-dot">.</span>
              <span className="f-signature">Signature</span>
            </div>

            <div className="structure-breakdown-list">
              <div className="structure-part part-1">
                <div className="part-badge red">Part 1: Header</div>
                <p>
                  Specifies the token type (<code>JWT</code>) and the cryptographic signing algorithm used
                  (e.g., <code>HS256</code> for HMAC SHA-256 or <code>RS256</code> for RSA).
                </p>
                <pre className="inline-code">
{`{
  "alg": "HS256",
  "typ": "JWT"
}`}
                </pre>
              </div>

              <div className="structure-part part-2">
                <div className="part-badge purple">Part 2: Payload (Claims)</div>
                <p>
                  Contains statements about an entity (typically, the user) and additional metadata.
                  Claims can be registered (e.g. <code>iat</code>, <code>exp</code>), public, or private custom claims.
                </p>
                <div className="payload-example-container">
                  <div className="payload-header-label">Example Payload used in this project:</div>
                  <pre className="inline-code">
{JSON.stringify(examplePayload, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="structure-part part-3">
                <div className="part-badge teal">Part 3: Signature</div>
                <p>
                  The signature is generated by taking the encoded header, the encoded payload, a secret key,
                  and running them through the algorithm specified in the header:
                </p>
                <pre className="inline-code">
{`HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secretKey
)`}
                </pre>
                <p className="note-text">
                  The signature prevents tampering. If an attacker changes even one character in the payload
                  (e.g. changing <code>role: "User"</code> to <code>role: "Admin"</code>), the signature recalculation
                  will fail and the server will reject the token!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE 8-STEP LOGIN FLOW */}
        <section className="theory-section">
          <div className="theory-card">
            <h2 className="theory-card-title">4. Step-by-Step Login &amp; Authentication Flow</h2>
            <ol className="flow-numbered-list">
              <li>
                <div className="step-num">1</div>
                <div className="step-desc">
                  <strong>User enters credentials:</strong> The user fills in their username and password in the client application.
                </div>
              </li>
              <li>
                <div className="step-num">2</div>
                <div className="step-desc">
                  <strong>Client validates input:</strong> The frontend ensures fields are not blank before dispatching.
                </div>
              </li>
              <li>
                <div className="step-num">3</div>
                <div className="step-desc">
                  <strong>Server verifies identity:</strong> The backend verifies credentials against stored password hashes (e.g. bcrypt).
                </div>
              </li>
              <li>
                <div className="step-num">4</div>
                <div className="step-desc">
                  <strong>Server generates JWT:</strong> The server builds a signed JWT containing claims such as <code>userId</code> and <code>role</code>.
                </div>
              </li>
              <li>
                <div className="step-num">5</div>
                <div className="step-desc">
                  <strong>JWT returned to client:</strong> The generated token is transmitted securely back in the HTTP response.
                </div>
              </li>
              <li>
                <div className="step-num">6</div>
                <div className="step-desc">
                  <strong>Client stores token:</strong> The browser saves the token (e.g. in <code>localStorage</code> or secure cookies) to persist state across refreshes.
                </div>
              </li>
              <li>
                <div className="step-num">7</div>
                <div className="step-desc">
                  <strong>Client sends token with future requests:</strong> Future API requests attach the token in the <code>Authorization: Bearer &lt;token&gt;</code> header.
                </div>
              </li>
              <li>
                <div className="step-num">8</div>
                <div className="step-desc">
                  <strong>Server validates token:</strong> The server verifies the token's cryptographic signature and expiration, granting access to protected routes.
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* 5. STORAGE & SECURITY CONSIDERATIONS */}
        <section className="theory-section">
          <div className="theory-card">
            <h2 className="theory-card-title">5. Token Storage: localStorage vs HttpOnly Cookies</h2>
            <p>
              In educational projects, <code>localStorage</code> is used for simplicity and immediate inspection.
              However, in enterprise applications, security tradeoffs must be considered:
            </p>

            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Storage Mechanism</th>
                    <th>Pros</th>
                    <th>Security Trade-offs &amp; Mitigations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>localStorage</strong></td>
                    <td>
                      Simple API, survives page reloads, easily accessible via JavaScript.
                    </td>
                    <td>
                      <span className="badge-warning">Vulnerable to XSS</span>: Any malicious third-party script
                      injected into the page can read <code>localStorage.getItem("authToken")</code>.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>HttpOnly Cookies</strong></td>
                    <td>
                      Inaccessible to JavaScript; automatically attached by the browser on each request.
                    </td>
                    <td>
                      Protects against XSS token theft. Requires backend server setup and protection against CSRF (using <code>SameSite=Strict</code> or anti-CSRF tokens).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom CTA / Navigation */}
        <div className="theory-cta-card">
          <div>
            <h3>Ready to see the practical implementation?</h3>
            <p>Try logging in with the demo credentials or inspect the dashboard.</p>
          </div>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">
              Go to Login Page
            </Link>
            <Link to="/dashboard" className="btn btn-outline-primary">
              Open Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
