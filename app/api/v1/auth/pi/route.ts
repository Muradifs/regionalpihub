import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Ovdje bi inače išla provjera sa Pi serverima.
  // Za sada samo simuliramo uspješnu prijavu.
  
  return NextResponse.json({
    token: "mock-token-za-ulaz",
    user: {
      uid: "test-user-uid",
      username: "TestPioneer",
      roles: ["user"]
    }
  }, { status: 200 });
}