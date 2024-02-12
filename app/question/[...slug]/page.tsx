import React from 'react';
import {
  getUserLikeSkills,
  getFilteredSurveyOptions,
  getQuestionsWithOptionsByQuestionType,
  getQuestionsWithOptionsByCategory,
} from '@/app/lib/data';
import QuestionContainer from '@/app/ui/containers/QuestionContainer';
import { loadAuth } from '@/app/lib/actions';
import { User, Question } from '@/app/lib/definitions';

interface IQuestionParams {
  slug: string[];
}

const QuestionPage = async ({ params }: { params: IQuestionParams }) => {
  const auth = await loadAuth();
  if (!auth) return;
  const { fb_uid } = auth as User;

  const paramsArr = params.slug.map((slug) => decodeURIComponent(slug));
  // 쿼리 파라미터로 넘어온 값들의 성격에 따라 다른 API를 호출하도록 분기처리
  const setApi = (paramsArr: string[]) => {
    if (paramsArr[0] === 'study') {
      if (paramsArr[1] === 'job') {
        console.log('study/job');
        return getFilteredSurveyOptions(paramsArr[2]);
      } else if (paramsArr[1] === 'random') {
        console.log('study/random');
        return getQuestionsWithOptionsByQuestionType('study');
      }
    } else if (paramsArr[0] === 'personal') {
      if (paramsArr[1] === 'likedSkil') {
        console.log('personal/likedSkil');
        return getUserLikeSkills(fb_uid);
      }
    } else if (paramsArr[0] === 'funny') {
      if (paramsArr[1] === 'random') {
        console.log('funny/random');
        return getQuestionsWithOptionsByQuestionType('funny');
      } else if (paramsArr[1] === 'category') {
        console.log('funny/category');
        return getQuestionsWithOptionsByCategory(paramsArr[2]);
      }
    }

    return [];
  };
  const res = await setApi(paramsArr);
  function isQuestion(obj: any): obj is Question {
    return 'question_id' in obj && 'title' in obj;
  }

  if (res.length === 0) {
    if
  }
  const questions = res.filter(isQuestion);

  return (
    <div>
      <QuestionContainer questions={questions} />
    </div>
  );
};

export default QuestionPage;
