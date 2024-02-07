import React from 'react';
import { loadAuth } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';
import Link from 'next/link';
interface CardProps {
  title: string;
  progress?: string;
  progressText?: string | null;
  link: string[];
}

const Card = ({
  title,
  progress = '0/100',
  progressText = null,
  link = [''],
}: CardProps) => {
  const [current, total] = progress.split('/').map(Number);
  const progressBarWidth = (current / total) * 100;

  return (
    <Link href={link.join('/')}>
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
                {progressText ? progressText : `${current} / ${total}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
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
        <Card
          key={index}
          title={card.title}
          progress={card.progress}
          progressText={card.progressText}
          link={card.link}
        />
      ))}
    </div>
  );
};

const QuestionListPage = async () => {
  const auth = await loadAuth();
  if (!auth) return;
  const { name, liked_skills, job_description } = auth as User;

  const createQuestionLink = (array = [] as string[]) => {
    return ['..', 'question', ...array];
  };

  const studyCards = [
    {
      title: job_description + '를 위한 문제들이에요',
      progress: '3/10',
      link: ['study', 'job', '프론트엔드'],
    },
    {
      title: '내가 선택한 기술(' + liked_skills.join(', ') + ')',
      progress: '34/103',
      link: ['personal', 'likedSkil'],
    },
    {
      title: '모든 문제 중 랜덤으로 문제를 풀어요',
      progress: '414/1203',
      link: ['study', 'random'],
    },
  ].map((card) => ({ ...card, link: createQuestionLink(card.link) }));
  // TODO: 쿼리 구현 필요
  const funnyCards = [
    {
      title: '라면에 대한 흥미로운 사실!',
      progress: '34/103',
      link: ['funny', 'category', '라면'],
    },
    {
      title:
        '반려동물을 사랑하는 ' + name + '님을 위한 애견 꿀팁 모의고사에요!',
      progress: '34/310',
      link: ['funny', 'category', '반려견 훈련'],
    },
    {
      title: '모든 문제 중 랜덤으로 문제를 풀어요',
      progress: '414/521',
      link: ['funny', 'random'],
    },
  ].map((card) => ({ ...card, link: createQuestionLink(card.link) }));

  const etcCards = [
    {
      title: name + '님이 지금까지 푼 문제들을 모아놓은 리스트에요',
      progressText: '지금 풀어보기',
      link: ['personal', 'solved'],
    },
    {
      title: name + '이 풀었지만, 틀린 문제들을 모아놓은 리스트에요',
      progressText: '지금 풀어보기',
      link: ['personal', 'wrong'],
    },
    {
      title: name + '님이 풀지 않은 문제들을 모아놓은 리스트에요',
      progressText: '지금 풀어보기',
      link: ['personal', 'notSolved'],
    },
  ].map((card) => ({ ...card, link: createQuestionLink(card.link) }));

  return (
    <div>
      <div className="dashboard-container m-2 p-4 md:m-4 md:p-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-indigo-100 p-4 shadow-lg">
            <Section sectionTitle="Study" cards={studyCards} />
          </div>
          <div className="rounded-lg bg-indigo-100 p-4 shadow-lg">
            <Section sectionTitle="Funny" cards={funnyCards} />
          </div>
          <div className="rounded-lg bg-indigo-100 p-4 shadow-lg">
            <Section sectionTitle="Etc" cards={etcCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionListPage;
