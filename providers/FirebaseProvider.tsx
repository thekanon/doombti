'use client';
// FirebaseProvider.tsx
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from '../firebase/firebaseClient';
import useUserStore from '@/app/lib/stores/authStore';

export default function FirebaseProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);
  const { setUserData } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }

    const auth = getAuth();

    // 사용자 상태 변경 시 호출될 콜백 함수 등록
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        console.log('Logged in user:', user);
        setUserData({
          uid,
          displayName,
          email,
          photoURL,
        });
      } else {
        console.log(pathname);
        if (
          pathname !== '/' &&
          pathname !== '/signin' &&
          pathname.indexOf('/introduce') === -1
        ) {
          router.replace('/');
        }
        console.log('No user');
      }
      setFirebaseInitialized(true); // 사용자 상태 확인 후 Firebase 초기화 완료
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [pathname]);

  return <>{children}</>; // Firebase 초기화 완료 후 자식 컴포넌트 렌더링
}
