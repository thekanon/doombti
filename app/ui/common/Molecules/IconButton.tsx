import React from 'react';
import Icon from '../Atoms/Icon';
/*
 */
interface IIconButton {
  icon: string;
  color: string;
  text: string;
  theme?: string;
  className?: string;
  onClick?: () => void;
}
const IconButton = ({
  icon,
  color,
  text,
  className,
  theme = 'light',
  onClick,
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
        ${color}
  `;
  const rightClassName = `rounded-tr-lg rounded-br-lg border-t border-r border-b border-gray-300`;
  console.log(icon);
  return (
    <button
      onClick={onClick}
      className={`${className}
      icon-button
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
