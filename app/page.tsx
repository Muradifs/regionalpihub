// @ts-nocheck
"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { 
  Users, MessageSquare, Vote, TrendingUp, Calendar, Globe, 
  Plus, MapPin, ChevronRight, Bell, Menu
} from "lucide-react";

// --- INTEGRIRANI PI AUTH KONTEKST ---
const PiAuthContext = createContext(null);

export function PiAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMessage, setAuthMessage] = useState("Sustav spreman za prijavu.");
  const [userData, setUserData] = useState(null);

  const reinitialize = async () => {
    setAuthMessage("Otvaram prozor za prijavu...");
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
  en: { flag: "🇬🇧", home: "Home", profile: "Profile", votes: "votes", vote: "Vote", activeProposals: "Active Proposals", forum: "Forum", events: "Events" },
  hr: { flag: "🇭🇷", home: "Početna", profile: "Profil", votes: "glasova", vote: "Glasaj", activeProposals: "Aktivni Prijedlozi", forum: "Forum", events: "Događaji" },
  bs: { flag: "🇧🇦", home: "Početna", profile: "Profil", votes: "glasova", vote: "Glasaj", activeProposals: "Aktivni Prijedlozi", forum: "Forum", events: "Događaji" },
  sr: { flag: "🇷🇸", home: "Početna", profile: "Profil", votes: "glasova", vote: "Glasaj", activeProposals: "Aktivni Predlozi", forum: "Forum", events: "Događaji" },
  mk: { flag: "🇲🇰", home: "Почетна", profile: "Профил", votes: "гласови", vote: "Гласај", activeProposals: "Активни Предлози", forum: "Форум", events: "Настани" }
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
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center">
        <style>{`
          .login-container { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; font-family: sans-serif; }
          .pi-logo { width: 80px; height: 80px; background: #f3e8ff; border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #8A2BE2; font-size: 40px; font-weight: 900; margin-bottom: 24px; }
          .status-box { background: #0f172a; color: #4ade80; padding: 16px; border-radius: 16px; font-family: monospace; font-size: 12px; width: 100%; max-width: 320px; margin-bottom: 32px; border: 1px solid #334155; }
          .login-btn { background: #8A2BE2; color: white; padding: 20px 48px; border-radius: 32px; font-weight: 900; font-size: 18px; border: none; cursor: pointer; border-bottom: 4px solid #4c1d95; }
        `}</style>
        <div className="pi-logo">π</div>
        <h1 className="text-3xl font-black text-gray-800 mb-2 uppercase">REGIONAL HUB</h1>
        <div className="status-box">
          <p className="animate-pulse">STATUS: {auth?.authMessage || "Učitavanje..."}</p>
        </div>
        <button onClick={() => auth?.reinitialize()} className="login-btn">
          🔑 PRIJAVI SE (PI BROWSER)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-32">
      {/* DODATNI CSS ZA LAYOUT SIGURNOST */}
      <style>{`
        .hub-header { position: sticky; top: 0; z-index: 50; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid #e2e8f0; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
        .hub-card { background: white; border-radius: 32px; border: 1px solid #f1f5f9; padding: 20px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); display: flex; flex-direction: column; align-items: center; text-align: center; }
        .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; box-shadow: 0 -4px 10px rgba(0,0,0,0.05); z-index: 100; }
        .proposal-item { background: white; border-radius: 24px; border: 1px solid #f1f5f9; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .map-card { width: 100%; height: 180px; background: #0f172a; border-radius: 40px; border: 4px solid white; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; margin-bottom: 24px; }
      `}</style>

      {/* HEADER */}
      <header className="hub-header">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8A2BE2] rounded-lg flex items-center justify-center text-white font-bold">π</div>
          <h1 className="font-black text-lg text-gray-800 tracking-tighter">REGIONAL HUB</h1>
        </div>
        
        <button 
          onClick={() => {
            const keys = Object.keys(translations);
            setLang(keys[(keys.indexOf(lang) + 1) % keys.length]);
          }}
          className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm active:scale-95"
        >
          <span className="text-xl leading-none">{translations[lang].flag}</span>
          <span className="text-[10px] font-black uppercase text-gray-500">{lang}</span>
        </button>
      </header>

      <main className="max-w-md mx-auto p-4">
        {/* VISUAL MAP CARD */}
        <div className="map-card shadow-2xl">
          <Globe className="absolute opacity-10 w-44 h-44 text-purple-500 animate-pulse" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="text-rose-500 fill-current w-5 h-5" />
              <h2 className="text-white font-black text-2xl tracking-tight">Balkans Hub</h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Veza aktivna</p>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="stat-grid">
          <div className="hub-card">
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-black text-base text-gray-800 truncate w-full">@{auth.userData?.username || "muradifs"}</p>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("profile")}</span>
          </div>
          <div className="hub-card">
            <TrendingUp className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="font-black text-base text-gray-800">{auth.userData?.credits_balance || 0} Pi</p>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saldo bodova</span>
          </div>
        </div>

        {/* PROPOSALS */}
        <section className="mt-8">
           <div className="flex justify-between items-center mb-4 px-2">
             <h3 className="font-black text-lg flex items-center gap-2 text-gray-800">
               <Vote className="w-5 h-5 text-[#8A2BE2]" /> {t("activeProposals")}
             </h3>
             <span className="text-[10px] font-black text-[#8A2BE2] uppercase tracking-widest">Vidi sve</span>
           </div>
           
           {[
             { id: 1, title: "Regional Hub Balkans", votes: 1420, icon: "🌍" },
             { id: 2, title: "Pi Merchant BiH", votes: 890, icon: "🇧🇦" }
           ].map(p => (
             <div key={p.id} className="proposal-item shadow-sm active:scale-[0.98] transition-all">
               <div className="flex items-center gap-4">
                 <div className="text-2xl">{p.icon}</div>
                 <div className="text-left">
                   <h4 className="font-black text-sm text-gray-700">{p.title}</h4>
                   <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{p.votes} {t("votes")}</p>
                 </div>
               </div>
               <button className="bg-purple-50 text-[#8A2BE2] px-4 py-2 rounded-xl text-[10px] font-black border border-purple-100 shadow-sm active:bg-[#8A2BE2] active:text-white transition-all">
                 {t("vote")}
               </button>
             </div>
           ))}
        </section>
      </main>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        <NavBtn icon={Users} active={activeTab === 'home'} label={t("home")} onClick={() => setActiveTab('home')} />
        <NavBtn icon={MessageSquare} active={activeTab === 'forum'} label={t("forum")} onClick={() => setActiveTab('forum')} />
        
        <div className="relative -mt-12">
          <button className="bg-[#8A2BE2] w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center border-4 border-white active:scale-90 transition-all">
            <Plus className="w-7 h-7" />
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
      className="flex flex-col items-center gap-1 min-w-[50px] border-none bg-transparent cursor-pointer"
      style={{ color: active ? '#8A2BE2' : '#94a3b8', transform: active ? 'scale(1.05)' : 'scale(1)' }}
    >
      <Icon className="w-5 h-5" />
      <span style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase' }}>{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <PiAuthProvider>
      <RegionalHubApp />
    </PiAuthProvider>
  );
}