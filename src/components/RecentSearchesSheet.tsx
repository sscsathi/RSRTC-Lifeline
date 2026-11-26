import React, { useEffect } from 'react';
import { ChevronUp, ChevronDown, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { RecentSearch, formatIsoDateParts } from '../data/rsrtcData';

interface RecentSearchesSheetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  searches: RecentSearch[];
  onSelectSearch: (search: RecentSearch) => void;
  onClearAll: () => void;
}

export const RecentSearchesSheet: React.FC<RecentSearchesSheetProps> = ({
  isOpen,
  onToggle,
  onClose,
  searches,
  onSelectSearch,
  onClearAll,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop when expanded */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Pull-Up Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
        role="region"
        aria-label="Recent bus route searches"
      >
        <div className="w-full max-w-3xl pointer-events-auto">
          {/* Crimson-Magenta Pull-Up Handle Bar */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full h-12 px-5 rsrtc-gradient text-white rounded-t-2xl shadow-[0_-6px_24px_rgba(216,27,96,0.28)] flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-white/90" strokeWidth={2.2} />
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                Recent Searches
              </span>
              <span className="text-xs font-semibold text-white/80 tabular-nums">
                ({searches.length})
              </span>
            </div>

            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              {isOpen ? (
                <ChevronDown className="w-4 h-4 text-white" strokeWidth={2.5} />
              ) : (
                <ChevronUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              )}
            </span>
          </button>

          {/* Expanded Sheet Content */}
          {isOpen && (
            <div className="bg-white border-x border-[#EAECEF] max-h-[60vh] overflow-y-auto shadow-2xl">
              <div className="px-5 py-3 bg-[#FAFBFD] border-b border-[#EAECEF] flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-500">
                  Tap any route to search buses immediately
                </p>
                {searches.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="text-xs font-semibold text-[#C2185B] hover:text-[#980F43] inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#FDF2F6] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              {searches.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm font-semibold text-slate-800">
                    No recent route searches yet
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Routes you search will appear here for one-tap access.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[#EAECEF]">
                  {searches.map((item) => {
                    const parts = formatIsoDateParts(item.dateIso);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => onSelectSearch(item)}
                          className="w-full min-h-[64px] px-5 py-3.5 flex items-center justify-between gap-4 text-left hover:bg-[#FDF2F6]/70 active:bg-[#FCE4EC]/70 transition-colors group cursor-pointer"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#C2185B] transition-colors">
                              <span className="truncate">{item.fromName}</span>
                              <ArrowRight className="w-4 h-4 text-[#D81B60] shrink-0" />
                              <span className="truncate">{item.toName}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                              {parts.fullLabel}
                              <span aria-hidden="true"> · </span>
                              {item.busFilter === 'All' ? 'All Buses' : item.busFilter}
                              <span aria-hidden="true"> · </span>
                              {item.searchedAt}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-[#D81B60] shrink-0 whitespace-nowrap">
                            Re-search
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
