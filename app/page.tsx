"use client";

import { usePiAuth } from "@/lib/contexts/pi-auth-context";
import { useEffect, useState } from "react";

export default function Home() {
  const auth = usePiAuth();

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '100vh', color: 'black' }}>
      {/* DIJAGNOSTIKA */}
      <div style={{ background: '#000', color: '#0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>STATUS: {auth.authMessage}</h2>
        <button 
          onClick={() => window.location.reload()}
          style={{ background: '#333', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
          🔄 OSVJEŽI STRANICU
        </button>
      </div>

      <h1 style={{ fontSize: '24px' }}>Regional Pi Hub</h1>
      
      {auth.isAuthenticated ? (
        <div style={{ background: '#d4edda', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          <p>✅ Prijavljeni ste kao: <strong>{auth.userData?.username}</strong></p>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p>Kliknite ispod ako prozor za prijavu nije iskočio:</p>
          <button 
            onClick={() => auth.reinitialize()}
            style={{ width: '100%', padding: '15px', background: '#8A2BE2', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold' }}
          >
            🔑 POKUŠAJ PRIJAVU PONOVO
          </button>
        </div>
      )}
    </div>
  );
}