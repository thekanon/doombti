import React from 'react';

const QuestionContainerSkeleton = () => {
  return (
    <div className="p-2 pb-[10vh]">
      <div className="p-4">
        {/* 스켈레톤 프로그레스 바 */}
        <div className="h-2 rounded-full bg-gray-200"></div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* 스켈레톤 질문 아이콘 */}
        <div className="h-20 w-full rounded-lg bg-gray-200"></div>
        {/* 스켈레톤 설명 텍스트 */}
        <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
        {/* 스켈레톤 옵션 리스트 */}
        <div className="mt-2 h-24 w-full rounded-lg bg-gray-200"></div>
        <div className="mt-2 h-24 w-full rounded-lg bg-gray-200"></div>
        <div className="mt-2 h-24 w-full rounded-lg bg-gray-200"></div>
        <div className="mt-2 h-24 w-full rounded-lg bg-gray-200"></div>
      </div>
      {/* fixed footer */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-white p-4"
        style={{ height: '10vh' }}
      >
        {/* 스켈레톤 버튼 */}
        <div className="h-12 w-full rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default QuestionContainerSkeleton;
