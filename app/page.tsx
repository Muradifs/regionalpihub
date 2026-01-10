"use client";

import { usePiAuth } from "@/lib/contexts/pi-auth-context";
import { useEffect, useState } from "react";

export default function Home() {
  const { userData, isAuthenticated, authMessage, piAccessToken } = usePiAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {/* --- DIJAGNOSTIKA --- */}
      <div className="debug-box">
        <h3>DIJAGNOSTIKA (SAFE MODE):</h3>
        <p>JS UČITAN: {mounted ? "DA ✅" : "NE ❌"}</p>
        <p>STATUS: {isAuthenticated ? "PRIJAVLJEN" : "NIJE PRIJAVLJEN"}</p>
        <p>PORUKA: {authMessage}</p>
        <p>USER: {userData ? userData.username : "NEMA PODATAKA"}</p>
      </div>
      {/* -------------------- */}

      <h1>Regional Pi Hub</h1>
      <p>Dobrodošao, {userData?.username || "Gost"}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => alert("Glasanje radi!")}>
          🗳️ GLASAJ (VOTE)
        </button>

        <button onClick={() => alert("Prijedlozi rade!")}>
          📜 PRIJEDLOZI
        </button>
      </div>
    </div>
  );
}