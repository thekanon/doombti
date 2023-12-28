import React from 'react';
import useUserStore from '@/app/lib/stores/authStore';

const DashboardContainer = () => {
  const displayName = useUserStore((state) => state.displayName);
  const email = useUserStore((state) => state.email);
  const problemTypes = ['DP', 'BFS']; // 예시 문제 유형

  const cardData = [
    { title: '직무', content: '프론트엔드 개발자' },
    { title: '푼 문제 수', content: '3' },
    { title: '연속 목표 달성', content: '3일' },
    { title: '오늘의 목표', content: '3문제 / 10문제' },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Hi, {displayName}</p>
            <p className="text-sm text-gray-600">email: {email}</p>
          </div>
          <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700">
            목표 설정
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
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
