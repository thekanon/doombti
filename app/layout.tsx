import '@/firebase/firebaseInit';
import '@/app/ui/global.css';
import './globals.css';
import './styles/atoms.css';
import { Nunito } from 'next/font/google';
import CombinedProvider from '@/providers/CombinedProvider';
import { cookies, headers } from 'next/headers';
import { admin } from '@/firebase/firebaseAdmin';
import { getUserInfo } from '@/app/lib/data';
import { User } from './lib/definitions';

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
});
async function loadAuth() {
  'use server';
  try {
    const cookieStore = cookies();
    const cookietoken = cookieStore.get('token');

    if (!cookietoken || cookietoken?.value === '') {
      return;
    }
    console.log('cookietoken: ', cookietoken);
    const token = await admin.auth().verifyIdToken(cookietoken.value);
    const { uid, email } = token;
    console.log('uid, email: ', uid, email);
    const userInfo = await getUserInfo(uid);

    return userInfo[0];
  } catch (error) {
    console.log('error', error);
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = (await loadAuth()) as User;
  console.log('getCookie', userInfo);
  return (
    <html lang="ko" className={inter.className}>
      <body>
        <CombinedProvider userInfo={userInfo}>{children}</CombinedProvider>
      </body>
    </html>
  );
}
