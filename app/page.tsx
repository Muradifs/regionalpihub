// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { usePiAuth } from "@/lib/contexts/pi-auth-context";
import {
  Users, MessageSquare, Vote, TrendingUp, Calendar, Globe, 
  ChevronRight, Plus, Search, Bell, Menu, X, MapPin
} from "lucide-react";

const translations = {
  en: { flag: "🇬🇧", home: "Home", forum: "Forum", proposals: "Proposals", events: "Events", search: "Search...", activeProposals: "Active Proposals", all: "View All", votes: "votes", vote: "Vote", profile: "Profile", closeMenu: "Close Menu", confirmVote: "Confirm Vote", proposalDetail: "Proposal Detail" },
  hr: { flag: "🇭🇷", home: "Početna", forum: "Forum", proposals: "Prijedlozi", events: "Događaji", search: "Pretraži...", activeProposals: "Aktivni Prijedlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", profile: "Profil", closeMenu: "Zatvori", confirmVote: "Potvrdi Glas", proposalDetail: "Detalji Prijedloga" },
  bs: { flag: "🇧🇦", home: "Početna", forum: "Forum", proposals: "Prijedlozi", events: "Događaji", search: "Pretraži...", activeProposals: "Aktivni Prijedlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", profile: "Profil", closeMenu: "Zatvori", confirmVote: "Potvrdi Glas", proposalDetail: "Detalji Prijedloga" },
  sr: { flag: "🇷🇸", home: "Početna", forum: "Forum", proposals: "Predlozi", events: "Događaji", search: "Pretraži...", activeProposals: "Aktivni Predlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", profile: "Profil", closeMenu: "Zatvori", confirmVote: "Potvrdi Glas", proposalDetail: "Detalji Predloga" },
  mk: { flag: "🇲🇰", home: "Почетна", forum: "Форум", proposals: "Предлози", events: "Настани", search: "Пребарај...", activeProposals: "Активни Предлози", all: "Види ги сите", votes: "гласови", vote: "Гласај", profile: "Профил", closeMenu: "Затвори", confirmVote: "Потврди глас", proposalDetail: "Детали за предлогот" }
};

const Card = ({ children, className = "", onClick }: any) => (
  <div onClick={onClick} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm ${onClick ? 'cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", className = "", onClick }: any) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95",
    outline: "border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800",
  };
  return (
    <button onClick={onClick} className={`px-4 py-2.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default function App() {
  const auth = usePiAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [lang, setLang] = useState('sr');

  const t = (key: string) => translations[lang][key] || key;
  const langKeys = Object.keys(translations);

  if (!auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 text-center">
        <h1 className="text-3xl font-black text-indigo-700 mb-4 tracking-tighter uppercase">Regional Hub</h1>
        <div className="bg-black text-green-400 p-4 rounded-2xl mb-8 font-mono text-[10px] w-full max-w-xs shadow-2xl uppercase">
          STATUS: {auth.authMessage}
        </div>
        <button 
          onClick={() => auth.reinitialize()}
          className="bg-[#8A2BE2] text-white px-10 py-5 rounded-2xl font-black shadow-xl active:scale-95 transition-all animate-bounce"
        >
          🔑 PRIJAVI SE (PI BROWSER)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 font-sans pb-28">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-black text-lg tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent uppercase">{t("home")}</h1>
        </div>
        <button onClick={() => setLang(langKeys[(langKeys.indexOf(lang) + 1) % langKeys.length])} className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm">
          <span className="text-lg">{translations[lang].flag}</span>
          <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">{lang}</span>
        </button>
      </header>

      <main className="max-w-xl mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="relative w-full h-48 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center opacity-20"><Globe className="w-48 h-48 text-indigo-500" /></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="font-black text-2xl flex items-center gap-2"><MapPin className="text-rose-500 fill-current" /> Balkans Hub</h2>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mt-1">Sistem Online</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6"><Users className="w-4 h-4 text-indigo-600 mb-3" /><p className="text-xl font-black">@{auth.userData?.username || "muradifs"}</p><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t("profile")}</span></Card>
              <Card className="p-6"><TrendingUp className="w-4 h-4 text-emerald-600 mb-3" /><p className="text-xl font-black">{auth.userData?.credits_balance || 0} π</p><span className="text