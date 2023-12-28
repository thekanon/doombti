'use client';
import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      router.push('/dashboard');
    }
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // 이 부분에서 사용자 정보를 처리하거나 다른 페이지로 리디렉션 할 수 있습니다.
        console.log('User signed in: ', result.user);
        // router.push('/dashboard');
      })
      .catch((error) => {
        // 로그인 중 에러가 발생하면 여기에서 처리합니다.
        console.error('Error signing in: ', error);
        router.push('/introduce/step');
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs rounded-lg bg-white px-6 py-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          소셜 계정 로그인
        </h1>
        <button
          onClick={handleSignIn}
          className="mb-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
        >
          Sign in with Google
        </button>
        <br />
        <button
          disabled
          className="mb-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
        >
          Sign in with Kakao(준비중)
        </button>
        <button
          disabled
          className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
        >
          Sign in with Apple(준비중)
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
