import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getUserInfoQuery } from '@/app/lib/queries/user';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const result = await getUserInfoQuery(req.fb_uid);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
