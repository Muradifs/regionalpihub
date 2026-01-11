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
    // Simulacija prijave
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
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mb-6 shadow-inner text-purple-600 text-4xl font-black">
          π
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter uppercase">REGIONAL HUB</h1>
        
        <div className="w-full max-w-xs bg-slate-900 text-green-400 p-4 rounded-2xl mb-8 font-mono text-[10px] shadow-2xl border border-slate-700">
          <p className="animate-pulse tracking-widest uppercase text-center">STATUS: {auth?.authMessage || "Učitavanje..."}</p>
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32 animate-in fade-in duration-500 font-sans">
      {/* Poboljšano zaglavlje s fiksnim vrhom */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8A2BE2] rounded-lg flex items-center justify-center text-white font-bold text-sm">π</div>
          <h1 className="font-black text-lg text-slate-800 tracking-tighter">REGIONAL HUB</h1>
        </div>
        
        <button 
          onClick={() => {
            const keys = Object.keys(translations);
            setLang(keys[(keys.indexOf(lang) + 1) % keys.length]);
          }}
          className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <span className="text-lg leading-none">{translations[lang].flag}</span>
          <span className="text-[10px] font-black uppercase text-slate-500">{lang}</span>
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Hub Vizualna kartica */}
        <div className="relative w-full h-48 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white">
          <Globe className="absolute opacity-10 w-44 h-44 text-purple-500 animate-pulse" />
          <div className="relative text-center p-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MapPin className="text-rose-500 fill-current w-5 h-5" />
              <h2 className="text-white font-black text-2xl tracking-tight">Balkans Hub</h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Veza aktivna</p>
            </div>
          </div>
        </div>

        {/* Korisničke statistike u gridu 2 kolone */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="font-black text-base text-slate-800 truncate w-full">@{auth.userData?.username || "muradifs"}</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("profile")}</span>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="font-black text-base text-slate-800">{auth.userData?.credits_balance || 0} Pi</p>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo bodova</span>
          </div>
        </div>

        {/* Sekcija prijedloga */}
        <section className="space-y-4 pt-2">
           <div className="flex justify-between items-center px-2">
             <h3 className="font-black text-lg flex items-center gap-2 text-slate-800">
               <Vote className="w-5 h-5 text-[#8A2BE2]" /> {t("activeProposals")}
             </h3>
             <span className="text-[10px] font-black text-[#8A2BE2] uppercase tracking-widest">Vidi sve</span>
           </div>
           
           <div className="grid grid-cols-1 gap-3">
             {[
               { id: 1, title: "Regional Hub Balkans", votes: 1420, icon: "🌍" },
               { id: 2, title: "Pi Merchant BiH", votes: 890, icon: "🇧🇦" }
             ].map(p => (
               <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center shadow-sm group active:scale-[0.98] transition-all">
                 <div className="flex items-center gap-4">
                   <div className="text-2xl">{p.icon}</div>
                   <div>
                     <h4 className="font-black text-sm text-slate-700 group-hover:text-[#8A2BE2] transition-colors">{p.title}</h4>
                     <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{p.votes} {t("votes")}</p>
                   </div>
                 </div>
                 <button className="bg-purple-50 text-[#8A2BE2] px-4 py-2 rounded-xl text-[10px] font-black border border-purple-100 hover:bg-[#8A2BE2] hover:text-white transition-all shadow-sm">
                   {t("vote")}
                 </button>
               </div>
             ))}
           </div>
        </section>
      </main>

      {/* Donja navigacija s fiksnim položajem i boljim razmakom */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <NavBtn icon={Users} active={activeTab === 'home'} label={t("home")} onClick={() => setActiveTab('home')} />
        <NavBtn icon={MessageSquare} active={activeTab === 'forum'} label={t("forum")} onClick={() => setActiveTab('forum')} />
        
        {/* Središnji "Action" gumb */}
        <div className="relative -mt-12">
          <button className="bg-[#8A2BE2] p-4 rounded-full text-white shadow-xl shadow-purple-300 hover:scale-110 active:scale-90 transition-all border-4 border-white">
            <Plus className="w-7 h-7" />
          </button>
        </div>

        <NavBtn icon={Vote} active={activeTab === 'proposals'} label="Vot" onClick={() => setActiveTab('proposals')} />
        <NavBtn icon={Calendar} active={activeTab === 'events'} label="Event" onClick={() => setActiveTab('events')} />
      </nav>
    </div>
  );
}

/**
 * Pomoćna komponenta za gumbe u donjoj navigaciji
 */
function NavBtn({ icon: Icon, active, label, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition-all min-w-[50px] ${active ? 'text-[#8A2BE2] scale-105' : 'text-slate-400 opacity-70'}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'fill-[#8A2BE2]/10' : ''}`} />
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}

// Glavni izvoz aplikacije
export default function App() {
  return (
    <PiAuthProvider>
      <RegionalHubApp />
    </PiAuthProvider>
  );
}