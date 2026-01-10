import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const mockToken = "mock-access-token-12345";
  
  // Vraćamo sve moguće varijante imena, jedna će sigurno upaliti!
  return NextResponse.json({
    // Ako frontend traži 'token':
    token: mockToken,
    // Ako frontend traži 'accessToken':
    accessToken: mockToken,
    // Ako frontend traži 'access_token':
    access_token: mockToken,
    
    user: {
      uid: "test-user-uid",
      id: "test-user-uid", // Dodali smo i 'id' za svaki slučaj
      username: "TestPioneer",
      roles: ["user"]
    }
  }, { status: 200 });
}