import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pi_auth_token } = body;

    if (!pi_auth_token) {
      return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }

    // PRIVREMENI POPRAVAK: 
    // Umjesto da čekamo bazu koja možda šteka, vratit ćemo uspjeh 
    // da vidimo hoće li tvoja aplikacija "prodisati".
    
    return NextResponse.json({
      id: "test-id",
      username: "Pi Korisnik",
      credits_balance: 100,
      terms_accepted: true
    }, { status: 200 });

  } catch (error: any) {
    console.error("Backend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}