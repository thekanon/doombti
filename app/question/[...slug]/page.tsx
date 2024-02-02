import React from 'react';
import { getUserLikeSkills, getFilteredSurveyOptions } from '@/app/lib/data';
const QuestionPage = async ({ params }: { params: { slug: string } }) => {
  console.log(params);
  // const res = await getUserLikeSkills('S1x8u81VZiXNgOHpIosNF0PqDpD3');
  const res = await getFilteredSurveyOptions('디자인');

  /*
    여기서 대충 
    params.slug의 값이 [study,myskill] 이면 getUserLikeSkills
    params.slug의 값이 [study,random] 이면 getQuestionsWithOptions
    params.slug의 값이 [study,myjob] 이면 getFilteredSurveyOptions

    그 외
    [study, job, 프론트엔드],
    [study, 내가 못 푼 문제],
    [study, 내가 푼 문제],
    [study, skill, React],
    [study, JQuery],

    [funny, 랜덤],
    [funny, 내가 푼 문제],
    [funny, 라면에 대한 퀴즈],
    [funny, 반려동물 백서],
    [funny, chatGPT],

  */
  console.log(res);
  return (
    <div>
      My Post: {params.slug[0]}
      My Post: {params.slug[1]}
      <div>
        {res.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.answer_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
