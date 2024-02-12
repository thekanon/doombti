// Icon.tsx
import React from 'react';
import { IAnswerProps } from '@/app/lib/definitions';
import useQuestionStore from '@/app/lib/stores/questionStore';

interface IAnswerWithIndexProps extends IAnswerProps {
  index: number;
}

const Answer = ({
  index,
  id,
  title,
  text,
  isCorrect,
  answerId,
  answerText,
}: IAnswerWithIndexProps) => {
  return (
    <div
      className="mb-4 animate-slide-in rounded-lg border p-4 shadow-md"
      style={{
        animation: `slideInFromLeft 0.5s ease-out ${index * 0.5}s`,
        animationFillMode: 'backwards',
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-600">
          Question {index + 1}
        </div>
        <div
          className={`font-semibold ${
            isCorrect ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isCorrect ? 'Correct' : 'Incorrect'}
        </div>
      </div>
      <div className="mb-2 text-xl font-bold text-gray-800">{title}</div>
      <div className="mb-2 text-gray-700">{answerText ? answerText : text}</div>

      {/* 숨김 처리된 정보 */}
      <div
        className="hidden text-xs text-gray-500
      "
      >
        <div>ID: {id}</div>
        <div>Answer ID: {answerId}</div>
        <div>Real Answer: {answerText}</div>
      </div>
    </div>
  );
};

export default Answer;
