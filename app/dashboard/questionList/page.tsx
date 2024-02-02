import React from 'react';

interface CardProps {
  title: string;
  progress: string;
}

const Card = ({ title, progress }: CardProps) => {
  const [current, total] = progress.split('/').map(Number);
  const progressBarWidth = (current / total) * 100;

  return (
    <div className="mt-2 rounded-lg bg-white p-4 shadow-sm">
      <div className="font-semibold">{title}</div>
      <div className="mt-2">
        <div className="relative h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-blue-300"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
          <div className="absolute left-0 right-0 top-0 flex h-full items-center justify-center">
            <span className="text-sm font-medium tracking-wide text-blue-700">
              {current} / {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SectionProps {
  sectionTitle: string;
  cards: CardProps[];
}

const Section = ({ sectionTitle, cards }: SectionProps) => {
  return (
    <div>
      <div className="text-indigo-600">{sectionTitle}</div>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} progress={card.progress} />
      ))}
    </div>
  );
};

const QuestionListPage = () => {
  // 쿼리 구현 필요
  // 프론트엔드 라는 카테고리에
  const studyCards = [
    {
      title: '프론트엔드 개발자를 위한 문제들이에요',
      progress: '3/10',
      link: '프론트엔드',
    },
    { title: '내가 선택한 기술(React, JQuery, Redux)', progress: '34/103' },
    {
      title: '모든 문제 중 랜덤으로 문제를 풀어요',
      progress: '414/1203',
    },
  ];
  const funnyCards = [
    { title: 'chatGPT 시대를 항해하기 위한 문제 리스트!', progress: '31/42' },
    { title: '라면에 대한 흥미로운 사실!', progress: '34/103' },

    {
      title: '반려동물을 사랑하는 ##님을 위한 애견 꿀팁 모의고사에요!',
      progress: '34/310',
    },
  ];

  return (
    <div>
      <div className="dashboard-container m-2 flex flex-col items-center justify-center space-y-4 p-4 md:m-4 md:flex-row md:justify-around md:space-y-0">
        <div className="w-full max-w-md rounded-lg bg-indigo-100 p-4 shadow-lg">
          <Section sectionTitle="Study" cards={studyCards} />
        </div>
        <div className="w-full max-w-md rounded-lg bg-indigo-100 p-4 shadow-lg">
          <Section sectionTitle="Funny" cards={funnyCards} />
        </div>
      </div>
    </div>
  );
};

export default QuestionListPage;
