import React from 'react';
import Image from 'next/image';

const IntroPage = () => {
  return (
    <div>
      <h1>Intro Us</h1>
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
  );
};

export default IntroPage;
