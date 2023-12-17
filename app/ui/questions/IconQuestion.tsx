import React from 'react';
import IconButton from '../common/Molecules/IconButton';
import { ICON_LIST, COLOR_LIST } from '@/app/lib/commons';
/*
  제목
    Question의 제목
  설명
    제목 하단에 들어가는 설명
  문항
    Question의 문항(4지선다)
*/
export interface IIConQuestion {
  title: string;
  description: string;
  questions: string[];
}
const IconQuestion = (props: IIConQuestion) => {
  const colors = COLOR_LIST;
  const icons = ICON_LIST;

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  return (
    <>
      {/* <div>What type of account do you like to create? 👦</div> */}
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-4
        p-2
      "
      >
        <div className="Heading4 Bold break-keep">{props.title}</div>
        <div className="Body XLarge Regular">{props.description}</div>
        <div
          className="flex w-full flex-col flex-wrap items-center justify-center gap-4
        "
        >
          {props.questions.map((question, index) => (
            <IconButton
              key={index}
              icon={getRandomIcon()}
              text={question}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default IconQuestion;
