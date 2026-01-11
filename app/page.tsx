// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { usePiAuth } from "@/lib/contexts/pi-auth-context";
import {
  // @ts-nocheck
/* eslint-disable */
  Users, MessageSquare, Vote, TrendingUp, Calendar, Globe, 
  ChevronRight, Plus, Search, Bell, Menu, X, MapPin, 
  Clock, Filter, CheckCircle2, Share2, Heart
} from "lucide-react";

// --- 1. Prošireni sustav prijevoda ---
const translations = {
  en: { flag: "🇬🇧", home: "Home", forum: "Forum", proposals: "Proposals", events: "Events", members: "Members", discussions: "Discussions", active: "Active Now", search: "Search...", activeProposals: "Active Proposals", all: "View All", votes: "votes", vote: "Vote", forums: "Recent Discussions", replies: "replies", upcomingEvents: "Upcoming Events", calendar: "Calendar", register: "Register", regions: "Regional Hubs", proposalDetail: "Proposal Detail", currentProgress: "Current Progress", confirmVote: "Confirm Vote", discussion: "Discussion", writeReply: "Write a reply...", sendReply: "Send Reply", eventDetails: "Event Details", location: "Location", attendees: "Attendees", claimSpot: "Claim Spot", profile: "Profile", myActivity: "My Activity", regionalSettings: "Regional Settings", transparency: "Transparency", closeMenu: "Close Menu", version: "Version" },
  hr: { flag: "🇭🇷", home: "Početna", forum: "Forum", proposals: "Prijedlozi", events: "Događaji", members: "Članovi", discussions: "Rasprave", active: "Aktivno", search: "Pretraži...", activeProposals: "Aktivni Prijedlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", forums: "Nedavne rasprave", replies: "odgovora", upcomingEvents: "Predstojeći događaji", calendar: "Kalendar", register: "Prijavi se", regions: "Regionalni Hub-ovi", proposalDetail: "Detalji Prijedloga", currentProgress: "Trenutni Napredak", confirmVote: "Potvrdi Glas", discussion: "Rasprava", writeReply: "Napiši odgovor...", sendReply: "Pošalji Odgovor", eventDetails: "Detalji Događaja", location: "Lokacija", attendees: "Sudionika", claimSpot: "Rezerviraj Mjesto", profile: "Profil", myActivity: "Moja Aktivnost", regionalSettings: "Regionalne Postavke", transparency: "Transparentnost", closeMenu: "Zatvori Izbornik", version: "Verzija" },
  bs: { flag: "🇧🇦", home: "Početna", forum: "Forum", proposals: "Prijedlozi", events: "Događaji", members: "Članovi", discussions: "Diskusije", active: "Aktivno", search: "Pretraži...", activeProposals: "Aktivni Prijedlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", forums: "Nedavne diskusije", replies: "odgovora", upcomingEvents: "Predstojeći događaji", calendar: "Kalendar", register: "Prijavi se", regions: "Regionalni Hub-ovi", proposalDetail: "Detalji Prijedloga", currentProgress: "Trenutni Napredak", confirmVote: "Potvrdi Glas", discussion: "Diskusija", writeReply: "Napiši odgovor...", sendReply: "Pošalji Odgovor", eventDetails: "Detalji Događaja", location: "Lokacija", attendees: "Učesnika", claimSpot: "Rezerviši Mjesto", profile: "Profil", myActivity: "Moja Aktivnost", regionalSettings: "Regionalna Podešavanja", transparency: "Transparentnost", closeMenu: "Zatvori Meni", version: "Verzija" },
  sr: { flag: "rs", home: "Početna", forum: "Forum", proposals: "Predlozi", events: "Događaji", members: "Članovi", discussions: "Diskusije", active: "Aktivno", search: "Pretraži...", activeProposals: "Aktivni Predlozi", all: "Vidi sve", votes: "glasova", vote: "Glasaj", forums: "Nedavne diskusije", replies: "odgovora", upcomingEvents: "Predstojeći događaji", calendar: "Kalendar", register: "Prijavi se", regions: "Regionalni Hub-ovi", proposalDetail: "Detalji Predloga", currentProgress: "Trenutni Napredak", confirmVote: "Potvrdi Glas", discussion: "Diskusija", writeReply: "Napiši odgovor...", sendReply: "Pošalji Odgovor", eventDetails: "Detalji Događaja", location: "Lokacija", attendees: "Učesnika", claimSpot: "Rezerviši Mesto", profile: "Profil", myActivity: "Moja Aktivnost", regionalSettings: "Regionalna Podešavanja", transparency: "Transparentnost", closeMenu: "Zatvori Meni", version: "Verzija" },
  mk: { flag: "🇲🇰", home: "Почетна", forum: "Форум", proposals: "Предлози", events: "Настани", members: "Членови", discussions: "Дискусии", active: "Активно", search: "Пребарај...", activeProposals: "Активни Предлози", all: "Види ги сите", votes: "гласови", vote: "Гласај", forums: "Неодамнешни дискусии", replies: "одговори", upcomingEvents: "Претстојни настани", calendar: "Календар", register: "Пријави се", regions: "Регионални Центри", proposalDetail: "Детали за предлогот", currentProgress: "Тековен напредок", confirmVote: "Потврди глас", discussion: "Дискусија", writeReply: "Напиши одговор...", sendReply: "Испрати одговор", eventDetails: "Детали за настанот", location: "Локација", attendees: "Учесници", claimSpot: "Резервирај место", profile: "Профил", myActivity: "Моја активност", regionalSettings: "Регионални поставки", transparency: "Транспарентност", closeMenu: "Затвори мени", version: "Верзија" }
};

// --- Pomoćne UI Komponente ---
const Card = ({ children, className = "", onClick }: any) => (
  <div onClick={onClick} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", className = "", onClick }) => {
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

// --- Glavna Komponenta ---
export default function App() {
  const auth = usePiAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [lang, setLang] = useState('sr');

  const t = (key) => translations[lang][key] || key;
  const langKeys = Object.keys(translations);

  const toggleLang = () => {
    const currentIndex = langKeys.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langKeys.size;
    setLang(langKeys[nextIndex]);
  };

  // 1. Provjera prijave
  if (!auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 text-center">
        <h1 className="text-3xl font-black text-indigo-700 mb-4 tracking-tighter uppercase">Regional Hub</h1>
        <div className="bg-black text-green-400 p-4 rounded-2xl mb-8 font-mono text-[10px] w-full max-w-xs shadow-2xl">
          STATUS: {auth.authMessage}
        </div>
        <button 
          onClick={() => auth.reinitialize()}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-all"
        >
          PRIJAVI SE (PI BROWSER)
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 font-sans pb-28 transition-colors duration-500">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)} className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-black text-lg tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent uppercase">
            {t("home")}
          </h1>
        </div>
        
        {/* Language Switcher Button */}
        <button 
          onClick={() => {
            const nextLang = langKeys[(langKeys.indexOf(lang) + 1) % langKeys.length];
            setLang(nextLang);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm"
        >
          <span className="text-lg leading-none">{translations[lang].flag}</span>
          <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400">{lang}</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Vizualni Hub Status */}
            <div className="relative w-full h-48 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-[3s]">
                <Globe className="w-48 h-48 text-indigo-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                 <h2 className="text-white font-black text-2xl flex items-center gap-2">
                   <MapPin className="text-rose-500 fill-current" /> Balkans Hub
                 </h2>
                 <div className="flex items-center gap-2 mt-1">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">Sistem Online</p>
                 </div>
              </div>
            </div>

            {/* Statistika */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6">
                <Users className="w-4 h-4 text-indigo-600 mb-3" />
                <p className="text-xl font-black">@{auth.userData?.username || "muradifs"}</p>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t("profile")}</span>
              </Card>
              <Card className="p-6">
                <TrendingUp className="w-4 h-4 text-emerald-600 mb-3" />
                <p className="text-xl font-black">{auth.userData?.credits_balance || 0} π</p>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Balance</span>
              </Card>
            </div>

            {/* Prijedlozi Section */}
            <section>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-black tracking-tight">{t("activeProposals")}</h2>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{t("all")}</button>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, title: t("regions"), votes: 1420, status: "Active" },
                  { id: 2, title: "Pi Merchant BiH", votes: 890, status: "Voting" }
                ].map(p => (
                  <Card key={p.id} onClick={() => setSelectedProposal(p)} className="p-5 border-l-4 border-l-indigo-600 flex justify-between items-center group">
                    <div className="flex-1">
                      <h3 className="font-black text-sm group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{p.votes} {t("votes")}</p>
                    </div>
                    <Button variant="outline" className="text-[10px] h-8 px-4">{t("vote")}</Button>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Forum Placeholder */}
        {activeTab === 'forum' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
             <div className="p-10 text-center opacity-40">
                <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                <p className="font-black uppercase text-xs">{t("discussions")} - Coming Soon</p>
             </div>
          </div>
        )}
      </main>

      {/* Navigacija */}
      <nav className="fixed bottom-6 left-6 right-6 max-w-lg mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] px-8 py-4 flex items-center justify-between z-50 shadow-2xl">
        <NavButton active={activeTab === 'home'} icon={Users} label={t("home")} onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'forum'} icon={MessageSquare} label={t("forum")} onClick={() => setActiveTab('forum')} />
        
        <div className="relative -mt-16 group">
          <button className="bg-indigo-600 p-5 rounded-full text-white shadow-xl shadow-indigo-500/40 group-hover:scale-110 group-hover:rotate-90 active:scale-95 transition-all">
            <Plus className="w-7 h-7" />
          </button>
        </div>

        <NavButton active={activeTab === 'proposals'} icon={Vote} label={t("proposals")} onClick={() => setActiveTab('proposals')} />
        <NavButton active={activeTab === 'events'} icon={Calendar} label={t("events")} onClick={() => setActiveTab('events')} />
      </nav>

      {/* Meni (Sidebar) */}
      <div className={`fixed inset-0 z-[110] transition-all duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`relative w-80 h-full bg-white dark:bg-slate-900 p-8 flex flex-col transition-transform duration-500 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg">
                {auth.userData?.username?.[0] || "M"}
              </div>
              <div>
                <h2 className="font-black text-lg tracking-tight">@{auth.userData?.username || "muradifs"}</h2>
                <p className="text-[10px] text-indigo-500 font-black tracking-widest uppercase">Ver: 1.0.5</p>
              </div>
          </div>
          <div className="space-y-1 flex-1">
             <MenuLink icon={Users} label={t("profile")} />
             <MenuLink icon={Globe} label={t("regionalSettings")} />
             <MenuLink icon={TrendingUp} label={t("transparency")} />
          </div>
          <Button variant="outline" className="mt-auto py-4 rounded-2xl w-full" onClick={() => setMenuOpen(false)}>{t("closeMenu")}</Button>
        </div>
      </div>

    </div>
  );
}

// --- Navigacijske Pomoći ---
const NavButton = ({ active, icon: Icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
    <Icon className={`w-6 h-6 ${active ? 'fill-indigo-600/10' : ''}`} />
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const MenuLink = ({ icon: Icon, label }) => (
  <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-200 group text-left">
    <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all" />
    <span className="text-sm font-black tracking-tight">{label}</span>
    <ChevronRight className="w-4 h-4 ml-auto text-slate-300" />
  </button>
);