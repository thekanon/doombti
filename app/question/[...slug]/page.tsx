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
  if (!auth) return <div>{auth}</div>; // 인증 실패 시 메시지 표시

  const { fb_uid } = auth as User;
  const paramsArr = params.slug.map(decodeURIComponent);

  // API 결정 로직을 분리하여 각 경우에 맞는 함수 호출
  const fetchQuestions = async (paramsArr: string[]): Promise<Question[]> => {
    const [mainCategory, subCategory, detail] = paramsArr;

    switch (mainCategory) {
      case 'study':
        if (subCategory === 'job') {
          return getFilteredSurveyOptions(detail);
        }
        if (subCategory === 'random')
          return getQuestionsWithOptionsByQuestionType('study');
        break;
      case 'personal':
        if (subCategory === 'likedSkil') return getUserLikeSkills(fb_uid);
        break;
      case 'funny':
        if (subCategory === 'random')
          return getQuestionsWithOptionsByQuestionType('funny');
        if (subCategory === 'category')
          return getQuestionsWithOptionsByCategory(detail);
        break;
      default:
        return [];
    }

    return [];
  };

  const questions = (await fetchQuestions(paramsArr)).filter(
    (obj): obj is Question => 'question_id' in obj && 'title' in obj,
  );

  // 결과가 비어있을 경우 에러 페이지 대신 안내 메시지 표시
  if (!questions.length) {
    return <div>No questions found</div>;
  }

  return (
    <div>
      <QuestionContainer questions={questions} />
    </div>
  );
};

export default QuestionPage;
