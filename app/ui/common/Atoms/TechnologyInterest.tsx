import React from 'react';

type TechnologyInterestProps = {
  likedTechnology: string | string[];
};

const TechnologyInterest: React.FC<TechnologyInterestProps> = ({
  likedTechnology,
}) => {
  // Function to render the technology or technologies
  const renderTechnology = () => {
    if (Array.isArray(likedTechnology)) {
      return likedTechnology.join(', ');
    }
    return likedTechnology;
  };

  return (
    <div className="mt-3 flex w-full flex-col justify-between rounded-lg bg-indigo-100 p-4 shadow-sm">
      <p className="font-semibold text-indigo-600">관심있는 기술</p>
      <p className="text-mg">{renderTechnology()}</p>
    </div>
  );
};

export default TechnologyInterest;
