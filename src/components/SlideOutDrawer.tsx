import React, { useEffect } from 'react';
import {
  X,
  Search,
  TrendingUp,
  Building2,
  PhoneCall,
  ClockAlert,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ActiveModalType } from './Header';
import { BrandLogo } from './BrandLogo';

interface SlideOutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchBuses: () => void;
  onPopularRoutes: () => void;
  onSelectModal: (modal: Exclude<ActiveModalType, null>) => void;
}

export const SlideOutDrawer: React.FC<SlideOutDrawerProps> = ({
  isOpen,
  onClose,
  onSearchBuses,
  onPopularRoutes,
  onSelectModal,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'search-buses',
      label: 'Search Buses',
      subtitle: 'Find routes, bus schedules & stop timings',
      icon: <Search className="w-5 h-5 text-[#D81B60]" />,
      onClick: () => {
        onClose();
        onSearchBuses();
      },
    },
    {
      id: 'popular-routes',
      label: 'Popular Routes',
      subtitle: 'Top Rajasthan & NCR bus corridors',
      icon: <TrendingUp className="w-5 h-5 text-[#D81B60]" />,
      onClick: () => {
        onClose();
        onPopularRoutes();
      },
    },
    {
      id: 'all-depots',
      label: 'All 50 Depots',
      subtitle: 'Complete Rajasthan depot directory & codes',
      icon: <Building2 className="w-5 h-5 text-[#D81B60]" />,
      onClick: () => {
        onClose();
        onSelectModal('depots');
      },
    },
    {
      id: 'helpline',
      label: '24x7 Helpline (1800-2000-103)',
      subtitle: 'Toll-free passenger assistance & SOS',
      icon: <PhoneCall className="w-5 h-5 text-[#D81B60]" />,
      onClick: () => {
        onClose();
        onSelectModal('helpline');
      },
    },
    {
      id: 'report-timing',
      label: 'Report / Update Timing',
      subtitle: 'Submit corrected departure or stop times',
      icon: <ClockAlert className="w-5 h-5 text-[#D81B60]" />,
      onClick: () => {
        onClose();
        onSelectModal('report');
      },
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="RSRTC Lifeline navigation drawer"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-[86%] max-w-[340px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Clean Crimson Header */}
          <div className="rsrtc-gradient text-white px-5 py-4 flex items-center justify-between gap-3">
            <BrandLogo size="sm" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation drawer"
              className="min-h-[40px] min-w-[40px] -mr-2 flex items-center justify-center rounded-xl hover:bg-white/15 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav aria-label="Drawer menu" className="py-3 px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className="w-full min-h-[64px] px-3 py-3 flex items-center gap-3.5 rounded-2xl hover:bg-[#FDF2F6] active:bg-[#FCE4EC] transition-colors text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] group-hover:bg-white border border-[#FCE4EC] flex items-center justify-center shrink-0 transition-colors">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900 truncate">
                    {item.label}
                  </span>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D81B60] shrink-0 transition-colors" />
              </button>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Tagline */}
        <div className="p-5 border-t border-[#EAECEF] bg-[#F5F7FA]">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#D81B60] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-900 tracking-wide">
                RSRTC Lifeline - TIMETABLE &amp; ROUTE GUIDE
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Independent Bus Timetable &amp; Route Guide (Not officially affiliated with RSRTC)
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
