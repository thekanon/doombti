import React from 'react';
import Icon from './Icon';

export interface ButtonComponentProps {
  colorType?: 'primary' | 'secondary' | 'additional';
  styleType?: 'filled' | 'rounded' | 'icon';
  iconStyle?: 'facebook' | 'apple' | 'google';
  state?: 'active' | 'disabled';
  theme?: 'dark' | 'light';
  customStyle?: string;
  text?: string;
  onClick?: () => void;
}

const ButtonComponent = ({
  colorType = 'primary',
  styleType = 'filled',
  iconStyle,
  state = 'active',
  theme = 'light',
  customStyle = 'py-[18px] px-4 ',
  text,
  onClick,
}: ButtonComponentProps) => {
  let baseStyles =
    // "px-4 py-2 text-sm font-medium rounded-md focus:outline-none";
    'Body Large Bold button-component flex justify-center items-center gap-2.5';

  // Styles for colorType
  let colorTypeStyles = colorType;

  // Styles for styleType
  let styleTypeStyles = 'rounded-[16px]';
  if (styleType === 'rounded') {
    styleTypeStyles = 'rounded-full';
  } else if (styleType === 'icon') {
    styleTypeStyles = 'flex items-center justify-center';
  }

  // Styles for state
  let stateStyles = '';
  if (state === 'active') {
    stateStyles = 'active:scale-95';
  } else if (state === 'disabled') {
    stateStyles = 'opacity-50 cursor-not-allowed';
  }

  // Styles for theme
  let themeStyles = '';
  if (theme === 'dark') {
    themeStyles = 'bg-gray-800 text-white';
  } else if (theme === 'light') {
    themeStyles = 'bg-white text-gray-800';
  }

  // Combine all styles
  let buttonStyles = ` ${customStyle} ${baseStyles} ${styleTypeStyles} ${colorTypeStyles} ${stateStyles} ${themeStyles}
  `;

  return (
    <button className={buttonStyles} onClick={onClick}>
      {iconStyle && <Icon type={iconStyle} theme={theme} />} {text}
    </button>
  );
};

export default ButtonComponent;
