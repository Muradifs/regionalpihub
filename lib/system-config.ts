export const PI_NETWORK_CONFIG = {
  SDK_URL: "https://sdk.minepi.com/pi-sdk.js",
  // OVO JE PROMJENA: Prisilno uključujemo Sandbox za testiranje
  SANDBOX: true, 
} as const;

export const BACKEND_CONFIG = {
  BASE_URL: "", 
} as const;

export const BACKEND_URLS = {
  LOGIN: "/api/v1/pi", 
} as const;