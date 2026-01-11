"use client";

import { usePiAuth } from "@/lib/contexts/pi-auth-context";
import { useEffect, useState } from "react";

export default function Home() {
  const auth = usePiAuth();

  // Ako korisnik NIJE prijavljen, prikaži ekran za prijavu
  if (!auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Regional Pi Hub</h1>
        <div className="bg-black text-green-400 p-4 rounded-lg mb-6 font-mono text-xs">
          STATUS: {auth.authMessage}
        </div>
        <button 
          onClick={() => auth.reinitialize()}
          className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
        >
          🔑 PRIJAVI SE PREKO PI BROWSERA
        </button>
      </div>
    );
  }

  // Ako JE prijavljen, prikaži glavni dashboard
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Zaglavlje sa bodovima */}
      <header className="bg-purple-700 text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-purple-200 text-sm">Dobrodošao,</p>
            <h2 className="text-xl font-bold">@{auth.userData?.username}</h2>
          </div>
          <div className="bg-purple-800 px-4 py-2 rounded-full border border-purple-400">
            <span className="font-mono font-bold">{auth.userData?.credits_balance || 0} π</span>
          </div>
        </div>
      </header>

      {/* MAIN SEKCIJA - Ovdje ide glavni sadržaj */}
      <main className="p-6 space-y-8">
        
        {/* Info kartica */}
        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📜 Regionalni Hub</h3>
          <p className="text-gray-600 text-sm">Glasajte za projekte u vašoj regiji i gradite Pi ekosustav.</p>
        </section>

        {/* LISTA PRIJEDLOGA ZA GLASANJE */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            🗳️ Aktivna glasanja
          </h3>
          
          {[
            { id: 1, title: "Regionalni Pi Shop", votes: 154, cost: 5 },
            { id: 2, title: "Pi Edukacija Centar", votes: 89, cost: 3 }
          ].map((prijedlog) => (
            <div key={prijedlog.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-700">{prijedlog.title}</h4>
                <p className="text-xs text-gray-500">{prijedlog.votes} glasova</p>
              </div>
              <button 
                onClick={() => alert(`Glasali ste za ${prijedlog.title}! Potrošeno: ${prijedlog.cost} π`)}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold text-sm active:bg-purple-200 active:scale-95 transition-all"
              >
                GLASAJ ({prijedlog.cost} π)
              </button>
            </div>
          ))}
        </section>

        {/* Dodatna akcija */}
        <button className="w-full flex items-center justify-between bg-white border-2 border-purple-50 p-5 rounded-2xl hover:border-purple-500 transition-colors shadow-sm">
          <span className="text-lg font-semibold text-gray-700">✍️ Pošalji novi prijedlog</span>
          <span className="text-purple-600">→</span>
        </button>

      </main>

      {/* DIJAGNOSTIKA FOOTER (Pojavljuje se samo ako je baza offline) */}
      {auth.authMessage.includes("(Local)") && (
        <footer className="p-4">
           <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-center">
             <p className="text-xs text-yellow-700 italic">⚠️ Koristite lokalni profil. Provjerite MongoDB konekciju.</p>
           </div>
        </footer>
      )}
    </div>
  );
}