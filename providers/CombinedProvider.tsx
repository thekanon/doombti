// providers/CombinedProvider.js
import React from 'react';
import FirebaseProvider from './FirebaseProvider';
import ReactQueryProvider from './ReactQueryProvider';

const CombinedProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ReactQueryProvider>
      <FirebaseProvider>{children}</FirebaseProvider>
    </ReactQueryProvider>
  );
};

export default CombinedProvider;
