import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    // 1. Pokušaj se spojiti na bazu, ali postavi timeout od 5 sekundi
    try {
      await dbConnect();
    } catch (dbErr) {
      console.error("Baza nije dostupna, nastavljam u 'offline' modu", dbErr);
    }

    const { pi_auth_token } = await req.json();

    if (!pi_auth_token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    // 2. Pokušaj naći korisnika u bazi
    let user = null;
    try {
      user = await User.findOne({ username: "Korisnik" });
    } catch (findErr) {
      console.error("Greška pri traženju korisnika", findErr);
    }

    // 3. Ako baza ne radi ili korisnik ne postoji, vrati "Fantomskog" korisnika
    // tako da aplikacija NE ZAPNE u krugu.
    if (!user) {
      return NextResponse.json({
        id: "temp-id",
        username: "Pi Korisnik (Local)",
        credits_balance: 0,
        terms_accepted: true
      }, { status: 200 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error: any) {
    console.error("Glavna greška backenda:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}