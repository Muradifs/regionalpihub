"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LocationAnalytics } from "@/components/location-analytics"
import {
  Users,
  MessageSquare,
  Vote,
  TrendingUp,
  Calendar,
  Globe,
  ChevronRight,
  Plus,
  Search,
  Bell,
  Menu,
} from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "forum" | "proposals" | "members">("home")

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-lg font-bold text-foreground">Regional Pi Hub</h1>
          </div>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Bell className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <section className="mb-6">
          <LocationAnalytics />
        </section>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Članovi</span>
            </div>
            <p className="text-2xl font-bold text-foreground">2,847</p>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Diskusije</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1,234</p>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Vote className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Prijedlozi</span>
            </div>
            <p className="text-2xl font-bold text-foreground">156</p>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Aktivni</span>
            </div>
            <p className="text-2xl font-bold text-foreground">487</p>
          </Card>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Aktivni Prijedlozi</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Svi <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { title: "Proširenje na Crnu Goru", votes: 234, status: "active", region: "Balkana" },
              { title: "Novi forum za programere", votes: 187, status: "voting", region: "Tehnologija" },
              { title: "Mjesečni meetup u Sarajevu", votes: 156, status: "active", region: "Događaji" },
            ].map((proposal, i) => (
              <Card key={i} className="p-4 bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground">{proposal.region}</p>
                  </div>
                  <Badge variant={proposal.status === "active" ? "default" : "secondary"} className="ml-2">
                    {proposal.status === "active" ? "Aktivno" : "Glasovanje"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Vote className="w-4 h-4" />
                    <span>{proposal.votes} glasova</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Glasaj
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Forumi</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Svi <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { title: "Najbolje prakse za blockchain", author: "Marko", replies: 23, time: "2h" },
              { title: "Kako privući nove članove?", author: "Ana", replies: 15, time: "4h" },
              { title: "GDPR i decentralizacija", author: "Nikola", replies: 31, time: "6h" },
            ].map((discussion, i) => (
              <Card key={i} className="p-4 bg-card">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {discussion.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 leading-snug">{discussion.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} odgovora</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Nadolazeći Događaji</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Kalendar <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { title: "Blockchain Workshop", date: "15 Feb", location: "Beograd", attendees: 45 },
              { title: "Community Meetup", date: "22 Feb", location: "Zagreb", attendees: 67 },
            ].map((event, i) => (
              <Card key={i} className="p-4 bg-card">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                    <span className="text-xs font-semibold">{event.date.split(" ")[0]}</span>
                    <span className="text-[10px]">{event.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Prijavi se
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Regije</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              "Slovenija",
              "Hrvatska",
              "BiH",
              "Srbija",
              "Crna Gora",
              "Makedonija",
              "Albanija",
              "Kosovo",
              "Bugarska",
              "Rumunija",
              "Grčka",
              "Mađarska",
              "Austrija",
              "Italija",
            ].map((region, i) => (
              <Card key={i} className="p-3 text-center bg-card">
                <Globe className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium text-foreground">{region}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around px-4 py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Početna</span>
          </button>
          <button
            onClick={() => setActiveTab("forum")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "forum" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Forum</span>
          </button>
          <button className="flex flex-col items-center gap-1 -mt-6">
            <div className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
              <Plus className="w-6 h-6" />
            </div>
          </button>
          <button
            onClick={() => setActiveTab("proposals")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "proposals" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Vote className="w-5 h-5" />
            <span className="text-xs font-medium">Prijedlozi</span>
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "members" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-medium">Eventi</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
