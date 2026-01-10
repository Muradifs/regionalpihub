"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// Ovdje koristimo tvoje konfiguracije
import { PI_NETWORK_CONFIG, BACKEND_URLS } from "@/lib/system-config";
import { api, setApiAuthToken } from "@/lib/api";

export type LoginDTO = {
  id: string;
  username: string;
  credits_balance: number;
  terms_accepted: boolean;
};

interface PiAuthContextType {
  isAuthenticated: boolean;
  authMessage: string;
  piAccessToken: string | null;
  userData: LoginDTO | null;
  reinitialize: () => Promise<void>;
}

const PiAuthContext = createContext<PiAuthContextType | undefined>(undefined);

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState("Initializing...");
  const [piAccessToken, setPiAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginDTO | null>(null);

  const initializePiAndAuthenticate = async () => {
    try {
      // 1. Provjera i učitavanje SDK-a
      if (typeof window.Pi === "undefined") {
         setAuthMessage("Waiting for Pi SDK...");
         await new Promise(r => setTimeout(r, 1000));
         if (typeof window.Pi === "undefined") {
             // Ako nema Pi SDK, možda smo u običnom pregledniku?
             console.warn("Pi SDK not found - are you in Pi Browser?");
             // Nastavljamo dalje da se aplikacija ne sruši skroz
         }
      }

      // Ako je Pi SDK tu, inicijaliziraj ga
      if (typeof window.Pi !== "undefined") {
          await window.Pi.init({ version: "2.0", sandbox: PI_NETWORK_CONFIG.SANDBOX });
          
          setAuthMessage("Authenticating with Pi...");
          const piAuthResult = await window.Pi.authenticate(["username"]);
          const token = piAuthResult.accessToken;
          
          setPiAccessToken(token);
          setApiAuthToken(token);

          // 2. Spajanje na naš Backend
          setAuthMessage(`Contacting Server...`);
          
          try {
            const loginRes = await api.post<LoginDTO>(BACKEND_URLS.LOGIN, {
              pi_auth_token: token,
            });

            console.log("Backend success:", loginRes);
            setUserData(loginRes.data);
            setIsAuthenticated(true);
            setAuthMessage("Login successful! ✅");
            
          } catch (backendError: any) {
            console.error("Backend login failed:", backendError);
            // OVO JE ONA PORUKA KOJU ČEKAMO:
            throw new Error(`Server Error: ${backendError.message || "Unknown"}`);
          }
      } else {
          setAuthMessage("Please open in Pi Browser app");
      }

    } catch (err: any) {
      console.error("Auth flow failed:", err);
      setAuthMessage(`ERROR: ${err.message}`);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    initializePiAndAuthenticate();
  }, []);

  return (
    <PiAuthContext.Provider value={{ isAuthenticated, authMessage, piAccessToken, userData, reinitialize: initializePiAndAuthenticate }}>
      {children}
    </PiAuthContext.Provider>
  );
}

export function usePiAuth() {
  const context = useContext(PiAuthContext);
  if (context === undefined) throw new Error("usePiAuth must be used within PiAuthProvider");
  return context;
}