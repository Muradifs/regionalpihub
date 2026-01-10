import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Frontend nam šalje { pi_auth_token: "..." }
  // Mi ćemo to ignorirati i samo vratiti potvrdu da je korisnik logiran.

  // VRAĆAMO TOČNO ONO ŠTO "LoginDTO" TRAŽI:
  return NextResponse.json({
    id: "test-user-uid-123",
    username: "TestPioneer",
    credits_balance: 100,    // Ovo je falilo!
    terms_accepted: true,    // I ovo je falilo!
    
    // Dodat ćemo i ovo za svaki slučaj, da budemo sigurni
    accessToken: "mock-access-token", 
  }, { status: 200 });
}