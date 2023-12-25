import React from 'react';
import AnswerContainer from '@/app/ui/answer/AnswerContainer';

const SampleAnswerPage = async () => {
  // const queryResultRow = await getQuestionsWithOptions();
  // function isQuestion(obj: any): obj is Question {
  //   return 'question_id' in obj && 'title' in obj;
  // }

  return (
    <div>
      <AnswerContainer />
    </div>
  );
};

export default SampleAnswerPage;
