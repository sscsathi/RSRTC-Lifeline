import React from 'react';

interface BrandLogoProps {
  /** Compact height in pixels for the icon badge (32–40px recommended) */
  size?: 'sm' | 'md';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
}) => {
  const iconHeightClass = size === 'sm' ? 'h-8 w-auto' : 'h-8 sm:h-9 w-auto';
  const titleSizeClass =
    size === 'sm' ? 'text-[17px] leading-none' : 'text-[18px] sm:text-[21px] leading-none';

  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 select-none shrink-0">
      {/* Glowing Bus-Lifeline Emblem extracted from brand reference */}
      <svg
        viewBox="0 0 144 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconHeightClass} shrink-0 drop-shadow-[0_0_10px_rgba(255,224,178,0.55)]`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rsrtcBadgeGrad" x1="12" y1="78" x2="134" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFAD52" />
            <stop offset="48%" stopColor="#FFD6A0" />
            <stop offset="82%" stopColor="#FFF6EA" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="rsrtcStreakGrad" x1="0" y1="50" x2="34" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFAE52" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFC77D" stopOpacity="0.95" />
          </linearGradient>
          <clipPath id="rsrtcBadgeClip">
            <rect x="18" y="8" width="118" height="80" rx="18" />
          </clipPath>
        </defs>

        {/* Speed Streaks trailing on the left */}
        <path
          d="M6 41L24 39.5V42.5L6 41Z"
          fill="url(#rsrtcStreakGrad)"
        />
        <path
          d="M1 52L24 50.2V53.8L1 52Z"
          fill="url(#rsrtcStreakGrad)"
        />
        <path
          d="M8 62.5L24 61.2V63.8L8 62.5Z"
          fill="url(#rsrtcStreakGrad)"
        />

        {/* Glowing Rounded Pill Badge */}
        <rect
          x="18"
          y="8"
          width="118"
          height="80"
          rx="18"
          fill="url(#rsrtcBadgeGrad)"
        />

        {/* Deep Crimson Bus Silhouette + Heartbeat Lifeline Cutout */}
        <g clipPath="url(#rsrtcBadgeClip)">
          {/* Bus Outer Shell Outline */}
          <path
            d="M16 25H106C116 25 123 31 125 41L128.5 60C129.5 66 125.5 72 119 72H106"
            stroke="#9E1142"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Side Mirror Arm */}
          <path
            d="M123 36H129C131 36 132 37.5 132.5 40L133.5 46"
            stroke="#9E1142"
            strokeWidth="3.6"
            strokeLinecap="round"
          />

          {/* Bus Upper Window Band (split cleanly around heartbeat peak) */}
          <path
            d="M23 33C23 30.8 24.8 29 27 29H49L46.5 45H27C24.8 45 23 43.2 23 41V33Z"
            fill="#9E1142"
          />
          <path
            d="M63 29H104C111.5 29 116.5 33 118.2 40.5L121.5 55.5C121.9 57.5 120.2 58.5 118.3 58C107 55 98 48 89 45.5H65.5L63 29Z"
            fill="#9E1142"
          />

          {/* Front Headlight Accent */}
          <path
            d="M116 63.5C119.5 64 122.5 63.2 124.5 61.5"
            stroke="#9E1142"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Lower Chassis Line Segments */}
          <path
            d="M18 72H27"
            stroke="#9E1142"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M47 72H56"
            stroke="#9E1142"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M72 72H86"
            stroke="#9E1142"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Rear Wheel */}
          <circle
            cx="37"
            cy="72"
            r="9.5"
            fill="url(#rsrtcBadgeGrad)"
            stroke="#9E1142"
            strokeWidth="4.2"
          />
          <circle cx="37" cy="72" r="3.4" fill="#9E1142" />

          {/* Front Wheel */}
          <circle
            cx="96"
            cy="72"
            r="9.5"
            fill="url(#rsrtcBadgeGrad)"
            stroke="#9E1142"
            strokeWidth="4.2"
          />
          <circle cx="96" cy="72" r="3.4" fill="#9E1142" />

          {/* Dramatic ECG Lifeline Heartbeat Pulse across bus */}
          <path
            d="M16 55H43L47.5 47.5L51.5 60.5L57 20L63.5 76L69.5 47.5L73.5 55H91"
            stroke="#9E1142"
            strokeWidth="4.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interior Left Motion Cutouts */}
          <path
            d="M18 50H35"
            stroke="#9E1142"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M18 61.5H27"
            stroke="#9E1142"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Brand Wordmark matching the attached typography */}
      <span className="flex flex-col justify-center min-w-0">
        <span className={`${titleSizeClass} tracking-tight whitespace-nowrap flex items-baseline gap-1.5`}>
          <span className="font-extrabold text-white">RSRTC</span>
          <span className="font-semibold text-[#FFB566]">Lifeline</span>
        </span>
        {showSubtitle && (
          <span className="text-[8.5px] sm:text-[9px] font-medium tracking-[0.22em] text-white/85 uppercase whitespace-nowrap mt-1 leading-none">
            TIMETABLE &amp; ROUTE GUIDE
          </span>
        )}
      </span>
    </span>
  );
};
