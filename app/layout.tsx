"use client";

import { PiAuthProvider } from "@/lib/contexts/pi-auth-context";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Prvo definiramo "mounted" da izbjegnemo build grešku
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pozivamo auth, ali ga nećemo "forsirati" dok se stranica ne učita
  const auth = usePiAuth();

  // Ako se stranica još gradi na Vercelu, prikaži prazno da ne pukne build
  if (!mounted) {
    return <div style={{ padding: '20px' }}>Učitavanje...</div>;
  }

  return (
    <div>
      {/* --- DIJAGNOSTIKA (SAFE MODE) --- */}
      <div className="debug-box" style={{ background: 'black', color: '#00ff00', padding: '10px', border: '2px solid red', marginBottom: '20px', fontFamily: 'monospace' }}>
        <h3>DIJAGNOSTIKA (SAFE MODE):</h3>
        <p>JS UČITAN: DA ✅</p>
        <p>STATUS: {auth.isAuthenticated ? "PRIJAVLJEN" : "NIJE PRIJAVLJEN"}</p>
        <p>PORUKA: {auth.authMessage}</p>
        <p>USER: {auth.userData ? auth.userData.username : "NEMA PODATAKA"}</p>
      </div>
      {/* -------------------- */}

      <h1>Regional Pi Hub</h1>
      <p>Dobrodošao, {auth.userData?.username || "Gost"}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          style={{ border: '1px solid black', padding: '15px', margin: '10px', background: '#f0f0f0' }}
          onClick={() => alert("Glasanje radi!")}
        >
          🗳️ GLASAJ (VOTE)
        </button>

        <button 
          style={{ border: '1px solid black', padding: '15px', margin: '10px', background: '#f0f0f0' }}
          onClick={() => alert("Prijedlozi rade!")}
        >
          📜 PRIJEDLOZI
        </button>
      </div>
    </div>
  );
}