'use client';
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import useUserStore from '@/app/lib/stores/authStore';
import { useRouter } from 'next/navigation';
import { fetchUserData } from '@/app/api/users';
import LoadingAnimation from '../ui/common/Atoms/Loading';

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { uid, setUserData } = useUserStore();

  useEffect(() => {
    if (uid !== '') {
      router.push('/dashboard');
    }
  }, []);

  const handleSignIn = () => {
    const auth = getAuth();
    setIsLoading(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        console.log('User signed in: ', result.user);
        fetchUserData(result.user.uid).then((res) => {
          if (res.length === 1) {
            const userInfo = res[0];
            const { displayName, photoURL } = result.user;
            console.log(userInfo);
            setUserData({
              ...userInfo,
              displayName,
              photoURL,
            });
            router.push('/dashboard');
          } else {
            router.push('/introduce/setRegister');
          }
        });
      })
      .catch((error) => {
        // 로그인 중 에러가 발생하면 여기에서 처리합니다.
        console.error('Error signing in: ', error);
        router.push('/introduce/step');
      });
  };

  const handleAppleSignIn = () => {
    alert('준비중입니다.');
  };

  const handleKakaoSignIn = () => {
    alert('준비중입니다.');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="loading-container">
          <LoadingAnimation />
        </div>
      )}
      <div className="w-full max-w-xs rounded-lg bg-white px-6 py-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          소셜 계정으로 <br />
          바로 시작할 수 있어요!
        </h1>
        <button
          onClick={handleSignIn}
          className="btn-google mb-4 flex w-full items-center rounded px-4 py-2 focus:outline-none"
        >
          <span className="btn-icon">
            <img
              src="/Iconly/Button/google.svg"
              alt="Google"
              style={{ width: '24px', height: '24px' }}
            />
          </span>
          <span className="flex-grow text-center">Google로 시작하기</span>
        </button>

        <button
          onClick={handleAppleSignIn}
          className="btn-apple mb-4 flex w-full items-center rounded px-4 py-2 focus:outline-none"
        >
          <span className="btn-icon">
            <img
              src="/Iconly/Button/white-apple.svg"
              alt="Google"
              style={{ width: '24px', height: '24px' }}
            />
          </span>
          <span className="flex-grow text-center">Apple로 시작하기</span>
        </button>
        <button
          onClick={handleKakaoSignIn}
          className="btn-kakao mb-4 flex w-full items-center rounded px-4 py-2 focus:outline-none"
        >
          <span className="btn-icon">
            <img
              src="/Iconly/Button/kakao.svg"
              alt="Google"
              style={{ width: '24px', height: '24px' }}
            />
          </span>
          <span className="flex-grow text-center">카카오로 시작하기</span>
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
