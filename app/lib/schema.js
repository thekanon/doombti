import { z } from 'zod';

export const QuestionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const QuestionSchema = z.object({
  question_id: z.string(),
  title: z.string(),
  category: z.string(),
  createdat: z.string(), // ISO 날짜 형식 검사를 추가할 수 있음
  icon: z.string(),
  answerid: z.string(),
  answer_description: z.string().optional(),
  survey_id: z.string().optional(),
  options: z.array(QuestionOptionSchema),
  multiflag: z.boolean().default(false),
});

export const QuestionsSchema = z.array(QuestionSchema);

export const IConQuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(QuestionOptionSchema),
  onClick: z.function(z.tuple([z.number()]), z.void()),
  selectedQuestion: z.union([z.number(), z.null(), z.array(z.number())]),
});

export const UserSchema = z.object({
  uid: z.string().optional(),
  fb_uid: z.string(),
  name: z.string(),
  email: z.string().email(),
  job_description: z.string(),
  continuous_goal_achievement: z.boolean(),
  set_goal: z.number(),
  liked_technology: z.string(),
  careeryearnumber: z.string(),
  mbti: z.string(),
  liked_skills: z.array(z.string()),
});
