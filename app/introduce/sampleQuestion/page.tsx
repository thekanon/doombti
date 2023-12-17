import React from 'react';

import ProgressBar from '@/app/ui/common/Atoms/ProgressBar';
import IconQuestion from '@/app/ui/questions/IconQuestion';
import ButtonComponent from '@/app/ui/common/Atoms/ButtonComponent';

import QuestionContainer from '@/app/ui/questions/QuestionContainer';

import { getQuestionsWithOptions } from '@/app/lib/data';

const SampleQuestionPage = async ({ question = 0 }: { question: number }) => {
  const questions = await getQuestionsWithOptions();

  return (
    <div>
      <QuestionContainer questions={questions} />
    </div>
  );
};

export default SampleQuestionPage;
