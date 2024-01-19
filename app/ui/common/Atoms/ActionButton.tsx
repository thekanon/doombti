import React from 'react';

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  // Default button classes
  const defaultClasses =
    'mt-6 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50';

  // Combine default classes with any custom classes passed via props
  const buttonClasses = `${defaultClasses} ${className || ''}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
