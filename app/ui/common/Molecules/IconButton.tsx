import React from 'react';
import Icon from '../Atoms/Icon';

interface IIconButton {
  icon: string;
  color: string;
  text: string;
  theme?: string;
  className?: string;
  onClick?: () => void;
  clickEffect?: boolean;
  selected?: boolean;
  size?: number;
}
const IconButton = ({
  icon,
  color,
  text,
  className,
  theme = 'light',
  onClick,
  size = 20,
  selected = false,
}: IIconButton) => {
  const leftClassName = `
        left-icon
        rounded-bl-lg 
        rounded-tl-lg 
        border-b 
        border-l 
        border-t 
        border-gray-300
        items-center
        max-w-[60px]
        min-h-[80px]
        ${color}
  `;
  const clickedLeftClassName = `
        left-icon
        rounded-bl-lg 
        rounded-tl-lg 
        border-b-2
        border-l-2
        border-t-2
        border-blue-500
        items-center
        max-w-[60px]
        min-h-[80px]
        ${color}
  `;
  const rightClassName = `
    rounded-tr-lg 
    rounded-br-lg 
    border-t 
    border-r 
    border-b 
    border-gray-300
  `;
  const clickedRightClassName = `
    rounded-tr-lg 
    rounded-br-lg 
    border-t-2
    border-r-2
    border-b-2
    border-blue-500
  `;

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${className}
      icon-button 
    `}
    >
      <div
        className={`${!selected ? leftClassName : clickedLeftClassName}
      `}
      >
        {selected && (
          <Icon size={size} type={icon} theme={theme} leftMargin={false} />
        )}
      </div>
      <div className={`${!selected ? rightClassName : clickedRightClassName}`}>
        {text}
      </div>
    </button>
  );
};
export default IconButton;
