import React from 'react';
import Swiper from '@/app/ui/common/Molecules/Swiper';
import ButtonComponent from '@/app/ui/common/Atoms/ButtonComponent';
import Image from 'next/image';

const Tutorial1Page = {
  content: (
    <div
      className="bg-gradien flex h-full w-full flex-col items-center
     justify-center p-10"
    >
      <Image
        src="/assets/png/introStep1.png"
        width={500}
        height={500}
        alt="introstep1"
      />
      <div className="max-w-xl pb-2 pt-4">
        <h1 className="Bold text-2xl	">
          매일 다른 문제를 풀고 다른 친구들과 공유해보세요
        </h1>
      </div>
    </div>
  ),
};

const Tutorial2Page = {
  content: (
    <div
      className="bg-gradien flex h-full w-full flex-col items-center
     justify-center p-10"
    >
      <Image
        src="/assets/png/introStep2.png"
        width={500}
        height={500}
        alt="introstep1"
      />
      <div className="max-w-xl pb-2 pt-4">
        <h1 className="Bold text-2xl">
          게임같은 학습, 재미있는 도전,
          <br />
          친구들과 경쟁하고 공유하세요
          <br />
          데이터로 알려드려요
        </h1>
      </div>
    </div>
  ),
};
const Tutorial3Page = {
  content: (
    <div
      className="bg-gradien flex h-full w-full flex-col items-center
     justify-center p-10"
    >
      <Image
        src="/assets/png/introStep3.png"
        width={500}
        height={500}
        alt="introstep1"
      />
      <div className="max-w-xl pb-2 pt-4">
        <h1 className="Bold text-2xl">
          무료로 사용할 수 있어요.
          <br />
          일단 해보고 가입해도 괜찮아요
        </h1>
      </div>
    </div>
  ),
};

const StepPage = () => {
  return (
    <div
      className="h-screen
    "
    >
      <div className="absolute left-0 right-0 pt-16">
        <Swiper slides={[Tutorial1Page, Tutorial2Page, Tutorial3Page]} />
      </div>
      {/* button wrapper */}
      <div
        className="fixed bottom-0 flex w-full flex-col items-center justify-center gap-4 p-4
      "
      >
        <ButtonComponent
          colorType="primary"
          state="active"
          styleType="filled"
          customStyle="w-full max-w-xl py-2"
          text="일단 해보기"
        ></ButtonComponent>
        <ButtonComponent
          colorType="primary"
          state="active"
          customStyle="w-full max-w-xl py-2"
          styleType="filled"
          text="바로 가입하기"
        ></ButtonComponent>
      </div>
    </div>
  );
};
export default StepPage;
