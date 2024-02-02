import { sql } from '@vercel/postgres';
import { getUserLikeSkillsQuery } from '@/app/lib/queries/question';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const req = (await request.json()) as { fb_uid: string };
    const result = await getUserLikeSkillsQuery(req.fb_uid);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
