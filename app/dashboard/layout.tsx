import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// 화면 이동을 위한 React Router 등의 라이브러리를 여기에 추가

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  // 예시를 위한 핸들러 함수, 실제로는 페이지 이동 로직으로 대체해야 함
  const handleClick = (path: string) => {
    console.log(`Navigate to ${path}`);
    // 페이지 이동 로직
  };

  return (
    <div className="page-transition flex h-screen flex-col">
      <div className="page-transition flex-1 overflow-y-auto">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex justify-around bg-white p-2 md:max-w-2xl">
        <div className="flex flex-col items-center">
          <Link href="/dashboard" className="focus:outline-none">
            <Image
              src="/Iconly/Light-Outline/Home.svg"
              width={24}
              height={24}
              alt="home"
            />
          </Link>
          홈
        </div>
        <div className="flex flex-col items-center">
          <Link href="/dashboard/question" className="focus:outline-none">
            <Image
              src="/Iconly/Light-Outline/Tick Square.svg"
              width={24}
              height={24}
              alt="tick square"
            />
          </Link>
          퀴즈 풀기
        </div>
        <div className="flex flex-col items-center">
          <Link href="/dashboard/survey" className="focus:outline-none">
            <Image
              src="/Iconly/Light-Outline/Ticket Star.svg"
              width={24}
              height={24}
              alt="ticket star"
            />
          </Link>
          설문 하기
        </div>
        <div className="flex flex-col items-center">
          <Link href="/dashboard/profile" className="focus:outline-none">
            <Image
              src="/Iconly/Light-Outline/Profile.svg"
              width={24}
              height={24}
              alt="profile"
            />
          </Link>
          프로필
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
