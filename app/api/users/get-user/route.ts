import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const result = await sql`
    SELECT 
        u.uid,
        u.fb_uid,
        u.name,
        u.email,
        job_option.survey_text AS job_description,
        u.continuous_goal_achievement,
        u.set_goal,
        tech_option.survey_text AS liked_technology,
        u.careeryearnumber,
        u.mbti
    FROM 
        users u
    LEFT JOIN survey_options job_option ON u.job_id = job_option.id
    LEFT JOIN survey_options tech_option ON u.likedtechoption = tech_option.id
    where fb_uid = ${req.fb_uid};
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
