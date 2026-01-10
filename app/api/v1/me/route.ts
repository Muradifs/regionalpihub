import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    uid: "test-user-uid",
    username: "TestPioneer",
    roles: ["user"],
    balance: 0
  }, { status: 200 });
}