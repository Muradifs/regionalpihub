// @ts-nocheck
"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { 
  Users, MessageSquare, Vote, TrendingUp, Calendar, Globe, 
  Plus, MapPin 
} from "lucide-react";

// --- INTEGRIRANI PI AUTH KONTEKST ---
// Ovo rješava problem s uvozom "@ /lib/contexts/pi-auth-context" 
// tako što svu logiku drži unutar jedne datoteke.
const PiAuthContext = createContext(null);

export function PiAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState("Sustav spreman za prijavu.");
  const [userData, setUserData] = useState(null);

  const reinitialize = async () => {
    setAuthMessage("Otvaram prozor za prijavu...");
    // Simulacija prijave za potrebe funkcionalnosti unutar preglednika
    setTimeout(() => {
      setIsAuthenticated(true);
      setUserData({
        username: "muradifs",
        credits_balance: 100,
        pi_id: "user_123456789"
      });
      setAuthMessage("Prijava uspješna!");
    }, 1200);
  };

  return (
    <PiAuthContext.Provider value={{ isAuthenticated, authMessage, userData, reinitialize }}>
      {children}
    </PiAuthContext.Provider>
  );
}

export const usePiAuth = () => {
  const context = useContext(PiAuthContext);
  if (!context) return { isAuthenticated: false, authMessage: "Greška: Provider nije pronađen" };
  return context;
};

// --- SUSTAV PRIJEVODA ---
const translations = {
  en: { flag: "🇬🇧", home: "Home", profile: "Profile", votes: "votes", vote: "Vote", activeProposals: "Active Proposals" },
  hr: { flag: "🇭🇷", home: "Početna", profile: "Profil", votes: "glasova", vote: "Glasaj", activeProposals: "Aktivni Prijedlozi" },
  bs: { flag: "🇧🇦", home: "Početna", profile: "Profil", votes: "glasova", vote: "Glasaj", activeProposals: "Aktivni Prijedlozi" },
  sr: { flag: "🇷🇸", home: "Početna", profile: "Profil", votes: "glasova", vote: "Glasaj", activeProposals: "Aktivni Predlozi" },
  mk: { flag: "🇲🇰", home: "Почетна", profile: "Профил", votes: "гласови", vote: "Гласај", activeProposals: "Активни Предлози" }
};

// --- KOMPONENTA DASHBOARDA ---
function RegionalHubApp() {
  const auth = usePiAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState('sr');

  const t = (key) => translations[lang]?.[key] || key;

  // PRIKAZ EKRANA ZA PRIJAVU
  if (!auth || !auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mb-6 shadow-inner text-purple-600 text-4xl font-black">
          π
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter uppercase">REGIONAL HUB</h1>
        
        <div className="w-full max-w-xs bg-slate-900 text-green-400 p-4 rounded-2xl mb-8 font-mono text-[10px] shadow-2xl border border-slate-700">
          <p className="animate-pulse tracking-widest uppercase">STATUS: {auth?.authMessage || "Učitavanje..."}</p>
        </div>

        <button 
          onClick={() => auth?.reinitialize()}
          className="w-full max-w-xs bg-[#8A2BE2] hover:bg-[#7B1FA2] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-purple-200 active:scale-95 transition-all animate-bounce flex items-center justify-center gap-3 border-b-4 border-purple-900"
        >
          🔑 PRIJAVI SE (PI BROWSER)
        </button>
        
        <p className="mt-6 text-slate-400 text-[10px] font-black tracking-[0.2em] opacity-60">
          Pi Network SDK v1.0.8
        </p>
      </div>
    );
  }

  // GLAVNI INTERFEJS NAKON PRIJAVE
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-28 animate-in fade-in duration-500">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b p-5 flex justify-between items-center shadow-sm">
        <h1 className="font-black text-xl text-[#8A2BE2] tracking-tighter italic">REGIONAL HUB</h1>
        <button 
          onClick={() => {
            const keys = Object.keys(translations);
            setLang(keys[(keys.indexOf(lang) + 1) % keys.length]);
          }}
          className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <span className="text-xl leading-none">{translations[lang].flag}</span>
          <span className="text-[10px] font-black uppercase text-slate-500">{lang}</span>
        </button>
      </header>

      <main className="max-w-xl mx-auto p-6 space-y-8">
        <div className="relative w-full h-44 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center">
          <Globe className="absolute opacity-10 w-40 h-40 text-purple-500 animate-pulse" />
          <div className="relative text-center">
            <h2 className="text-white font-black text-2xl flex items-center justify-center gap-2">
              <MapPin className="text-rose-500 fill-current" /> Balkans Hub
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest">Veza aktivna</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <Users className="w-5 h-5 text-purple-600 mb-3" />
            <p className="font-black text-lg truncate tracking-tight">@{auth.userData?.username || "muradifs"}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("profile")}</span>
          </div>
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <TrendingUp className="w-5 h-5 text-emerald-600 mb-3" />
            <p className="font-black text-lg tracking-tight">{auth.userData?.credits_balance || 0} Pi</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo bodova</span>
          </div>
        </div>

        <section className="space-y-4 pt-2">
           <h3 className="font-black text-lg px-2 flex items-center gap-2">
             <Vote className="w-5 h-5 text-[#8A2BE2]" /> {t("activeProposals")}
           </h3>
           {[
             { id: 1, title: "Regional Hub Balkans", votes: 1420 },
             { id: 2, title: "Pi Merchant BiH", votes: 890 }
           ].map(p => (
             <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm group active:bg-slate-50 transition-colors">
               <div className="flex-1">
                 <h4 className="font-black text-sm text-slate-700 group-hover:text-[#8A2BE2] transition-colors">{p.title}</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{p.votes} {t("votes")}</p>
               </div>
               <button className="bg-purple-50 text-[#8A2BE2] px-4 py-2 rounded-xl text-[10px] font-black border border-purple-100 hover:bg-purple-100 transition-all">
                 {t("vote")}
               </button>
             </div>
           ))}
        </section>
      </main>

      <nav className="fixed bottom-6 left-6 right-6 max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[3rem] px-8 py-4 flex items-center justify-between shadow-2xl z-50">
        <NavBtn icon={Users} active={activeTab === 'home'} label={t("home")} onClick={() => setActiveTab('home')} />
        <NavBtn icon={MessageSquare} active={activeTab === 'forum'} label="Forum" onClick={() => setActiveTab('forum')} />
        
        <div className="relative -mt-16 group">
          <button className="bg-[#8A2BE2] p-5 rounded-full text-white shadow-2xl shadow-purple-300 group-hover:scale-110 group-hover:rotate-90 active:scale-90 transition-all">
            <Plus className="w-8 h-8" />
          </button>
        </div>

        <NavBtn icon={Vote} active={activeTab === 'proposals'} label="Vot" onClick={() => setActiveTab('proposals')} />
        <NavBtn icon={Calendar} active={activeTab === 'events'} label="Event" onClick={() => setActiveTab('events')} />
      </nav>
    </div>
  );
}

function NavBtn({ icon: Icon, active, label, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#8A2BE2] scale-110' : 'text-slate-400 opacity-60'}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'fill-[#8A2BE2]/10' : ''}`} />
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

// Default export koji sadrži Provider omotač
export default function App() {
  return (
    <PiAuthProvider>
      <RegionalHubApp />
    </PiAuthProvider>
  );
}