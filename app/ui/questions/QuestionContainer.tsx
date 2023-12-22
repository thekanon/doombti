'use client';
import React, { useEffect, useState } from 'react';
import { IQuestionContainerProps } from '@/app/lib/definitions';

import IconQuestion from './IconQuestion';
import ProgressBar from '../common/Atoms/ProgressBar';
import ButtonComponent from '../common/Atoms/ButtonComponent';

import useQuestionStore from '@/app/lib/stores/questionStore';

const QuestionContainer = ({ questions }: IQuestionContainerProps) => {
  // question 관련 state
  const {
    percentage,
    questionIndex,
    totalQuestions,
    questionList,
    selectedQuestion,
    setQuestionList,
    setTotalQuestions,
    setSelectedQuestion,
    handleNext,
    handleBack,
    handleSubmit,
  } = useQuestionStore();

  // question 초기화
  useEffect(() => {
    if (questions?.length === 0) {
      setQuestionList([]);
    } else {
      setQuestionList(questions);
    }
    setTotalQuestions(questions.length);
    console.log(questions);
  }, []);

  const handleIconClick = (index: number) => {
    console.log('handleIconClick', index);
    console.log(questionIndex);
    console.log(questionList[questionIndex].options[index]);
    setSelectedQuestion(index);
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
          onClick={handleIconClick}
          selectedQuestion={selectedQuestion}
        />
      </div>
      {/* fixed footer */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-white p-4"
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
