'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/app/ui/common/Atoms/Loading';
import { useRouter } from 'next/navigation';

const IntroPage = () => {
  const router = useRouter();

  useEffect(() => {
    /*
      prefetch를 사용하여 페이지를 미리 로드
      얘를 안하면 페이지 이동후에 이미지를 가져오기 때문에 페이지 레이아웃이 깨짐
    */
    router.prefetch('introduce/step');

    const timer = setTimeout(() => {
      router.push('introduce/step');
    }, 300000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex h-screen flex-col items-center justify-around
    "
    >
      <div
        className="w-7/12 md:w-3/12"
        style={{
          textAlign: '-webkit-center' as any,
        }}
      >
        <Image src="/logo.svg" width={400} height={400} alt="logo Image" />
        <h1 className="text-center text-4xl font-bold">Dev Quiz</h1>
        <div className="w-1/2">
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
