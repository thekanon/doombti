import '@/firebase/firebaseInit';
import '@/app/ui/global.css';
import './globals.css';
import './styles/atoms.css';
import { Nunito } from 'next/font/google';
import CombinedProvider from '@/providers/CombinedProvider';
import { User } from './lib/definitions';
import { loadAuth } from './lib/actions';

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = (await loadAuth()) as User;
  return (
    <html lang="ko" className={inter.className}>
      <body>
        <CombinedProvider userInfo={userInfo}>{children}</CombinedProvider>
      </body>
    </html>
  );
}
