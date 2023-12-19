'use client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage && !localStorage?.getItem('visited')) {
      // localStorage.setItem('visited', 'true');
      router.push('/introduce');
    } else {
      // 사용자가 이전에 방문한 적이 있음을 의미
      // 메인 페이지나 다른 페이지를 보여주는 로직
    }
  }, []);

  return <div></div>;
}
