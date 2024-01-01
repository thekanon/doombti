'use client';
import React, { useEffect, useState } from 'react';
import { IQuestionContainerProps, QuestionOption } from '@/app/lib/definitions';

import IconQuestion from '../questions/IconQuestion';
import ProgressBar from '../common/Atoms/ProgressBar';
import ConfirmDialog from '../common/Molecules/ConfirmDialog';
import ButtonComponent from '../common/Atoms/ButtonComponent';

import useUserStore from '@/app/lib/stores/authStore';
import useQuestionStore from '@/app/lib/stores/questionStore';
import { useRouter } from 'next/navigation';

import { registerUser } from '@/app/api/users';

const RegisterContainer = ({ questions }: IQuestionContainerProps) => {
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

  const { displayName, email, uid } = useUserStore();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();
  const [optionList, setOptionList] = useState<QuestionOption[]>([]);

  // question 초기화
  useEffect(() => {
    if (questions?.length === 0) {
      setQuestionList([]);
    } else {
      setQuestionList(questions);
    }
    setTotalQuestions(questions.length);
  }, []);

  useEffect(() => {
    let option = questions[questionIndex].options;
    if (questionIndex === 1) {
      const answer = answerList[0].text;
      if (option === undefined) return;
      option = option.filter(
        (item) => item?.category?.split('/')[1] === answer,
      );
    }

    setOptionList(option);
  }, [questionIndex]);

  const handleIconClick = (selectedIndex: number) => {
    const currentQuestion = questionList[questionIndex];
    const selectedAnswer = currentQuestion.options[selectedIndex];

    setAnswer({
      id: selectedAnswer.id,
      title: currentQuestion.title,
      text: selectedAnswer.text,
      isCorrect: false,
      answerId: selectedAnswer.id,
      answerText: selectedAnswer.text,
    });

    setSelectedQuestion(selectedIndex);
  };

  const handleSubmitClick = () => {
    console.log('handleSubmitClick');
    console.log(answerList);
    console.log(questionList);

    setIsConfirmOpen(true);
    handleSubmit();
  };

  const handleConfirm = async () => {
    // 삭제 로직 구현
    const userData = {
      displayName,
      email,
      uid,
    };
    const result = await registerUser(userData, answerList);
    console.log(result);
  };

  const handleCancel = () => {
    // 삭제 로직 구현
    const currentPercentage = 100 / totalQuestions;
    console.log(currentPercentage);
    console.log(totalQuestions);
    setPercentage(100 - currentPercentage);

    setIsConfirmOpen(false); // 대화상자 닫기
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
          questions={optionList}
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
            onClick={handleSubmitClick}
          />
        )}
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="회원가입 정보 제출"
        message={`위 정보를 사용하여 회원가입을 하시겠어요?\n제출 후에도 언제든지 수정이 가능해요.`}
        confirmText="제출할게요"
        cancelText="설문 계속하기"
      />
    </div>
  );
};
export default RegisterContainer;
