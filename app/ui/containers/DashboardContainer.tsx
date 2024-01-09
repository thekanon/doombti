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
  } = useUserStore();

  const problemTypes = ['DP', 'BFS']; // 예시 문제 유형

  const cardData = [
    { title: '직무', content: job_description },
    { title: '푼 문제 수', content: '3' }, // 셋팅 필요함
    { title: '연속 목표 달성', content: '3일' }, // 셋팅 필요함
    { title: '오늘의 목표', content: '3문제 / 10문제' }, // 셋팅 필요함
    { title: 'MBTI', content: mbti },
    { title: '경력', content: careeryearnumber },
  ];

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
              className="flex h-28 flex-col justify-between rounded-lg bg-indigo-100 p-4 shadow-sm"
            >
              <p className="font-semibold text-indigo-600">{card.title}</p>
              <p className="text-mg">{card.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-white p-3 shadow-md">
          <h2 className="mb-2 font-semibold">문제 유형</h2>
          <div className="flex space-x-2">
            {problemTypes.map((type, index) => (
              <span
                key={index}
                className="mr-2 rounded bg-blue-200 px-2.5 py-0.5 text-xs font-semibold text-blue-800"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <button className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
          문제 유형 설정
        </button>
      </div>
    </div>
  );
};

export default DashboardContainer;
