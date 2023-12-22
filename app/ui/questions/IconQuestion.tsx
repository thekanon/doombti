import React from 'react';
import IconButton from '../common/Molecules/IconButton';
import { ICON_LIST, COLOR_LIST } from '@/app/lib/commons';
import { IIConQuestion } from '@/app/lib/definitions';

const IconQuestion = (props: IIConQuestion) => {
  const colors = COLOR_LIST;
  const icons = ICON_LIST;

  return (
    <>
      {/* <div>What type of account do you like to create? 👦</div> */}
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-4
        p-2
      "
      >
        <div className="Body XLarge Regular flex w-full items-start">
          {props.description}
        </div>
        <div className="Heading4 Bold break-keep">{props.title}</div>
        <div
          className="flex w-full flex-col flex-wrap items-center justify-center gap-4
        "
        >
          {props.questions.map((question, index) => (
            <IconButton
              key={index}
              icon={'Tick Square'}
              text={question.text}
              color={colors[index % colors.length]}
              onClick={() => props.onClick(index)}
              clickEffect={true}
              selected={props.selectedQuestion === index}
              size={50}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default IconQuestion;
