// sqlQueries.js
import { sql } from '@vercel/postgres';

// filtered_survey_options
export async function getFilteredSurveyOptionsQuery(category: string) {
  return await sql`
WITH filtered_survey_options AS (
  SELECT 
    so.survey_text
  FROM 
    survey_options so 
  WHERE 
    so.survey_category LIKE '%' || ${category} || '%'
)
SELECT
  q.*
FROM
  questions q
JOIN 
  filtered_survey_options fso ON q.category LIKE '%' || fso.survey_text || '%';
  `;
}

export async function getUserLikeSkillsQuery(fb_uid: string) {
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
),
user_data AS (
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
    fb_uid = ${fb_uid}
    )
SELECT
  ud.*,
  q.*
FROM
  user_data ud
  CROSS JOIN LATERAL unnest(ud.liked_skills) AS skill
  INNER JOIN questions q ON q.category LIKE '%' || skill || '%';
    `;
}

export async function getAfterRegisterQuestionsQuery() {
  return await sql`
      SELECT 
          s.id AS survey_id,
          s.title,
          s.category,
          s.createdat,
          s.icon,
          cq.display_order,
          multiflag,
          json_agg(
            json_build_object(
              'id', so.id, 
              'category', so.survey_category, 
              'text', so.survey_text
            )
          ) 
          AS options
      FROM 
          surveys s
      JOIN 
          survey_options so ON s.id = so.survey_id
      JOIN
          conditional_questions cq ON s.id = cq.surveyid
      WHERE
          cq.condition_type = 'AfterRegistration'
      GROUP BY 
          s.id, s.title, s.category, s.createdat, s.icon, cq.display_order
      ORDER BY 
          cq.display_order;  
  `;
}

// getQuestionsWithOptions
export async function getQuestionsWithOptionsQuery() {
  return await sql`
      SELECT 
          q.id AS question_id,
          q.title,
          q.category,
          q.createdat,
          q.icon,
          q.answerid,
          q.answer_description,
          json_agg(json_build_object('id', o.id, 'text', o.text)) AS options
      FROM 
          questions q
      JOIN 
          questionoptions o ON q.id = o.questionid
      GROUP BY 
          q.id, q.title, q.category, q.createdat, q.icon, q.answerid
      ORDER BY 
          RANDOM()
      LIMIT 5;
  `;
}

// getCategoryList
export async function getCategoryListQuery() {
  return await sql`
      select distinct Category 
      from Questions
      order by Category;
  `;
}