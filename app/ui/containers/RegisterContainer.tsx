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
    setAnswers,
    handleNext,
    handleBack,
    handleSubmit,
  } = useQuestionStore();

  const { displayName, email, uid, fb_uid, me } = useUserStore();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();
  const [optionList, setOptionList] = useState<QuestionOption[]>([]);

  useEffect(() => {
    /**
     * 1. fb_uid가 없으면 signin 페이지로 이동
     * 2. fb_uid가 있고 uid도 있으면 dashboard 페이지로 이동
     */
    // if (!fb_uid) {
    //   router.push('/signin');
    // }
    if (!!uid && !!fb_uid && uid !== '') {
      router.push('/dashboard');
    }
  }, [uid]);

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
    if (questions[questionIndex].multiflag === true) {
      let selectedQuestion = [];

      for (let i = 0; answerList.length > i; i++) {
        const answer = answerList[i];
        const index = option.findIndex((item) => item.id === answer.id);
        if (index !== -1) {
          selectedQuestion.push(index);
        }
      }
      setSelectedQuestion(selectedQuestion);
    }
    setOptionList(option);
  }, [questionIndex]);

  const handleIconClick = (selectedIndex: number) => {
    const currentQuestion = questionList[questionIndex];
    const selectedAnswer = optionList[selectedIndex];

    const newAnswer = {
      id: selectedAnswer.id,
      title: currentQuestion.title,
      text: selectedAnswer.text,
      survey_id: currentQuestion.survey_id,
      isCorrect: false,
      answerId: selectedAnswer.id,
      answerText: selectedAnswer.text,
    };

    // 이전 질문에 따라 필터링되는 질문이면 이전 질문 선택 시 질문 초기화
    if (questionList[questionIndex + 1]?.multiflag === true) {
      const newAnswerList = answerList.filter(
        (answer) => answer.title !== '선호하는 기술스택을 선택해주세요',
      );
      setAnswers([...newAnswerList]);

      setSelectedQuestion(selectedIndex);
    }

    if (currentQuestion['multiflag'] === true) {
      // 이미 선택된 답변인지 확인하고 선택된 답변이라면 제거
      const isAnswerAlreadyIncluded = answerList.some(
        (answer) => answer.id === newAnswer.id,
      );
      if (isAnswerAlreadyIncluded) {
        // 동일한 답변이 있다면, 해당 답변을 제거
        setAnswers(answerList.filter((answer) => answer.id !== newAnswer.id));
      } else {
        // 동일한 답변이 없다면, 새로운 답변을 answerList에 추가
        setAnswers([...answerList, newAnswer]);
      }

      if (selectedQuestion instanceof Array) {
        const isIndexSelected = selectedQuestion.includes(selectedIndex);
        if (isIndexSelected) {
          setSelectedQuestion(
            selectedQuestion.filter((index) => index !== selectedIndex),
          );
        } else {
          setSelectedQuestion([...selectedQuestion, selectedIndex]);
        }
      } else {
        setSelectedQuestion([selectedIndex]);
      }
    } else {
      setAnswer(newAnswer);
      setSelectedQuestion(selectedIndex);
    }

    console.log(answerList);
  };

  const handleSubmitClick = () => {
    setIsConfirmOpen(true);
    handleSubmit();
  };

  const handleConfirm = async () => {
    // 삭제 로직 구현
    const userData = {
      displayName,
      email,
      fb_uid,
      uid,
    };
    const result = await registerUser(userData, answerList);
    if (result) {
      me();
    }
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
