import React from 'react';
import { Menu, PhoneCall } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type ActiveModalType = null | 'helpline' | 'depots' | 'report';

interface HeaderProps {
  onOpenDrawer: () => void;
  onGoHome: () => void;
  onPopularRoutes: () => void;
  onOpenModal: (modal: Exclude<ActiveModalType, null>) => void;
  activeView: 'home' | 'results';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onGoHome,
  onPopularRoutes,
  onOpenModal,
  activeView,
}) => {
  return (
    <header className="sticky top-0 z-40 rsrtc-gradient text-white shadow-[0_4px_20px_rgba(216,27,96,0.25)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Left Zone: Hamburger Menu + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDrawer}
            aria-label="Open navigation menu"
            className="min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center rounded-xl text-white/95 hover:bg-white/15 active:scale-95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <Menu className="w-5 h-5" strokeWidth={2.25} />
          </button>

          <button
            type="button"
            onClick={onGoHome}
            aria-label="RSRTC Lifeline Home"
            className="flex items-center text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-lg py-1"
          >
            <BrandLogo size="md" />
          </button>
        </div>

        {/* Center Zone (Desktop): Search Buses, Popular Routes, All 50 Depots */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-white/90"
        >
          <button
            type="button"
            onClick={onGoHome}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
              activeView === 'home'
                ? 'border-white text-white font-semibold'
                : 'border-transparent hover:border-white/50 hover:text-white'
            }`}
          >
            Search Buses
          </button>
          <button
            type="button"
            onClick={onPopularRoutes}
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-white/60 hover:text-white transition-colors cursor-pointer"
          >
            Popular Routes
          </button>
          <button
            type="button"
            onClick={() => onOpenModal('depots')}
            className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-white/60 hover:text-white transition-colors cursor-pointer"
          >
            All 50 Depots
          </button>
        </nav>

        {/* Right Zone: 24x7 Helpline Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal('helpline')}
            aria-label="24x7 Helpline"
            title="24x7 Helpline · 1800-2000-103"
            className="min-h-[40px] px-3.5 sm:px-4 flex items-center justify-center gap-2 rounded-full bg-white text-[#C2185B] hover:bg-[#FDF2F6] font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-white"
          >
            <PhoneCall className="w-4 h-4 shrink-0" strokeWidth={2.25} />
            <span>24x7 Helpline</span>
          </button>
        </div>
      </div>
    </header>
  );
};
