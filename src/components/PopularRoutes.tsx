import React from 'react';
import { ArrowLeftRight, ArrowRight, ChevronRight } from 'lucide-react';
import { POPULAR_ROUTES, PopularRoute } from '../data/rsrtcData';

interface PopularRoutesProps {
  onSelectRoute: (route: PopularRoute) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  return (
    <section
      id="popular-routes-section"
      aria-labelledby="popular-routes-heading"
      className="max-w-5xl mx-auto px-4 sm:px-6 mt-9 sm:mt-11 pb-24"
    >
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2
            id="popular-routes-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
          >
            Popular Rajasthan Routes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tap any corridor for instant bus timetables and stop schedules
          </p>
        </div>
        <span className="hidden sm:inline text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
          Direct Depot Schedules
        </span>
      </div>

      {/* Horizontal swipe on small screens, clean 3-column grid on desktop */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
        {POPULAR_ROUTES.map((route) => (
          <button
            key={route.id}
            type="button"
            onClick={() => onSelectRoute(route)}
            className="rsrtc-card shrink-0 w-[264px] sm:w-auto snap-start p-4 sm:p-5 text-left hover:border-[#D81B60]/40 hover:shadow-[0_12px_28px_rgba(216,27,96,0.1)] active:scale-[0.99] transition-all group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D81B60]"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base font-bold text-slate-900 truncate group-hover:text-[#C2185B] transition-colors">
                  {route.fromName}
                </span>
                <ArrowLeftRight
                  className="w-3.5 h-3.5 text-[#D81B60] shrink-0"
                  strokeWidth={2.3}
                />
                <span className="text-base font-bold text-slate-900 truncate group-hover:text-[#C2185B] transition-colors">
                  {route.toName}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D81B60] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs text-slate-500 mt-1.5 truncate">{route.highlight}</p>

            <div className="mt-4 pt-3 border-t border-[#EAECEF] flex items-center justify-between gap-2">
              <div className="text-xs text-slate-500 tabular-nums">
                <span className="font-semibold text-slate-700">{route.dailyBuses} buses</span>
                <span aria-hidden="true"> · </span>
                <span>{route.avgDuration}</span>
              </div>
              <span className="text-xs font-bold text-[#C2185B] inline-flex items-center gap-1 shrink-0 whitespace-nowrap group-hover:translate-x-0.5 transition-transform">
                <span>View Timetable</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Passenger Highlights Strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#EAECEF] pt-7">
        <div>
          <p className="text-sm font-bold text-slate-900">Stop-by-Stop Timetables</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Departure times, intermediate halts, and boarding stand details across Rajasthan corridors.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">All 50 Connected Depots</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Schedules covering Sindhi Camp, Deeg, Bharatpur, Jodhpur, Udaipur, Kota &amp; NCR.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">24x7 Passenger Control Room</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Toll-free assistance at <span className="font-mono font-semibold text-slate-700">1800-2000-103</span> for route and schedule enquiries.
          </p>
        </div>
      </div>
    </section>
  );
};
