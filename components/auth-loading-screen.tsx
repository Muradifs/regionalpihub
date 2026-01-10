"use client"

import { usePiAuth } from "@/contexts/pi-auth-context"
import { Loader2, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthLoadingScreen() {
  const { authMessage, reinitialize } = usePiAuth()
  const isError = authMessage.toLowerCase().includes("failed")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-md w-full px-6 text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-lg">
              π
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Balkan Pi Hub</h1>
            <p className="text-sm text-muted-foreground">Zajednica za razmjenu iskustva i saradnju</p>
          </div>
        </div>

        {!isError && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">{authMessage}</p>
              <p className="text-xs text-muted-foreground">Molimo sačekajte dok se povežemo sa Pi Network...</p>
            </div>
          </div>
        )}

        {isError && (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-destructive">{authMessage}</p>
              <p className="text-xs text-muted-foreground">Provjerite da li koristite Pi Browser aplikaciju</p>
            </div>
            <Button onClick={reinitialize} size="lg" className="w-full gap-2">
              <LogIn className="w-5 h-5" />
              Pokušaj ponovo
            </Button>
          </div>
        )}

        <div className="pt-8 border-t border-border">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground">Potreban je Pi Browser</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ova aplikacija zahtijeva Pi Browser za autentifikaciju. Otvorite aplikaciju u Pi Browser-u da biste
              nastavili.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
