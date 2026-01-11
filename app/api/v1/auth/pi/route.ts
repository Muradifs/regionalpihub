import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Povezivanje na tvoj MongoDB
    const body = await req.json();
    const { pi_auth_token } = body;

    // Pronađi korisnika muradifs ili ga kreiraj ako ne postoji
    let user = await User.findOne({ username: "muradifs" });

    if (!user) {
      user = await User.create({
        username: "muradifs",
        pi_id: "muradif-unique-id-123",
        credits_balance: 100,
        terms_accepted: true
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Baza Greška:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}