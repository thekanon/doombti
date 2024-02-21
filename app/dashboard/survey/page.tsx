import React from 'react';

const SurveyPage = () => {
  return (
    <div className="dashboard-container flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        유튜브를 하고계신가요?
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary">네</button>
          <button className="btn btn-primary">아니요</button>
        </div>
        출퇴근 시간이 왕복 3시간 이상 소요되시나요?
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary">네</button>
          <button className="btn btn-primary">아니요</button>
        </div>
        재택근무 경험이 있으신가요?
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary">네</button>
          <button className="btn btn-primary">아니요</button>
        </div>
        10년 이상 장기연애 경험이 있으신가요?
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary">네</button>
          <button className="btn btn-primary">아니요</button>
        </div>
        강아지를 키우고 계신가요?
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary">네</button>
          <button className="btn btn-primary">아니요</button>
        </div>
        고양이를 키우고 계신가요?
        <div className="flex flex-col space-y-2">
          <button className="btn btn-primary">네</button>
          <button className="btn btn-primary">아니요</button>
        </div>
      </div>
    </div>
  );
};
export default SurveyPage;
