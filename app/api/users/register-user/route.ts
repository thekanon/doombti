import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    // console.log(req);
    const fb_uid = req.user.fb_uid;
    const email = req.user.email;
    const name = req.user.displayName;

    // survey_id가 'd4594115-c385-4eab-8de0-584cd06c5654'인 것이 job_id
    const job_id = req.answerList.find(
      (answer: any) =>
        answer.survey_id === 'd4594115-c385-4eab-8de0-584cd06c5654',
    ).answerId;
    const continuous_goal_achievement = false;
    const set_goal = 5;
    const id = 'user_id';
    // survey_id가 'cfc5d2e3-92a1-4feb-acaa-26413fe05f69'인 것이 likedtechoption
    const likedtechoption = req.answerList.find(
      (answer: any) =>
        answer.survey_id === 'cfc5d2e3-92a1-4feb-acaa-26413fe05f69',
    ).answerId;
    // survey_id가 '39ff1b35-8920-4a05-b6f1-6f9c7657be29'인 것이 careeryearnumber
    const careeryearnumber = req.answerList.find(
      (answer: any) =>
        answer.survey_id === '39ff1b35-8920-4a05-b6f1-6f9c7657be29',
    ).answerText;
    // survey_id가 '41ac8852-7da9-448c-bdce-2a9d205fb4d1'인 것이 mbti
    const mbti = req.answerList.find(
      (answer: any) =>
        answer.survey_id === '41ac8852-7da9-448c-bdce-2a9d205fb4d1',
    ).answerText;

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
    // const surveyId = 'fea84e08-83ad-42b7-bc42-83258ac7b38a';
    // const answerId = req.answerList[1].answerId;

    const result2: any = [];
    req.answerList.map(async (answer: any) => {
      const surveyId = answer.survey_id;
      const answerId = answer.answerId;
      const res = await sql`
        INSERT INTO user_survey_responses (surveyId, userId, createdAt, answer)
        VALUES
          (${surveyId}, ${userId}, extract(epoch from now()), ${answerId});
      `;
      console.log('😈😈😈');
      console.log(`INSERT INTO user_survey_responses (surveyId, userId, createdAt, answer)
        VALUES
          (${surveyId}, ${userId}, extract(epoch from now()), ${answerId});`);
      console.log('😈😈😈');
      result2.push(res);
    });

    // const result2 = await sql`
    //   INSERT INTO user_survey_responses (surveyId, userId, createdAt, answer)
    //   VALUES
    //     (${surveyId}, ${userId}, extract(epoch from now()), ${answerId});
    // `;

    return NextResponse.json({ result, result2 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
