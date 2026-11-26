import React from 'react';

const RajasthanWelcomeEmblem: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 shrink-0 drop-shadow-[0_1px_3px_rgba(136,14,79,0.35)]"
    aria-hidden="true"
  >
    <defs>
      <clipPath id="rajasthan-welcome-emblem-clip">
        <circle cx="32" cy="32" r="29" />
      </clipPath>
      <linearGradient id="desert-sky-bg" x1="32" y1="3" x2="32" y2="61" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="58%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
      <linearGradient id="bandhej-turban-grad" x1="12" y1="13" x2="36" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E11D48" />
        <stop offset="55%" stopColor="#B91C1C" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
    </defs>

    {/* Warm Cream / Desert Base */}
    <circle cx="32" cy="32" r="29.5" fill="url(#desert-sky-bg)" />

    <g clipPath="url(#rajasthan-welcome-emblem-clip)">
      {/* Subtle Golden Sun */}
      <circle cx="48" cy="17" r="6.2" fill="#FCD34D" opacity="0.72" />

      {/* Background Desert Sand Dunes */}
      <path
        d="M2 45 C14 39, 25 40, 36 44 C46 47, 55 41, 62 43 L62 63 L2 63 Z"
        fill="#F3CA7A"
      />
      <path
        d="M2 52 C17 47, 32 51, 47 48 C54 46.5, 59 48, 62 49 L62 63 L2 63 Z"
        fill="#E0A955"
      />

      {/* Camel Standing Behind in Right/Mid-ground */}
      <g>
        {/* Camel Legs */}
        <path
          d="M39.5 41 L38.5 53 M42.8 41.5 L42.4 53.5 M50.2 41 L49.6 53.5 M52.8 40.5 L53.8 53"
          stroke="#8C4A1C"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        {/* Camel Tail */}
        <path
          d="M54.2 35.5 C56.5 36.5, 57.2 39.5, 56.6 42"
          stroke="#7C3F16"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Camel Body, Hump, Neck & Head */}
        <path
          d="M36 37.5 C36.5 34.8, 39.5 34, 41.8 31.8 C43.8 29.8, 45.2 27.5, 47.4 27.8 C49.6 28.1, 50.8 30.8, 52.8 33 C54.5 34.8, 55.2 37.8, 54 40.5 C52.7 42.5, 48.2 42.6, 44 42.4 C39.5 42.2, 36.2 40.5, 36 37.5 Z"
          fill="#9E5522"
        />
        {/* Camel Neck & Proud Head */}
        <path
          d="M38.2 37.5 C36.2 36, 35.2 33.4, 35.4 29.6 C35.6 26.8, 36.6 24.4, 38.6 23.6 C40 23, 41.6 23.3, 42.4 24.2 C43 24.9, 42.5 26, 41.3 26.3 L39.4 26.7 C38.6 28.4, 38.8 31.4, 40.4 33.8 Z"
          fill="#9E5522"
        />
        {/* Camel Ear */}
        <path d="M38.2 23.6 L37.7 21.8 L39.3 23.1 Z" fill="#8C4A1C" />

        {/* Decorative Crimson & Gold Saddle (Jhool) on Hump */}
        <path
          d="M42.2 31.8 C44.2 28.6, 48.8 28.5, 51.2 32.2 L51.8 37.8 C48.4 39.1, 44.6 39, 41.6 37.4 Z"
          fill="#C2185B"
          stroke="#FDE68A"
          strokeWidth="1.1"
        />
        {/* Gold Diamond Accent on Saddle */}
        <path d="M46.7 31.7 L48.5 34 L46.7 36.3 L44.9 34 Z" fill="#FBBF24" />

        {/* Decorative Bridle & Neck Tassel */}
        <path
          d="M41.7 25.1 C40.2 25.6, 38.6 26.1, 36.6 26.4 M37.2 26.5 C36.6 29.5, 38.6 32.4, 41.8 33.8"
          stroke="#FDE68A"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <circle cx="37.4" cy="31.2" r="1.2" fill="#E11D48" />
        <circle cx="39.3" cy="33.1" r="1.1" fill="#FBBF24" />
      </g>

      {/* Traditional Rajasthani Man in Foreground (Left-Center) */}
      <g>
        {/* Turban Tail (Shimla) Flowing Behind Shoulder */}
        <path
          d="M15.5 26 C12.8 30.5, 11.4 36.5, 12.2 42.5 L16.2 41 C15.8 36, 16.6 31.5, 18.2 27.5 Z"
          fill="#9F1239"
        />
        <path
          d="M13.5 34.5 L15.6 33.8 M13 38.5 L15.4 37.8"
          stroke="#FDE68A"
          strokeWidth="0.95"
        />

        {/* White Kurta Shoulders & Torso */}
        <path
          d="M7 63 C7.8 52.8, 12.6 46.8, 19.6 45.2 L29.2 45.2 C36.2 46.8, 40.8 52.8, 41.6 63 Z"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        {/* Kurta Collar & Center Placket */}
        <path
          d="M19.8 45.4 L24.4 51.6 L29 45.4 M24.4 51.6 L24.4 61.5"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neck */}
        <rect x="21.4" y="40.5" width="6" height="6.2" rx="2.5" fill="#C98254" />

        {/* Traditional Bead Necklace (Mala) */}
        <path
          d="M18.4 46.5 C20.4 53.8, 28.4 53.8, 30.4 46.5"
          stroke="#B45309"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="19.3" cy="48.8" r="1.25" fill="#DC2626" />
        <circle cx="21.3" cy="51.1" r="1.25" fill="#FBBF24" />
        <circle cx="24.4" cy="52.1" r="1.45" fill="#DC2626" stroke="#FDE68A" strokeWidth="0.6" />
        <circle cx="27.5" cy="51.1" r="1.25" fill="#FBBF24" />
        <circle cx="29.5" cy="48.8" r="1.25" fill="#DC2626" />

        {/* Ears */}
        <circle cx="16.5" cy="33.5" r="2.1" fill="#D28B5C" />
        <circle cx="32.3" cy="33.5" r="2.1" fill="#D28B5C" />
        {/* Tiny Gold Stud Earrings */}
        <circle cx="16.3" cy="34.8" r="0.7" fill="#FBBF24" />
        <circle cx="32.5" cy="34.8" r="0.7" fill="#FBBF24" />

        {/* Face */}
        <path
          d="M17.2 29.5 C17.2 25.5, 31.6 25.5, 31.6 29.5 L31.2 35.8 C30.8 40.2, 28 43.2, 24.4 43.2 C20.8 43.2, 18 40.2, 17.6 35.8 Z"
          fill="#DE996B"
        />

        {/* Forehead Tilak */}
        <path
          d="M24.4 27.6 L24.4 30.2"
          stroke="#DC2626"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <circle cx="24.4" cy="27.5" r="0.65" fill="#FDE68A" />

        {/* Eyes & Eyebrows */}
        <path
          d="M19.8 31.3 Q21.3 30.4 22.8 31.2 M26 31.2 Q27.5 30.4 29 31.3"
          stroke="#291D16"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <circle cx="21.3" cy="33.1" r="1.05" fill="#1F1612" />
        <circle cx="27.5" cy="33.1" r="1.05" fill="#1F1612" />

        {/* Subtle Nose & Warm Smile */}
        <path
          d="M24.4 33.4 L24.1 35.9 L25 36.1"
          stroke="#B87043"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.2 39.7 Q24.4 41.1 26.6 39.7"
          stroke="#8C3B2B"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Classic Curled Rajasthani Moustache */}
        <path
          d="M24.4 37.3 C22.5 36.5, 19.6 37.2, 17.3 38.4 C15.2 39.5, 13.6 38.1, 14.3 36.4 C14.8 35.4, 16 35.7, 15.8 36.6"
          stroke="#1C1917"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24.4 37.3 C26.3 36.5, 29.2 37.2, 31.5 38.4 C33.6 39.5, 35.2 38.1, 34.5 36.4 C34 35.4, 32.8 35.7, 33 36.6"
          stroke="#1C1917"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
        />

        {/* Red-and-Gold Bandhej Turban (Safa) */}
        <path
          d="M14.2 28.4 C12.5 23.2, 14.8 16.4, 21.4 14.3 C26.6 12.7, 32.8 15.2, 34.6 21.2 C35.5 24.2, 34.6 27.4, 32.4 29.3 C28.5 26.7, 20.3 26.7, 16.4 29.3 C15.4 29.2, 14.6 28.9, 14.2 28.4 Z"
          fill="url(#bandhej-turban-grad)"
        />
        {/* Turban Fold Lines & Gold Zari Stripes */}
        <path
          d="M15.6 25.4 C20 21.2, 26.8 18.6, 33.4 20.4"
          stroke="#FBBF24"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M16.2 20.5 C20.4 17.2, 26.6 15.6, 31.8 17.5"
          stroke="#FDE68A"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M16.6 28 C21 25.2, 27.6 25.2, 32.1 28"
          stroke="#F59E0B"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Bandhej Tie-Dye White & Gold Dots */}
        <circle cx="19.5" cy="18.2" r="0.8" fill="#FEF3C7" />
        <circle cx="23.5" cy="16.5" r="0.8" fill="#FEF3C7" />
        <circle cx="27.6" cy="16.2" r="0.8" fill="#FEF3C7" />
        <circle cx="22.1" cy="22.4" r="0.8" fill="#FEF3C7" />
        <circle cx="26.8" cy="21.4" r="0.8" fill="#FEF3C7" />
        <circle cx="30.8" cy="23.2" r="0.8" fill="#FEF3C7" />
        {/* Royal Turban Kalgi (Plume Accent) */}
        <path
          d="M28.2 15.1 C29.8 12.2, 32.6 11.4, 33.8 13.1 C32.2 14.2, 30.6 15.1, 29.2 15.8 Z"
          fill="#FDE68A"
          stroke="#D97706"
          strokeWidth="0.6"
        />
      </g>
    </g>

    {/* Subtle Gold/Cream Outer & Inner Medallion Borders */}
    <circle cx="32" cy="32" r="29.5" fill="none" stroke="#FDE68A" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="27.3" fill="none" stroke="#D97706" strokeOpacity="0.28" strokeWidth="0.8" />
  </svg>
);

export const RecentSearchesSheet: React.FC = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none select-none"
      role="presentation"
    >
      <div className="w-full h-12 px-4 rsrtc-gradient rounded-none shadow-[0_-4px_20px_rgba(216,27,96,0.28)] flex items-center justify-center gap-3 pointer-events-none select-none">
        <RajasthanWelcomeEmblem />
        <span className="font-heritage-hindi text-[#FFFDF7] text-[17px] sm:text-[18px] leading-none tracking-[0.04em] whitespace-nowrap">
          पधारो म्हारे देश • राजस्थान
        </span>
      </div>
    </div>
  );
};
