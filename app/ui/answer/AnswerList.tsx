import React from 'react';
import Answer from './Answer';
import { IAnswerListProps } from '@/app/lib/definitions';

const AnswerList = ({ answers }: IAnswerListProps) => {
  return (
    <div>
      {answers.map((el, i) => (
        <Answer
          key={i}
          index={i}
          id={el.id}
          title={el.title}
          text={el.text}
          isCorrect={el.isCorrect}
          answerId={el.answerId}
          answerText={
            el.answerDescription ? el.answerDescription : el.answerText
          }
        />
      ))}
    </div>
  );
};
export default AnswerList;
