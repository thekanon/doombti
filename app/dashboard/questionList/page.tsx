import React from 'react';

interface CardProps {
  title: string;
  progress: string;
}

const Card = ({ title, progress }: CardProps) => {
  return (
    <div className="mt-2 rounded-lg bg-white p-4 shadow-sm">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 flex justify-between">
        <div>문제 수</div>
        <div>{progress}</div>
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
  // Sample data for the sections and cards
  const studyCards = [
    { title: '프론트엔드 개발자를 위한 문제들이에요', progress: '3/10' },
    // ... add more cards as needed
  ];
  const funnyCards = [
    { title: 'chatGPT 시대를 항해하기 위한 문제 리스트!', progress: '31/42' },
    // ... add more cards as needed
  ];

  return (
    <div className="dashboard-container m-2 flex flex-col items-center justify-center space-y-4 p-4 md:m-4 md:flex-row md:justify-around md:space-y-0">
      <div className="w-full max-w-md rounded-lg bg-indigo-100 p-4 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-indigo-600">Quiz</h1>
        <Section sectionTitle="Study" cards={studyCards} />
        <Section sectionTitle="Funny" cards={funnyCards} />
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default QuestionListPage;
