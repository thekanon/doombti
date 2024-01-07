import React from 'react';
import { fetchAfterRegisterQuestions } from '@/app/lib/data';
import RegisterContainer from '@/app/ui/containers/RegisterContainer';
import { Question } from '@/app/lib/definitions';

const SetRegisterPage = async () => {
  // question 가져오기
  const questionRow = await fetchAfterRegisterQuestions();
  function isQuestion(obj: any): obj is Question {
    return 'survey_id' in obj && 'title' in obj;
  }
  const questions = questionRow.filter(isQuestion);

  return (
    <div>
      <RegisterContainer questions={questions} />
    </div>
  );
};

export default SetRegisterPage;
