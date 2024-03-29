// sqlQueries.js
import { sql } from '@vercel/postgres';

// getUser
export async function getUserQuery(id: string) {
  return await sql`SELECT * FROM users WHERE uid=${id}`;
}

export async function getUserInfoQuery(id: string) {
  return await sql`
      WITH survey_responses AS (
      SELECT 
        usr.userid, 
        array_agg(so.survey_text) AS response_texts
      FROM 
        user_survey_responses usr
        JOIN survey_options so ON usr.answer = so.id
      WHERE 
        usr.surveyid = 'fea84e08-83ad-42b7-bc42-83258ac7b38a'
      GROUP BY 
        usr.userid
    )
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
      u.mbti,
      sr.response_texts AS liked_skills
    FROM 
      users u
      INNER JOIN survey_options job_option ON u.job_id = job_option.id
      INNER JOIN survey_options tech_option ON u.likedtechoption = tech_option.id
      LEFT JOIN survey_responses sr ON u.uid = sr.userid
    WHERE 
      fb_uid = ${id};
  `;
}
