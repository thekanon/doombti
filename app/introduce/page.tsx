'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/app/ui/common/Atoms/Loading';
import { useRouter } from 'next/navigation';

const IntroPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('introduce/step');

    const timer = setTimeout(() => {
      router.push('introduce/step');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className=" w-5/12">
        <Image src="/logo.svg" width={400} height={400} alt="logo Image" />
        <h1 className="text-center text-4xl font-bold">Dev Quiz</h1>
      </div>
      <div className="absolute bottom-0 h-40 w-40">
        <Loading />
      </div>
    </div>
  );
};

export default IntroPage;
