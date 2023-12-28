// providers/CombinedProvider.js
import React from 'react';
import FirebaseProvider from './FirebaseProvider';

const CombinedProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return <FirebaseProvider>{children}</FirebaseProvider>;
};

export default CombinedProvider;
