import { sql } from '@vercel/postgres';
import { getFilteredSurveyOptionsQuery } from '@/app/lib/queries/question';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const req = (await request.json()) as { position: string };
    const result = await getFilteredSurveyOptionsQuery(req.position);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
