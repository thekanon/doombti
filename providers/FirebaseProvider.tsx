'use client';
import React, { useEffect, useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import firebaseConfig from '../firebase/firebaseClient'; // 올바른 경로로 수정하세요

export default function FirebaseProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [isFirebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
      setFirebaseInitialized(true); // Firebase 초기화 완료
    }
  }, []);

  if (!isFirebaseInitialized) {
    return <div></div>; // Firebase 초기화 중
  }

  return <>{children}</>; // Firebase 초기화 완료 후 자식 컴포넌트 렌더링
}
