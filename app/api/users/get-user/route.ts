import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    console.log(req);
    const result = await sql`
      select
        u.name,
        u.email,
        job_option.survey_text AS job_description,
        u.continuous_goal_achievement,
        u.set_goal,
        tech_option.survey_text AS liked_technology,
        u.careeryearnumber,
        u.mbti
      from 
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
