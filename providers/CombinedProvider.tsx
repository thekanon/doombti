// providers/CombinedProvider.js
import React from 'react';
import FirebaseProvider from './FirebaseProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { User } from '@/app/lib/definitions';

export interface CombinedProviderProps {
  children: React.ReactNode;
  userInfo?: User;
}

const CombinedProvider = ({ userInfo, children }: CombinedProviderProps) => {
  return (
    <ReactQueryProvider>
      <FirebaseProvider userInfo={userInfo}>{children}</FirebaseProvider>
    </ReactQueryProvider>
  );
};

export default CombinedProvider;
