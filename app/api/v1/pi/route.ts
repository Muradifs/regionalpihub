import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Spajanje na MongoDB
    const { pi_auth_token } = await req.json();

    // Ovdje bi inače išla verifikacija tokena preko Pi Network API-ja
    // Za sada simuliramo dohvat korisnika iz tvoje baze
    let user = await User.findOne({ username: "Korisnik" }); 

    if (!user) {
      user = await User.create({
        username: "Novi Korisnik",
        pi_id: "neki-id",
        credits_balance: 10
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}