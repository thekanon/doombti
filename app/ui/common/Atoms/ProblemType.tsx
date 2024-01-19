import React from 'react';

// Define the props type
type ProblemTypeProps = {
  problemTypes: string[];
};

const ProblemType: React.FC<ProblemTypeProps> = ({ problemTypes }) => {
  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-2 font-semibold">문제 유형</h2>
      <div className="flex flex-wrap">
        {problemTypes.map((type, index) => (
          <span
            key={index}
            className="m-1.5 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-600"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProblemType;
