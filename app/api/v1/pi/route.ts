import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { PI_NETWORK_CONFIG } from '@/lib/system-config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pi_auth_token } = body;

    if (!pi_auth_token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // 1. Validacija tokena sa pravim Pi Serverima
    const meUrl = 'https://api.minepi.com/v2/me';
    
    const piRes = await fetch(meUrl, {
      headers: {
        'Authorization': `Bearer ${pi_auth_token}`
      }
    });

    if (!piRes.ok) {
      return NextResponse.json({ error: 'Invalid Pi Token' }, { status: 401 });
    }

    // Dobili smo prave podatke od Pi Networka!
    const piUser = await piRes.json();
    
    // 2. Spoji se na našu bazu
    await dbConnect();

    // 3. Pronađi korisnika ili ga kreiraj ako je novi (Upsert)
    const user = await User.findOneAndUpdate(
      { uid: piUser.uid }, // Tražimo po UID-u
      {
        $set: {
          username: piUser.username,
          lastLogin: new Date()
        },
        $setOnInsert: {
          // Ovi podaci se postavljaju samo ako je korisnik NOVI
          balance: 100, // Dajemo 100 bodova dobrodošlice
          roles: ['user'],
          terms_accepted: false,
          createdAt: new Date()
        }
      },
      { new: true, upsert: true } // Vrati novog korisnika i kreiraj ga ako ne postoji
    );

    // 4. Vrati podatke frontendu (u formatu koji on očekuje)
    return NextResponse.json({
      accessToken: pi_auth_token, // Vraćamo isti token za sesiju
      user: {
        uid: user.uid,
        username: user.username,
        roles: user.roles
      },
      // Ovo su podaci bitni za LoginDTO na frontendu
      id: user.uid,
      username: user.username,
      credits_balance: user.balance,
      terms_accepted: user.terms_accepted
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}