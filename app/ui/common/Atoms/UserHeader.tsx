import React from 'react';

type UserHeaderProps = {
  displayName: string;
  email: string;
  onLogout: () => void;
};

const UserHeader: React.FC<UserHeaderProps> = ({
  displayName,
  email,
  onLogout,
}) => {
  return (
    <div className="dashboard-header mb-4 flex items-center justify-between">
      <div>
        <p className="font-semibold">Hi, {displayName}</p>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
      <div>
        <button className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700">
          목표 설정
        </button>
        <button
          className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
          onClick={onLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
