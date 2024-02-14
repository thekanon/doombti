'use client';
// FirebaseProvider.tsx
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import firebaseConfig from '../firebase/firebaseClient';
import useUserStore from '@/app/lib/stores/authStore';
import nookies from 'nookies';
import { User } from '@/app/lib/definitions';

export interface FirebaseProviderProps {
  children: React.ReactNode;
  userInfo?: User;
}

export default function FirebaseProvider({
  userInfo,
  children,
}: FirebaseProviderProps) {
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);
  const { setUserData, name, me } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    console.log('firebase init');

    const auth = getAuth();

    const unsubscribeTokenChange = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        nookies.set(null, 'token', '', { path: '/' });
        return;
      }
      const token = await user.getIdToken();
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, { path: '/' });
    });

    // 사용자 상태 변경 시 호출될 콜백 함수 등록
    const unsubscribeAuthChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        console.log('user=== true');
        if (userInfo) {
          if (name === '') {
            setUserData({
              ...userInfo,
              displayName,
              photoURL,
            });
          }
          console.log('userInfo=== true');

          if (pathname === '/signin' || pathname.indexOf('/introduce') !== -1) {
            if (userInfo.uid !== '') {
              router.replace('/dashboard');
            }
            if (userInfo.uid === '') {
              console.log("userInfo.uid === ''");
              router.replace('/introduce');
            }
          }
        } else {
          console.log('userInfo=== false');
          if (name === '') {
            const auth = me();
            console.log('auth', auth);
          }
        }
        // router.replace('/dashboard');
      } else {
        if (pathname === '/dashboard') {
          router.replace('/signin');
        } else if (
          pathname !== '/' &&
          pathname !== '/signin' &&
          pathname.indexOf('/introduce') === -1
        ) {
          router.replace('/');
        }
      }
      setFirebaseInitialized(true); // 사용자 상태 확인 후 Firebase 초기화 완료
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribeTokenChange();
      unsubscribeAuthChange();
    };
  }, [pathname]);

  return <>{children}</>; // Firebase 초기화 완료 후 자식 컴포넌트 렌더링
}
