import React from 'react';
interface HotTopicProps {
  title: string;
  description: string;
}

const HotTopic: React.FC<HotTopicProps> = ({ title, description }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default HotTopic;
