'use client';
import React, { useEffect, useState } from 'react';
import { IQuestionContainerProps } from '@/app/lib/definitions';

import IconQuestion from '../questions/IconQuestion';
import ProgressBar from '../common/Atoms/ProgressBar';
import ConfirmDialog from '../common/Molecules/ConfirmDialog';
import ButtonComponent from '../common/Atoms/ButtonComponent';

import useQuestionStore from '@/app/lib/stores/questionStore';
import { useRouter } from 'next/navigation';

const QuestionContainer = ({ questions }: IQuestionContainerProps) => {
  // question 관련 state
  const {
    percentage,
    questionIndex,
    totalQuestions,
    questionList,
    selectedQuestion,
    answerList,
    setQuestionList,
    setTotalQuestions,
    setSelectedQuestion,
    setPercentage,
    setAnswer,
    handleNext,
    handleBack,
    handleSubmit,
  } = useQuestionStore();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  // question 초기화
  useEffect(() => {
    if (questions?.length === 0) {
      setQuestionList([]);
    } else if (questions && questions.length > 0 && !questionList.length) {
      setQuestionList(questions);
    }
    setTotalQuestions(questions.length);
  }, []);

  const handleIconClick = (selectedIndex: number) => {
    const currentQuestion = questionList[questionIndex];
    const selectedAnswer = currentQuestion.options[selectedIndex];

    if (!currentQuestion) {
      return;
    }

    const correctAnswer = currentQuestion.options.find(
      (option) => option.id === currentQuestion.answerid,
    );

    if (!correctAnswer) {
      return;
    }

    const isCorrect = currentQuestion.answerid === selectedAnswer.id;

    const newAnswer = {
      id: selectedAnswer.id,
      title: currentQuestion.title,
      text: selectedAnswer.text,
      survey_id: currentQuestion.survey_id,
      isCorrect: isCorrect,
      answerId: selectedAnswer.id,
      answerText: selectedAnswer.text,
      answerDescription: currentQuestion.answer_description,
    };

    setAnswer(newAnswer);

    setSelectedQuestion(selectedIndex);
  };

  const handleSubmitClick = () => {
    setIsConfirmOpen(true);
    handleSubmit();
  };

  const handleCancel = () => {
    // 삭제 로직 구현
    const currentPercentage = 100 / totalQuestions;
    setPercentage(100 - currentPercentage);

    setIsConfirmOpen(false); // 대화상자 닫기
  };

  return (
    <div className="pb-[10vh]">
      <div className="p-4">
        <ProgressBar percentage={percentage} color="#6949ff" />
      </div>
      {questionList.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <IconQuestion
            title={questionList[questionIndex].title}
            description={questionList[questionIndex].category}
            questions={questionList[questionIndex].options}
            onClick={handleIconClick}
            selectedQuestion={selectedQuestion}
          />
        </div>
      )}
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
            onClick={handleSubmitClick}
          />
        )}
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={() => router.push('./sampleQuestion/result')}
        onCancel={handleCancel}
        title="제출 확인"
        message={`문제를 다 푸셨나요?\n제출 시 결과를 확인할 수 있습니다.`}
        confirmText="제출할게요"
        cancelText="학습 계속하기"
      />
    </div>
  );
};
export default QuestionContainer;
