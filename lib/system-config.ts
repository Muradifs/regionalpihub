// *** System Configuration ***
// Adjusted for Vercel Deployment

// Pi Network Configuration
export const PI_NETWORK_CONFIG = {
  SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
  // Čitamo iz Vercel varijable (true/false)
  SANDBOX: process.env.NEXT_PUBLIC_PI_SANDBOX_MODE === 'true',
} as const;

// Backend Configuration
export const BACKEND_CONFIG = {
  // OVO JE BILO KRIVO! Sada čitamo tvoju pravu adresu.
  // Ako varijabla fali, koristimo prazan string (lokalni API).
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
} as const;

// Backend URLs
export const BACKEND_URLS = {
  // OVO JE BILO KRIVO! AI je tražio /v1/login, a mi smo napravili /api/v1/auth/pi
  LOGIN: `/api/v1/auth/pi`, 
} as const;