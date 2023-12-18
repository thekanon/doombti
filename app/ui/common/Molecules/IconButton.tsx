import React, { useState } from 'react';
import Icon from '../Atoms/Icon';

interface IIconButton {
  icon: string;
  color: string;
  text: string;
  theme?: string;
  className?: string;
  onClick?: () => void;
  clickEffect?: boolean;
}
const IconButton = ({
  icon,
  color,
  text,
  className,
  theme = 'light',
  onClick,
  clickEffect = false,
}: IIconButton) => {
  const [isClicked, setIsClicked] = useState(false);

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
        ${color}
  `;
  const rightClassName = `rounded-tr-lg rounded-br-lg border-t border-r border-b border-gray-300`;
  const clickedClass = isClicked ? 'click-effect' : '';

  const handleButtonClick = () => {
    if (clickEffect) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500); // 애니메이션 시간에 맞춰 상태를 초기화
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${className}
      icon-button 
      ${clickEffect ? clickedClass : ''}
    `}
    >
      <div className={`${leftClassName}`}>
        <Icon type={icon} theme={theme} leftMargin={false} />
      </div>
      <div className={`${rightClassName}`}>{text}</div>
    </button>
  );
};
export default IconButton;
