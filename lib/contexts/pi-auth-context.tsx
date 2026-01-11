"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
  const [authMessage, setAuthMessage] = useState("Inicijalizacija...");
  const [piAccessToken, setPiAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginDTO | null>(null);

  const initializePiAndAuthenticate = async () => {
    try {
      if (typeof window.Pi === "undefined") {
        setAuthMessage("Čekam Pi SDK...");
        await new Promise(r => setTimeout(r, 2000));
        if (typeof window.Pi === "undefined") throw new Error("SDK nije učitan");
      }

      await window.Pi.init({ version: "2.0" });
      setAuthMessage("POPUŠTAJ BLOKADU: Provjeri iskače li prozor...");
      
      // @ts-ignore
      const piAuthResult = await window.Pi.authenticate(['username', 'payments'], {
        onIncompletePaymentFound: (payment: any) => {
          console.log("Nedovršeno plaćanje", payment);
        },
      });

      const token = piAuthResult.accessToken;
      setPiAccessToken(token);
      setApiAuthToken(token);

      setAuthMessage("Spajanje s bazom...");
      
      const loginRes = await api.post<LoginDTO>("/api/v1/pi", {
        pi_auth_token: token,
      });

      setUserData(loginRes.data);
      setIsAuthenticated(true);
      setAuthMessage("Prijava uspješna! ✅");

    } catch (err: any) {
      console.error("Auth Error:", err);
      setAuthMessage(`GREŠKA: ${err.message || "Provjeri develop.pi"}`);
    }
  };

  useEffect(() => {
    initializePiAndAuthenticate();
  }, []);

  return (
    <PiAuthContext.Provider value={{ 
      isAuthenticated, 
      authMessage, 
      piAccessToken, 
      userData, 
      reinitialize: initializePiAndAuthenticate 
    }}>
      {children}
    </PiAuthContext.Provider>
  );
}

export function usePiAuth() {
  const context = useContext(PiAuthContext);
  if (context === undefined) throw new Error("usePiAuth error");
  return context;
}