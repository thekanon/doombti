import '@/firebase/firebaseInit';
import '@/app/ui/global.css';
import './globals.css';
import './styles/atoms.css';
import { Nunito } from 'next/font/google';
import CombinedProvider from '@/providers/CombinedProvider';
import { User } from './lib/definitions';
import { loadAuth } from './lib/actions';
import { headers } from 'next/headers';

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export async function getUserInfo() {
  const authHeaders = headers().get('x-from-auth-page');
  console.log(authHeaders);
  if (authHeaders) {
    return (await loadAuth()) as User;
  } else {
    return undefined;
  }
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = (await getUserInfo()) as User | undefined;

  return (
    <html lang="ko" className={inter.className}>
      <body>
        <CombinedProvider userInfo={userInfo}>{children}</CombinedProvider>
      </body>
    </html>
  );
}
