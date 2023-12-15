// Icon.tsx
import React from "react";
import Image from "next/image";

const iconMappings: {
  [theme: string]: {
    [type: string]: string;
  };
} = {
  light: {
    email: "/Iconly/Bold/Message.svg",
    username: "/Iconly/Bold/Profile.svg",
    password: "/Iconly/Bold/Lock.svg",
    phone: "/Iconly/Bold/Call.svg",
    apple: "/Iconly/Button/white-apple.svg",
    google: "/Iconly/Button/google.svg",
    facebook: "/Iconly/Button/facebook.svg",
  },
  dark: {
    email: "/Iconly/Bold/Dark/Message.svg",
    username: "/Iconly/Bold/Dark/Profile.svg",
    password: "/Iconly/Bold/Dark/Lock.svg",
    phone: "/Iconly/Bold/Dark/Call.svg",
    apple: "/Iconly/Button/dark-apple.svg",
    google: "/Iconly/Button/google.svg",
    facebook: "/Iconly/Button/facebook.svg",
  },
};

const Icon = ({ type, theme }: { type: string; theme: string }) => {
  const iconSrc = iconMappings[theme]?.[type];

  if (iconSrc) {
    return (
      <div className="ml-2">
        <Image src={iconSrc} alt={`${type} Icon`} width={20} height={20} />
      </div>
    );
  }

  return null;
};

export default Icon;
