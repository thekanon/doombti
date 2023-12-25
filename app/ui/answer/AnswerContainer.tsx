'use client';
import React, { useEffect } from 'react';
import useQuestionStore from '@/app/lib/stores/questionStore';
import AnswerList from './AnswerList';
import { useRouter } from 'next/navigation';

const AnswerContainer = () => {
  const { answerList, totalQuestions } = useQuestionStore();
  const [answers, setAnswers] = React.useState<any[]>([]);

  // let answers = Object.values(answerList);

  useEffect(() => {
    if (
      answers?.length === 0 &&
      sessionStorage &&
      sessionStorage?.getItem('answerList')
    ) {
      console.log(sessionStorage);
      const answerStr = sessionStorage?.getItem('answerList') || '';
      setAnswers(JSON.parse(answerStr));
    }
  }, [answerList]);

  console.log(answerList);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-2xl font-bold">샘플 퀘스트</h2>
      <h3 className="text-xl font-bold">{`
      ${answers.length}개 중 
      ${answers.filter((answer) => answer.isCorrect).length}개 완료!`}</h3>
      <AnswerList answers={answers} />
    </div>
  );
};

export default AnswerContainer;
