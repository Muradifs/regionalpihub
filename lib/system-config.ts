export const PI_NETWORK_CONFIG = {
  SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
  SANDBOX: process.env.NEXT_PUBLIC_PI_SANDBOX_MODE === 'true',
} as const;

export const BACKEND_CONFIG = {
  // Ostavljamo prazno jer su frontend i backend na istoj domeni (Vercel)
  BASE_URL: "", 
} as const;

export const BACKEND_URLS = {
  // Ovo je ključno! Mora biti točno ova putanja koju smo kreirali u route.ts
  LOGIN: "/api/v1/pi", 
} as const;