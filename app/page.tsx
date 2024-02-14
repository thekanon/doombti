'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Loading from '@/app/ui/common/Atoms/Loading';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/lib/stores/authStore';

export default function Page() {
  const router = useRouter();
  const userinfo = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage?.getItem('visited') && !userinfo.fb_uid) {
        console.log('not visited');
        localStorage.setItem('visited', 'true');
        router.push('introduce/step');
      } else if (userinfo.fb_uid) {
        console.log('visited');
        router.push('dashboard');
        // 사용자가 이전에 방문한 적이 있음을 의미
        // 메인 페이지나 다른 페이지를 보여주는 로직
      } else {
        console.log('not login');
        router.push('signin');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [router, userinfo]);

  return (
    <div
      className="flex h-screen flex-col items-center
    "
    >
      <div
        className="mt-40 w-7/12 md:w-3/12"
        style={{
          textAlign: '-webkit-center' as any,
        }}
      >
        <Image
          src="/logo.svg"
          width={400}
          height={400}
          alt="logo Image"
          priority
        />
        <h1 className="text-center text-4xl font-bold">Dev Quiz</h1>
        <div className="relative top-2.5 w-1/2">
          <Loading />
        </div>
      </div>
    </div>
  );
}
