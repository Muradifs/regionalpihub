// @ts-nocheck
"use client";

import React, { useState } from "react";
import { usePiAuth } from "@/lib/contexts/pi-auth-context";
import {
  Users, MessageSquare, Vote, TrendingUp, Calendar, Globe, 
  ChevronRight, Plus, Search, Bell, Menu, X, MapPin
} from "lucide-react";

const translations = {
  en: { flag: "🇬🇧", home: "Home", forum: "Forum", proposals: "Proposals", events: "Events", search: "Search...", activeProposals: "Active Proposals", all: "View All", votes: "votes", vote: "Vote", profile: "Profile" },
  hr: { flag: "🇭🇷", home: "Početna", forum: "Forum", proposals: "Prijedlozi", events: "Događaji", search: "Pretraži...", activeProposals: "Aktivni Prijedlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", profile: "Profil" },
  bs: { flag: "🇧🇦", home: "Početna", forum: "Forum", proposals: "Prijedlozi", events: "Događaji", search: "Pretraži...", activeProposals: "Aktivni Prijedlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", profile: "Profil" },
  sr: { flag: "🇷🇸", home: "Početna", forum: "Forum", proposals: "Predlozi", events: "Događaji", search: "Pretraži...", activeProposals: "Aktivni Predlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", profile: "Profil" },
  mk: { flag: "🇲🇰", home: "Почетна", forum: "Форум", proposals: "Предлози", events: "Настани", search: "Пребарај...", activeProposals: "Активни Предлози", all: "Види ги сите", votes: "гласови", vote: "Гласај", profile: "Профил" }
};

export default function App() {
  const auth = usePiAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState('sr');

  const t = (key: string) => translations[lang][key] || key;
  const langKeys = Object.keys(translations);

  if (!auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
        <h1 className="text-3xl font-black text-indigo-700 mb-4">REGIONAL HUB</h1>
        <div className="bg-black text-green-400 p-4 rounded-2xl mb-8 font-mono text-[10px] w-full max-w-xs uppercase">
          STATUS: {auth.authMessage}
        </div>
        <button onClick={() => auth.reinitialize()} className="bg-[#8A2BE2] text-white px-10 py-5 rounded-2xl font-black animate-bounce shadow-xl">
          🔑 PRIJAVI SE (PI BROWSER)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 pb-28">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b p-4 flex justify-between items-center">
        <h1 className="font-black text-lg text-indigo-600 uppercase">{t("home")}</h1>
        <button onClick={() => setLang(langKeys[(langKeys.indexOf(lang) + 1) % langKeys.length])} className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl">
          <span>{translations[lang].flag}</span>
          <span className="text-[10px] font-black uppercase">{lang}</span>
        </button>
      </header>

      <main className="max-w-xl mx-auto px-6 py-8">
        <div className="relative w-full h-40 bg-slate-900 rounded-[2rem] overflow-hidden mb-8 flex items-center justify-center text-white">
          <Globe className="absolute opacity-20 w-32 h-32 text-indigo-500" />
          <div className="relative text-center">
            <h2 className="font-black text-xl flex items-center justify-center gap-2"><MapPin className="text-rose-500" /> Balkans Hub</h2>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mt-1">Sistem Online</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100">
            <Users className="w-4 h-4 text-indigo-600 mb-2" />
            <p className="text-lg font-black truncate">@{auth.userData?.username || "muradifs"}</p>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t("profile")}</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100">
            <TrendingUp className="w-4 h-4 text-emerald-600 mb-2" />
            <p className="text-lg font-black">{auth.userData?.credits_balance || 0} Pi</p>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Balance</span>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-black">{t("activeProposals")}</h2>
          {[{ id: 1, title: "Regional Hub Balkans", votes: 1420 }, { id: 2, title: "Merchant Program BiH", votes: 890 }].map(p => (
            <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-black text-sm">{p.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{p.votes} {t("votes")}</p>
              </div>
              <button className="bg-slate-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black border border-slate-100">{t("vote")}</button>
            </div>
          ))}
        </section>
      </main>

      <nav className="fixed bottom-6 left-6 right-6 max-w-lg mx-auto bg-white/90 backdrop-blur-2xl border rounded-[2.5rem] px-8 py-4 flex items-center justify-between shadow-2xl">
        <NavButton active={activeTab === 'home'} icon={Users} label={t("home")} onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'forum'} icon={MessageSquare} label={t("forum")} onClick={() => setActiveTab('forum')} />
        <button className="bg-indigo-600 p-4 rounded-full text-white -mt-12 shadow-lg"><Plus /></button>
        <NavButton active={activeTab === 'proposals'} icon={Vote} label={t("proposals")} onClick={() => setActiveTab('proposals')} />
        <NavButton active={activeTab === 'events'} icon={Calendar} label={t("events")} onClick={() => setActiveTab('events')} />
      </nav>
    </div>
  );
}

function NavButton({ active, icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
      <Icon className="w-5 h-5" />
      <span className="text-[8px] font-black uppercase">{label}</span>
    </button>
  );
}