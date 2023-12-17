import React from 'react';

import IconQuestion from './IconQuestion';
import ProgressBar from '../common/Atoms/ProgressBar';
import ButtonComponent from '../common/Atoms/ButtonComponent';

const QuestionContainer = () => {
  const question = 50;

  return (
    <div>
      {' '}
      <ProgressBar percentage={question} color="black" />
      <div className="flex flex-col items-center justify-center">
        <IconQuestion
          title='JavaScript에서 "hoisting"이란 무엇인가요?'
          description=""
          questions={[
            '변수와 함수 선언을 스크립트의 맨 위로 끌어올리는 JavaScript의 기본 행동',
            '페이지가 로드될 때 스크립트를 서버에서 클라이언트로 전송하는 과정',
            '함수 내에서만 사용할 수 있는 변수를 선언하는 방법',
            'CSS 스타일을 JavaScript로 동적으로 조작하는 방법',
          ]}
        />
      </div>
      {/* fixed footer */}
      <div
        className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center"
        style={{ height: '20vh' }}
      >
        <ButtonComponent
          customStyle="w-full p-3"
          colorType="secondary"
          text="Skip"
          // onClick={() => console.log('Next')}
        />
      </div>
    </div>
  );
};
export default QuestionContainer;
