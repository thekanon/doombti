import '@/firebase/firebaseInit';
import '@/app/ui/global.css';
import './globals.css';
import './styles/atoms.css';
import { Nunito } from 'next/font/google';
import CombinedProvider from '@/providers/CombinedProvider';

const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <body>
        <CombinedProvider>{children}</CombinedProvider>
      </body>
    </html>
  );
}
