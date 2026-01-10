import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    uid: "test-user-uid",
    id: "test-user-uid",
    username: "TestPioneer",
    roles: ["user"],
    balance: 0,
    // Dodajemo i ovo jer neke Pi aplikacije to traže
    isVerified: true,
    kycStatus: "verified" 
  }, { status: 200 });
}