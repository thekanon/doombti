import React from 'react';

export interface ProgressBarProps {
  percentage: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color }) => {
  // Tailwind CSS에서는 직접적인 동적 스타일링이 제한적이므로, 인라인 스타일을 사용합니다.
  const progressBarStyle = {
    width: `${percentage < 2 ? 2 : percentage}%`,
    backgroundColor: color || 'black',
    transition: 'width 1s ease-in-out',
  };

  return (
    <div className="h-2.5 w-full rounded bg-gray-300">
      <div style={progressBarStyle} className="h-full rounded"></div>
    </div>
  );
};

export default ProgressBar;
