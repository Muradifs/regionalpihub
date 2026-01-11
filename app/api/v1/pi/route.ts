import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { pi_auth_token } = await req.json();

    if (!pi_auth_token) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    // Ovdje u pravoj aplikaciji šaljemo upit Pi Network API-ju da potvrdi token.
    // Za sada, budući da si u Pi Browseru, tvoj frontend šalje token.
    // Simulirat ćemo vađenje username-a dok ne podesimo punu API verifikaciju:
    
    // Potraži korisnika, ako ne postoji - kreiraj ga sa tvojim podacima
    let user = await User.findOne({ pi_id: "muradif-unique-id" }); 

    if (!user) {
      user = await User.create({
        username: "muradifs", // TVOJE IME
        pi_id: "muradif-unique-id",
        credits_balance: 100 // Poklon dobrodošlice
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Database error:", error);
    // Vrati grešku umjesto (Local) da znamo što ne valja s bazom
    return NextResponse.json({ error: "Baza nije dostupna" }, { status: 500 });
  }
}