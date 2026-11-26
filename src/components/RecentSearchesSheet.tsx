import React from 'react';

export const RecentSearchesSheet: React.FC = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="w-full max-w-3xl pointer-events-none">
        <div className="w-full h-12 rsrtc-gradient rounded-t-2xl shadow-[0_-6px_24px_rgba(216,27,96,0.28)] pointer-events-none" />
      </div>
    </div>
  );
};
