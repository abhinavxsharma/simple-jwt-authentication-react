/**
 * JWT Utility Functions (Simulated for Educational Demonstration)
 * 
 * IMPORTANT SECURITY NOTE:
 * This file simulates JWT generation and decoding purely for educational purposes
 * in the frontend. It is NOT cryptographically secure!
 * 
 * IN A REAL APPLICATION:
 * 1. Tokens must be generated, signed, and verified exclusively on a trusted BACKEND server.
 * 2. Secret keys must never be exposed to the browser.
 * 3. The client should treat tokens as opaque or verify them with the server.
 */

// Safe Base64 URL Encoding (RFC 7515 compliant)
export function base64UrlEncode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Safe Base64 URL Decoding
export function base64UrlDecode(str) {
  // Add padding if required
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }

  const decoded = atob(output);
  try {
    return decodeURIComponent(
      decoded
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return decoded;
  }
}

/**
 * Generates a simulated 3-part JWT string: Header.Payload.Signature
 * @param {Object} payloadData - Custom claims (userId, username, role, etc.)
 * @returns {string} - Simulated JWT string
 */
export function generateSimulatedJWT(payloadData) {
  // 1. JWT Header
  // Standard header declaring algorithm (HMAC SHA-256) and token type
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // 2. JWT Payload
  // Contains claims: standard claims (iat, exp) + user identity & authorization claims
  const currentTime = Math.floor(Date.now() / 1000);
  const payload = {
    ...payloadData,
    iat: currentTime, // Issued at (seconds)
    exp: currentTime + 60 * 60 * 24, // Expires in 24 hours
    iss: 'simple-jwt-auth-demo',
  };

  // Encode header and payload to Base64Url
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // 3. Simulated Signature
  // In a real backend, this is HMAC-SHA256(encodedHeader + "." + encodedPayload, secretKey)
  // For this frontend-only demo, we simulate a mock signature hash
  const rawSignatureInput = `${encodedHeader}.${encodedPayload}.simulated_secret_key_demo_only`;
  const encodedSignature = base64UrlEncode(rawSignatureInput).slice(0, 43);

  // Return full 3-part JWT
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

/**
 * Decodes the payload from a JWT string.
 * @param {string} token - The JWT string
 * @returns {Object|null} - Decoded payload object or null if invalid
 */
export function decodeJWT(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  try {
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);

    // Optional expiration check
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      console.warn('JWT token has expired');
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}

/**
 * Parses all 3 components of the JWT for visual inspection / education.
 * @param {string} token - The JWT string
 * @returns {Object|null} - Details of header, payload, and signature
 */
export function parseJWTParts(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    return {
      raw: token,
      rawHeader: parts[0],
      rawPayload: parts[1],
      rawSignature: parts[2],
      header,
      payload,
      signature,
    };
  } catch {
    return null;
  }
}
