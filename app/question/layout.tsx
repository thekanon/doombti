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
        <Link className="flex items-center" href="/dashboard">
          {/* 왼쪽 아이콘과 텍스트 */}
          <Image src="/logo.svg" width={24} height={24} alt="Icon" />
          <span className="ml-2">Dev Quiz</span>
        </Link>
        <div
          className="flex items-center gap-2
        "
        >
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
        <Link href="/dashboard" className="focus:outline-none">
          <button className="flex flex-col items-center">
            <Image
              src="/Iconly/Light-Outline/Home.svg"
              width={24}
              height={24}
              alt="home"
            />
            홈
          </button>
        </Link>
        <Link href="/dashboard/questionList" className="focus:outline-none">
          <button className="flex flex-col items-center">
            <Image
              src="/Iconly/Light-Outline/Tick Square.svg"
              width={24}
              height={24}
              alt="tick square"
            />
            퀴즈 풀기
          </button>
        </Link>
        <Link href="/dashboard/survey" className="focus:outline-none">
          <button className="flex flex-col items-center">
            <Image
              src="/Iconly/Light-Outline/Ticket Star.svg"
              width={24}
              height={24}
              alt="ticket star"
            />
            설문 하기
          </button>
        </Link>
        <Link href="/dashboard/profile" className="focus:outline-none">
          <button className="flex flex-col items-center">
            <Image
              src="/Iconly/Light-Outline/Profile.svg"
              width={24}
              height={24}
              alt="profile"
            />
            프로필
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default MobileLayout;
