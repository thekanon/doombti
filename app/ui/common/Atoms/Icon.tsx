// Icon.tsx
import React from 'react';
import Image from 'next/image';

interface IconProps {
  type: string;
  theme: string;
  leftMargin?: boolean;
  size?: number;
}

const iconMappings = (theme: string, type: string) => {
  //   email: '/Iconly/Bold/Message.svg',
  // dark: {
  //   email: '/Iconly/Bold/Dark/Message.svg',
  if (theme === 'light') {
    return `/Iconly/Bold/${type}.svg`;
  } else {
    return `/Iconly/Bold/Dark/${type}.svg`;
  }
};

const Icon = ({ type, theme, leftMargin = true, size = 20 }: IconProps) => {
  const iconSrc = iconMappings(theme, type);
  if (iconSrc) {
    return (
      <div className={leftMargin ? 'ml-2' : ''}>
        <Image src={iconSrc} alt={`${type} Icon`} width={size} height={size} />
      </div>
    );
  }

  return null;
};

export default Icon;
