'use client';
import React, { useEffect } from 'react';
import useQuestionStore from '@/app/lib/stores/questionStore';
import AnswerList from '../answer/AnswerList';
import ButtonComponent from '../common/Atoms/ButtonComponent';
import ConfirmDialog from '../common/Molecules/ConfirmDialog';
import { useRouter } from 'next/navigation';

const AnswerContainer = () => {
  const {
    answerList,
    clearAnswer,
    setQuestionIndex,
    setPercentage,
    setSelectedQuestion,
  } = useQuestionStore();
  const [answers, setAnswers] = React.useState<any[]>(answerList);
  const router = useRouter();
  // let answers = Object.values(answerList);

  useEffect(() => {
    console.log(answers);
    if (
      answers?.length === 0 &&
      sessionStorage &&
      sessionStorage?.getItem('answerList')
    ) {
      const answerStr = sessionStorage?.getItem('answerList') || '';
      setAnswers(JSON.parse(answerStr));
    }
  }, [answers, answerList]);

  const handleReset = () => {
    setQuestionIndex(0);
    setPercentage(0);
    router.push('../sampleQuestion');
  };

  const handleConfirm = () => {
    setQuestionIndex(0);
    setPercentage(0);
    setSelectedQuestion(null);
    clearAnswer();

    router.push('../../signin');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-4 pb-[10vh] shadow-md">
      <h2 className="text-2xl font-bold">샘플 퀘스트 - 이런 느낌이에요</h2>
      <h3 className="text-xl font-bold">{`
      ${answers.length}개 중 
      ${answers.filter((answer) => answer.isCorrect).length}개 완료!`}</h3>
      <AnswerList answers={answers} />
      {/* fixed footer */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-white p-4"
        style={{ height: '10vh' }}
      >
        <ButtonComponent
          customStyle="w-full p-3"
          colorType="secondary"
          text="다시 풀어보기"
          onClick={handleReset}
        />

        <ButtonComponent
          customStyle="w-full p-3"
          colorType="secondary"
          text="회원가입하기"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default AnswerContainer;
