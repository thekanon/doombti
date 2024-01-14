'use client';
import React from 'react';
import useUserStore from '@/app/lib/stores/authStore';

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
    { title: '오늘의 목표', content: '3문제 / 10문제' }, // 셋팅 필요함
    { title: '푼 문제 수', content: '3' }, // 셋팅 필요함
    { title: '연속 목표 달성', content: '3일' }, // 셋팅 필요함
  ];

  const hotQuestions = {
    title: '유튜브 실버버튼 유튜버 설문조사',
    description:
      '유튜브 실버버튼(구독자 10만명 이상)을 보유한 유튜버들에게 다양한 질문을 통해 그들의 경험과 인사이트를 알아보았어요!',
  };

  const hotSurveys = {
    title: '유튜브 실버버튼 유튜버 설문조사',
    description:
      '유튜브 실버버튼(구독자 10만명 이상)을 보유한 유튜버들에게 다양한 질문을 통해 그들의 경험과 인사이트를 알아보았어요!',
  };

  return (
    <div className="dashboard-container flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
        <div className="dashboard-header mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Hi, {displayName}</p>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
          <div>
            <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700">
              목표 설정
            </button>
            <button
              className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
              onClick={() => {
                useUserStore.getState().logout();
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="dashboard-grid grid grid-cols-2 gap-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="h-18 flex flex-col justify-between rounded-lg bg-indigo-100 p-4 shadow-sm"
            >
              <p className="font-semibold text-indigo-600">{card.title}</p>
              <p className="text-mg">{card.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex w-full flex-col justify-between rounded-lg bg-indigo-100 p-4 shadow-sm">
          <p className="font-semibold text-indigo-600">관심있는 기술</p>
          <p className="text-mg">{liked_technology}</p>
        </div>
        <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 font-semibold">문제 유형</h2>
          <div className="flex flex-wrap ">
            {problemTypes.map((type, index) => (
              <span
                key={index}
                className="m-1.5 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-600"
              >
                {type}
              </span>
            ))}
          </div>
          <button className="mt-4 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
            문제 유형 설정
          </button>
        </div>
        <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 text-lg font-bold">요즘 핫한 설문이에요</h2>
          <div></div>
          <button className="mt-6 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50">
            설문 더 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
