'use client';
import React, { useState } from 'react';
import { IQuestionContainerProps } from '@/app/lib/definitions';

import IconQuestion from './IconQuestion';
import ProgressBar from '../common/Atoms/ProgressBar';
import ButtonComponent from '../common/Atoms/ButtonComponent';

const QuestionContainer = ({ questions }: IQuestionContainerProps) => {
  const [percentage, setPercentage] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = questions.length;

  const handleNext = () => {
    setPercentage(((questionIndex + 1) / totalQuestions) * 100);
    setQuestionIndex(questionIndex + 1);
  };
  const handleBack = () => {
    setPercentage(
      ((questionIndex - 1 > 0 ? questionIndex - 1 : 0) / totalQuestions) * 100,
    );

    setQuestionIndex(questionIndex - 1);
  };
  const handleSubmit = () => {
    setPercentage(100);
    console.log('submit');
  };

  return (
    <div className="pb-[10vh]">
      <div className="p-4">
        <ProgressBar percentage={percentage} color="#6949ff" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <IconQuestion
          title={questions[questionIndex].title}
          description={questions[questionIndex].category}
          questions={questions[questionIndex].options}
        />
      </div>
      {/* fixed footer */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-white"
        style={{ height: '10vh' }}
      >
        {questionIndex > 0 && (
          <ButtonComponent
            customStyle="w-full p-3"
            colorType="secondary"
            text="Back"
            onClick={handleBack}
          />
        )}

        {questionIndex < totalQuestions - 1 ? (
          <ButtonComponent
            customStyle="w-full p-3"
            colorType="secondary"
            text="Next"
            onClick={handleNext}
          />
        ) : (
          <ButtonComponent
            customStyle="w-full p-3"
            colorType="secondary"
            text="Submit"
            onClick={handleSubmit} // 가정: 'handleNext' 대신 'handleSubmit' 함수 사용
          />
        )}
      </div>
    </div>
  );
};
export default QuestionContainer;
