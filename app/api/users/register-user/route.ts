import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    // console.log(req);
    const fb_uid = req.user.uid;
    const email = req.user.email;
    const name = req.user.displayName;

    const job_id = req.answerList[0].answerId;
    const continuous_goal_achievement = false;
    const set_goal = 5;
    const id = 'user_id';
    const likedtechoption = req.answerList[4].answerId;
    const careeryearnumber = req.answerList[2].answerText;
    const mbti = req.answerList[3].answerText;

    const result = await sql`
      INSERT INTO users (
        name, 
        password, 
        email, 
        job_id, 
        continuous_goal_achievement, 
        set_goal, 
        id, 
        fb_uid, 
        likedtechoption, 
        careeryearnumber, 
        mbti
      )
      VALUES 
      (
        ${name},
        'password', 
        ${email},
        ${job_id},
        ${continuous_goal_achievement},
        ${set_goal},
        ${id},
        ${fb_uid}, 
        ${likedtechoption},
        ${careeryearnumber},
        ${mbti}
      )
      ON CONFLICT (fb_uid) 
      DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        job_id = EXCLUDED.job_id,
        continuous_goal_achievement = EXCLUDED.continuous_goal_achievement,
        set_goal = EXCLUDED.set_goal,
        id = EXCLUDED.id,
        likedtechoption = EXCLUDED.likedtechoption,
        careeryearnumber = EXCLUDED.careeryearnumber,
        mbti = EXCLUDED.mbti
      RETURNING uid;
    `;

    const userId = result.rows[0].uid;
    // 선호하는 기술스택
    const surveyId = 'fea84e08-83ad-42b7-bc42-83258ac7b38a';
    const answerId = req.answerList[1].answerId;

    const result2 = await sql`
      INSERT INTO user_survey_responses (surveyId, userId, createdAt, answer)
      VALUES
        (${surveyId}, ${userId}, extract(epoch from now()), ${answerId});
    `;

    return NextResponse.json({ result, result2 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
