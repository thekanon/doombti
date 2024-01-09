import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <header
        className="flex items-center justify-between bg-white p-2 shadow-md
      "
      >
        <div className="flex items-center">
          {/* 왼쪽 아이콘과 텍스트 */}
          <Image src="/logo.svg" width={24} height={24} alt="Icon" />
          <span className="ml-2">Your App</span>
        </div>
        <div
          className="flex items-center gap-2
        "
        >
          {/* 검색창 */}
          <button className="rounded p-1">
            <Image
              src="/Iconly/Light/Search.svg"
              width={24}
              height={24}
              alt="Icon"
            />
          </button>
          <button className="rounded p-1">
            <Image
              src="/Iconly/Light/Notification.svg"
              width={24}
              height={24}
              alt="Icon"
            />
          </button>
          <button className="rounded p-1">
            <Image
              src="/Iconly/Light/Setting.svg"
              width={24}
              height={24}
              alt="Icon"
            />
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto">{children}</div>

      <nav className="flex flex-none justify-around bg-white p-2">
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
