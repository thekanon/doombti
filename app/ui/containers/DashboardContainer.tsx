'use client';
import React from 'react';
import useUserStore from '@/app/lib/stores/authStore';
import UserHeader from '../common/Atoms/UserHeader';
import Card from '../common/Atoms/Card';
import TechnologyInterest from '../common/Atoms/TechnologyInterest';
import ProblemType from '../common/Atoms/ProblemType';
import HotTopic from '../common/Atoms/HotTopic';
import ActionButton from '../common/Atoms/ActionButton';

const DashboardContainer = () => {
  const {
    displayName,
    email,
    job_description,
    liked_technology,
    careeryearnumber,
    mbti,
    liked_skills,
  } = useUserStore();

  const problemTypes = [...liked_skills];

  const cardData = [
    { title: '직무', content: job_description },
    { title: 'MBTI', content: mbti },
    { title: '경력', content: careeryearnumber },
    { title: '오늘의 목표', content: '3문제 / 10문제' },
    { title: '푼 문제 수', content: '3' },
    { title: '연속 목표 달성', content: '3일' },
  ];

  const hotQuestions = [
    {
      title: '유튜브 실버버튼 유튜버 설문조사',
      description:
        '유튜브 실버버튼(구독자 10만명 이상)을 보유한 유튜버들에게 다양한 질문을 통해 그들의 경험과 인사이트를 알아보았어요!',
    },
    {
      title: '원격 근무 1년차 이상 직장인 설문조사',
      description:
        '원격 근무를 1년 이상 경험한 직장인들에게 원격 근무의 장단점, 생활 패턴, 업무 관련 경험 등을 조사해 보았어요.',
    },
    {
      title: '강아지와 함께한 10년 이상 프로 반려인 설문조사',
      description:
        '10년 이상 강아지와 함께한 경험을 가진 프로 반려인들에게 강아지 돌봄, 훈련, 생활 등에 관한 인사이트를 알아보았어요.',
    },
  ];

  return (
    <div className="dashboard-container flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>

        <UserHeader
          displayName={displayName}
          email={email}
          onLogout={useUserStore.getState().logout}
        />

        <div className="dashboard-grid grid grid-cols-2 gap-3">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>

        <TechnologyInterest likedTechnology={liked_technology} />

        <ProblemType problemTypes={problemTypes} />

        <div
          className="mt-4 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md
        "
        >
          <h2 className="mb-4 text-lg font-bold">요즘 핫한 설문이에요</h2>
          {hotQuestions.map((question, index) => (
            <HotTopic
              key={index}
              title={question.title}
              description={question.description}
            />
          ))}

          <button className="mt-6 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50">
            설문 더 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
