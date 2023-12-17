import React from 'react';
import { Question } from '@/app/lib/definitions';

import QuestionContainer from '@/app/ui/questions/QuestionContainer';

import { getQuestionsWithOptions } from '@/app/lib/data';

const SampleQuestionPage = async () => {
  // const questions = (await getQuestionsWithOptions()) as Question[];
  const queryResultRow = await getQuestionsWithOptions();
  function isQuestion(obj: any): obj is Question {
    return 'question_id' in obj && 'title' in obj;
  }

  const questions = queryResultRow.filter(isQuestion);

  return (
    <div>
      <QuestionContainer questions={questions} />
    </div>
  );
};

export default SampleQuestionPage;
