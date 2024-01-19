import React from 'react';

// Define the props interface
interface CardProps {
  title: string;
  content: string;
}

// Card functional component
const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="h-18 flex flex-col justify-between rounded-lg bg-indigo-100 p-4 shadow-sm">
      <p className="font-semibold text-indigo-600">{title}</p>
      <p className="text-mg">{content}</p>
    </div>
  );
};

export default Card;
