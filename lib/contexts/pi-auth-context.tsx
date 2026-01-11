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
  const [authMessage, setAuthMessage] = useState("Pokretanje...");
  const [piAccessToken, setPiAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginDTO | null>(null);

  const initializePiAndAuthenticate = async () => {
    try {
      // 1. Čekanje na SDK
      let checks = 0;
      while (typeof window.Pi === "undefined" && checks < 5) {
        setAuthMessage(`Čekam Pi SDK (${checks + 1}/5)...`);
        await new Promise(r => setTimeout(r, 1000));
        checks++;
      }

      if (typeof window.Pi === "undefined") {
        throw new Error("Pi SDK nije učitan. Provjeri internet ili otvori u Pi Browseru.");
      }

      // 2. Inicijalizacija
      setAuthMessage("SDK učitan. Inicijalizacija...");
      await window.Pi.init({ version: "2.0" });

      // 3. Autentifikacija s "osiguračem"
      setAuthMessage("POPUŠTAJ BLOKADU: Provjeri iskače li prozor...");
      
      // 3. Autentifikacija s "osiguračem"
      setAuthMessage("POPUŠTAJ BLOKADU: Provjeri iskače li prozor...");
      
      // @ts-ignore - Ignoriraj TS grešku jer Pi SDK prima dva argumenta
      const piAuthResult = await window.Pi.authenticate(['username', 'payments'], {
        onIncompletePaymentFound: (payment: any) => {
          console.log("Pronađeno nedovršeno plaćanje", payment);
        },
      });const piAuthResult = await window.Pi.authenticate(['username', 'payments'], {
        onIncompletePaymentFound: (payment) => {
          console.log("Pronađeno nedovršeno plaćanje", payment);
        },
      });

      // Ako dođemo ovdje, prijava je uspjela!
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
      // Ako korisnik odbije ili SDK zapne
      setAuthMessage(`GREŠKA: ${err.message || "Provjeri develop.pi postavke"}`);
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