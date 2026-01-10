"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = {
  code: string
  name: string
  nativeName: string
}

export const languages: Language[] = [
  { code: "sr", name: "Serbian", nativeName: "Српски" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski" },
  { code: "bs", name: "Bosnian", nativeName: "Bosanski" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina" },
  { code: "mk", name: "Macedonian", nativeName: "Македонски" },
  { code: "sq", name: "Albanian", nativeName: "Shqip" },
  { code: "bg", name: "Bulgarian", nativeName: "Български" },
  { code: "ro", name: "Romanian", nativeName: "Română" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "en", name: "English", nativeName: "English" },
]

type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  sr: {
    home: "Početna",
    forum: "Forum",
    proposals: "Prijedlozi",
    events: "Eventi",
    members: "Članovi",
    discussions: "Diskusije",
    active: "Aktivni",
    activeProposals: "Aktivni Prijedlozi",
    forums: "Forumi",
    upcomingEvents: "Nadolazeći Događaji",
    regions: "Regije",
    all: "Svi",
    vote: "Glasaj",
    votes: "glasova",
    replies: "odgovora",
    register: "Prijavi se",
    calendar: "Kalendar",
    search: "Pretraga",
    notifications: "Obavještenja",
    privacy: "Privatnost",
    terms: "Uslovi",
    about: "O nama",
    transparency: "Transparentnost",
    settings: "Podešavanja",
    language: "Jezik",
  },
  en: {
    home: "Home",
    forum: "Forum",
    proposals: "Proposals",
    events: "Events",
    members: "Members",
    discussions: "Discussions",
    active: "Active",
    activeProposals: "Active Proposals",
    forums: "Forums",
    upcomingEvents: "Upcoming Events",
    regions: "Regions",
    all: "All",
    vote: "Vote",
    votes: "votes",
    replies: "replies",
    register: "Register",
    calendar: "Calendar",
    search: "Search",
    notifications: "Notifications",
    privacy: "Privacy",
    terms: "Terms",
    about: "About Us",
    transparency: "Transparency",
    settings: "Settings",
    language: "Language",
  },
  hr: {
    home: "Početna",
    forum: "Forum",
    proposals: "Prijedlozi",
    events: "Događaji",
    members: "Članovi",
    discussions: "Diskusije",
    active: "Aktivni",
    activeProposals: "Aktivni Prijedlozi",
    forums: "Forumi",
    upcomingEvents: "Nadolazeći Događaji",
    regions: "Regije",
    all: "Svi",
    vote: "Glasuj",
    votes: "glasova",
    replies: "odgovora",
    register: "Prijavi se",
    calendar: "Kalendar",
    search: "Pretraživanje",
    notifications: "Obavijesti",
    privacy: "Privatnost",
    terms: "Uvjeti",
    about: "O nama",
    transparency: "Transparentnost",
    settings: "Postavke",
    language: "Jezik",
  },
}

type LanguageContextType = {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  languages: Language[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const saved = localStorage.getItem("bph-language")
    if (saved && languages.find((l) => l.code === saved)) {
      setCurrentLanguage(saved)
    }
  }, [])

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    localStorage.setItem("bph-language", lang)
  }

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations["en"][key] || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
