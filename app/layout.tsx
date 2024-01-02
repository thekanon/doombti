import '@/firebase/firebaseInit';
import '@/app/ui/global.css';
import './globals.css';
import './styles/atoms.css';
import { Nunito } from 'next/font/google';
import CombinedProvider from '@/providers/CombinedProvider';
import nookies from 'nookies';
import { cookies, headers } from 'next/headers';
import { admin } from '@/firebase/firebaseAdmin';

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
});
async function loadAuth() {
  'use server';
  try {
    const cookieStore = cookies();
    const cookietoken = cookieStore.get('token');

    if (!cookietoken) {
      const error = new Error('No token found');
      throw error;
    }
    const token = await admin.auth().verifyIdToken(cookietoken.value);
    const { uid, email } = token;
    console.log('uid, email: ', uid, email);

    return {
      props: { uid },
    };
  } catch (error) {
    // token 쿠키가 없을 경우 또는 token 인증(verifyIdToken)에 실패한 경우
    // login 페이지로 redirect
    // context.res.writeHead(302, { Location: '/login' });
    // context.res.end();

    // NextResponse.redirect('./');

    // 'as never'는 InferGetServerSidePropsType의 참조 이슈를 방지한다.
    // 위 코드에서 사용자는 이미 redirect됨으로 리턴되는 props는 중요하지 않다.
    return {
      props: {} as never,
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getCookie = await loadAuth();
  console.log(getCookie);
  return (
    <html lang="ko" className={inter.className}>
      <body>
        <CombinedProvider>{children}</CombinedProvider>
      </body>
    </html>
  );
}
