// sqlQueries.js
import { sql } from '@vercel/postgres';

// 특정 카테고리에 대한 질문 리스트
export async function getFilteredSurveyOptionsQuery(category: string) {
  return await sql`
    WITH filtered_survey_options AS (
      SELECT 
        so.survey_text
      FROM 
        survey_options so 
      WHERE 
        so.survey_category LIKE '%' || ${category} || '%'
    ), filtered_questions AS (
      SELECT
        q.id AS question_id,
        q.title,
        q.category,
        q.createdat,
        q.icon,
        q.answerid,
        q.answer_description
      FROM
        questions q
      JOIN 
        filtered_survey_options fso ON q.category LIKE '%' || fso.survey_text || '%'
    )
    SELECT 
      fq.question_id,
      fq.title,
      fq.category,
      fq.createdat,
      fq.icon,
      fq.answerid,
      fq.answer_description,
      json_agg(json_build_object('id', o.id, 'text', o.text)) AS options
    FROM 
      filtered_questions fq
    JOIN 
      questionoptions o ON fq.question_id = o.questionid
    GROUP BY 
      fq.question_id, fq.title, fq.category, fq.createdat, fq.icon, fq.answerid, fq.answer_description
    ORDER BY 
      RANDOM()
    LIMIT 5;
  `;
}

// 유저가 선호하는 스킬이라고 선택한 카테고리에 속하는 질문 리스트
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
    u.fb_uid = ${fb_uid}
)
SELECT
  ud.uid,
  ud.fb_uid,
  ud.name,
  ud.email,
  ud.job_description,
  ud.continuous_goal_achievement,
  ud.set_goal,
  ud.liked_technology,
  ud.careeryearnumber,
  ud.mbti,
  skill,
  q.id AS question_id,
  q.title,
  q.category,
  q.createdat,
  q.icon,
  q.answerid,
  q.answer_description,
  json_agg(json_build_object('id', o.id, 'text', o.text)) AS options
FROM
  user_data ud,
  LATERAL unnest(ud.liked_skills) AS skill
JOIN
  questions q ON q.category LIKE '%' || skill || '%'
JOIN 
  questionoptions o ON q.id = o.questionid
GROUP BY
  ud.uid, ud.fb_uid, ud.name, ud.email, ud.job_description, ud.continuous_goal_achievement, ud.set_goal, ud.liked_technology, ud.careeryearnumber, ud.mbti, skill, q.id, q.title, q.category, q.createdat, q.icon, q.answerid, q.answer_description
ORDER BY 
  q.createdat DESC
LIMIT 5;
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

// getQuestionsWithOptionsByQuestionType
export async function getQuestionsWithOptionsByQuestionTypeQuery(
  question_type: string,
) {
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
    WHERE 
      q.question_type = ${question_type}
    GROUP BY 
      q.id, q.title, q.category, q.createdat, q.icon, q.answerid, q.answer_description
    ORDER BY 
      RANDOM()
    LIMIT 5;
  `;
}

// getQuestionsWithOptionsByCategoryQuery
export async function getQuestionsWithOptionsByCategoryQuery(category: string) {
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
    WHERE 
      q.category = ${category}
    GROUP BY 
      q.id, q.title, q.category, q.createdat, q.icon, q.answerid, q.answer_description
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
