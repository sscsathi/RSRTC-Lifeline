import React, { useState, useRef, useEffect } from 'react';
import {
  Building2,
  MapPin,
  ArrowUpDown,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import {
  CITY_HUBS,
  CityHub,
  BusFilterOption,
  formatIsoDateParts,
  shiftIsoDate,
  getCityById,
} from '../data/rsrtcData';

const BUS_FILTERS: BusFilterOption[] = [
  'All',
  'Ordinary',
  'Express',
  'Deluxe',
  'Volvo AC',
  'Sleeper',
];

interface SearchWidgetProps {
  fromId: string;
  toId: string;
  dateIso: string;
  todayIso: string;
  busFilter: BusFilterOption;
  onChangeFrom: (id: string) => void;
  onChangeTo: (id: string) => void;
  onSwapCities: () => void;
  onChangeDate: (iso: string) => void;
  onChangeBusFilter: (filter: BusFilterOption) => void;
  onSearch: () => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  fromId,
  toId,
  dateIso,
  todayIso,
  busFilter,
  onChangeFrom,
  onChangeTo,
  onSwapCities,
  onChangeDate,
  onChangeBusFilter,
  onSearch,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'from' | 'to' | 'calendar' | null>(null);
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [swapTurns, setSwapTurns] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const [y, m] = dateIso.split('-').map(Number);
    return { year: y, month: (m || 11) - 1 };
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const fromCity = getCityById(fromId);
  const toCity = getCityById(toId);
  const dateParts = formatIsoDateParts(dateIso);
  const tomorrowIso = shiftIsoDate(todayIso, 1);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwapClick = () => {
    setSwapTurns((t) => t + 1);
    onSwapCities();
    setOpenDropdown(null);
  };

  const filterCities = (query: string, excludeId?: string): CityHub[] => {
    const q = query.trim().toLowerCase();
    return CITY_HUBS.filter((city) => {
      if (excludeId && city.id === excludeId) return false;
      if (!q) return true;
      return (
        city.name.toLowerCase().includes(q) ||
        city.stand.toLowerCase().includes(q) ||
        city.code.toLowerCase().includes(q)
      );
    });
  };

  const handleSelectCity = (field: 'from' | 'to', city: CityHub) => {
    if (field === 'from') {
      if (city.id === toId) {
        onSwapCities();
      } else {
        onChangeFrom(city.id);
      }
      setFromQuery('');
    } else {
      if (city.id === fromId) {
        onSwapCities();
      } else {
        onChangeTo(city.id);
      }
      setToQuery('');
    }
    setOpenDropdown(null);
  };

  // Calendar grid helpers
  const firstDayOfMonth = new Date(calendarMonth.year, calendarMonth.month, 1);
  const daysInMonth = new Date(calendarMonth.year, calendarMonth.month + 1, 0).getDate();
  const startWeekday = firstDayOfMonth.getDay();
  const monthLabel = firstDayOfMonth.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  const shiftCalendarMonth = (delta: number) => {
    const next = new Date(calendarMonth.year, calendarMonth.month + delta, 1);
    setCalendarMonth({ year: next.getFullYear(), month: next.getMonth() });
  };

  return (
    <section className="relative">
      {/* Curved Crimson-Magenta Hero Backdrop */}
      <div className="rsrtc-gradient pt-6 pb-28 sm:pt-9 sm:pb-32 px-4 sm:px-6 rounded-b-[28px] sm:rounded-b-[36px]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-tight [text-wrap:balance]">
              Where would you like to go?
            </h1>
            <p className="text-white/85 text-sm sm:text-base mt-1.5 font-medium">
              Safe, Reliable &amp; Fast Bus Services Across Rajasthan &amp; Beyond
            </p>
          </div>
        </div>
      </div>

      {/* Floating Search Card overlapping Hero Backdrop */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 -mt-22 sm:-mt-24">
        <div className="rsrtc-card relative px-4 pt-5 pb-11 sm:px-7 sm:pt-6 sm:pb-12">
          {/* Top Inputs Grid: Responsive 1-col on mobile, 2-col on desktop with centered/right swap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
            {/* From & To Combined Input Block */}
            <div className="lg:col-span-7 relative rounded-2xl border border-[#EAECEF] bg-[#FAFBFD]">
              {/* FROM Input */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(openDropdown === 'from' ? null : 'from');
                    setFromQuery('');
                  }}
                  className="w-full min-h-[72px] px-4 py-3.5 pr-16 flex items-center gap-3.5 text-left rounded-t-2xl hover:bg-white/90 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D81B60]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] border border-[#FCE4EC] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[#D81B60]" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-slate-500">
                      Leaving From
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-base sm:text-lg font-bold text-slate-900 truncate">
                        {fromCity.name}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-400 shrink-0">
                        {fromCity.code}
                      </span>
                    </div>
                    <span className="block text-xs text-slate-500 truncate mt-0.5">
                      {fromCity.stand}
                    </span>
                  </div>
                </button>

                {/* From Auto-complete Dropdown */}
                {openDropdown === 'from' && (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-2xl border border-[#EAECEF] shadow-[0_16px_40px_rgba(15,23,42,0.14)] overflow-hidden">
                    <div className="p-3 border-b border-[#EAECEF] bg-[#FAFBFD]">
                      <input
                        type="text"
                        autoFocus
                        value={fromQuery}
                        onChange={(e) => setFromQuery(e.target.value)}
                        placeholder="Search all 50 Rajasthan districts (e.g., Jaipur, Deeg, Pali)..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAECEF] rounded-xl focus:outline-none focus:border-[#D81B60] focus:ring-2 focus:ring-[#D81B60]/15"
                      />
                    </div>
                    <ul className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {filterCities(fromQuery).map((city) => {
                        const isSelected = city.id === fromId;
                        return (
                          <li key={city.id}>
                            <button
                              type="button"
                              onClick={() => handleSelectCity('from', city)}
                              className={`w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#FDF2F6] transition-colors cursor-pointer ${
                                isSelected ? 'bg-[#FDF2F6]/70' : ''
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-slate-900">
                                    {city.name}
                                  </span>
                                  <span className="text-xs font-mono text-slate-400">
                                    {city.code}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                  {city.stand} · {city.state}
                                </p>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[#D81B60] shrink-0" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                      {filterCities(fromQuery).length === 0 && (
                        <li className="px-4 py-6 text-center text-sm text-slate-500">
                          No matching Rajasthan bus hub found.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Clean Hairline Divider + Floating Circular Swap Button on Right Edge */}
              <div className="relative h-px bg-[#EAECEF] mx-4">
                <button
                  type="button"
                  onClick={handleSwapClick}
                  aria-label="Swap departure and destination cities"
                  title="Swap cities"
                  style={{ transform: `translateY(-50%) rotate(${swapTurns * 180}deg)` }}
                  className="absolute right-1 top-1/2 z-20 w-11 h-11 rounded-full bg-white border-2 border-[#D81B60] text-[#D81B60] shadow-[0_6px_16px_rgba(216,27,96,0.18)] hover:bg-[#FDF2F6] active:scale-95 flex items-center justify-center transition-all duration-300 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D81B60]"
                >
                  <ArrowUpDown className="w-4 h-4" strokeWidth={2.4} />
                </button>
              </div>

              {/* TO Input */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(openDropdown === 'to' ? null : 'to');
                    setToQuery('');
                  }}
                  className="w-full min-h-[72px] px-4 py-3.5 pr-16 flex items-center gap-3.5 text-left rounded-b-2xl hover:bg-white/90 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D81B60]"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-slate-700" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-slate-500">
                      Going To
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-base sm:text-lg font-bold text-slate-900 truncate">
                        {toCity.name}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-400 shrink-0">
                        {toCity.code}
                      </span>
                    </div>
                    <span className="block text-xs text-slate-500 truncate mt-0.5">
                      {toCity.stand}
                    </span>
                  </div>
                </button>

                {/* To Auto-complete Dropdown */}
                {openDropdown === 'to' && (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-2xl border border-[#EAECEF] shadow-[0_16px_40px_rgba(15,23,42,0.14)] overflow-hidden">
                    <div className="p-3 border-b border-[#EAECEF] bg-[#FAFBFD]">
                      <input
                        type="text"
                        autoFocus
                        value={toQuery}
                        onChange={(e) => setToQuery(e.target.value)}
                        placeholder="Search all 50 Rajasthan districts (e.g., Bharatpur, Udaipur)..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#EAECEF] rounded-xl focus:outline-none focus:border-[#D81B60] focus:ring-2 focus:ring-[#D81B60]/15"
                      />
                    </div>
                    <ul className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {filterCities(toQuery).map((city) => {
                        const isSelected = city.id === toId;
                        return (
                          <li key={city.id}>
                            <button
                              type="button"
                              onClick={() => handleSelectCity('to', city)}
                              className={`w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#FDF2F6] transition-colors cursor-pointer ${
                                isSelected ? 'bg-[#FDF2F6]/70' : ''
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-slate-900">
                                    {city.name}
                                  </span>
                                  <span className="text-xs font-mono text-slate-400">
                                    {city.code}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                  {city.stand} · {city.state}
                                </p>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[#D81B60] shrink-0" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                      {filterCities(toQuery).length === 0 && (
                        <li className="px-4 py-6 text-center text-sm text-slate-500">
                          No matching destination found.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Journey Date Picker Block */}
            <div className="lg:col-span-5 relative rounded-2xl border border-[#EAECEF] bg-[#FAFBFD] p-4 flex flex-col justify-between gap-3">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === 'calendar' ? null : 'calendar')
                  }
                  className="flex items-center gap-3.5 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D81B60] rounded-xl flex-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] border border-[#FCE4EC] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#D81B60]" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-slate-500">
                      Journey Date
                    </span>
                    <div className="flex items-center gap-2.5 mt-1">
                      <span className="text-3xl font-extrabold text-slate-900 leading-none tabular-nums group-hover:text-[#D81B60] transition-colors">
                        {dateParts.dayNum}
                      </span>
                      <div className="leading-tight">
                        <span className="block text-sm font-bold text-slate-800">
                          {dateParts.dayShort}, {dateParts.monthShort}
                        </span>
                        <span className="block text-xs text-slate-500 tabular-nums">
                          {dateParts.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === 'calendar' ? null : 'calendar')
                  }
                  className="text-xs font-semibold text-[#D81B60] hover:text-[#B0124D] px-2.5 py-1.5 rounded-lg hover:bg-[#FDF2F6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Change
                </button>
              </div>

              {/* Quick Select Buttons: Today & Tomorrow */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#EAECEF]">
                <button
                  type="button"
                  onClick={() => {
                    onChangeDate(todayIso);
                    setOpenDropdown(null);
                  }}
                  className={`flex-1 min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    dateIso === todayIso
                      ? 'bg-[#D81B60] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-[#EAECEF] hover:border-[#D81B60]/40 hover:text-[#D81B60]'
                  }`}
                >
                  Today · {formatIsoDateParts(todayIso).dayNum}{' '}
                  {formatIsoDateParts(todayIso).monthShort}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeDate(tomorrowIso);
                    setOpenDropdown(null);
                  }}
                  className={`flex-1 min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    dateIso === tomorrowIso
                      ? 'bg-[#D81B60] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-[#EAECEF] hover:border-[#D81B60]/40 hover:text-[#D81B60]'
                  }`}
                >
                  Tomorrow · {formatIsoDateParts(tomorrowIso).dayNum}{' '}
                  {formatIsoDateParts(tomorrowIso).monthShort}
                </button>
              </div>

              {/* Interactive Calendar Popover */}
              {openDropdown === 'calendar' && (
                <div className="absolute right-0 left-0 sm:left-auto sm:w-[310px] top-[calc(100%+8px)] z-30 bg-white rounded-2xl border border-[#EAECEF] shadow-[0_16px_40px_rgba(15,23,42,0.16)] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => shiftCalendarMonth(-1)}
                      aria-label="Previous month"
                      className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-slate-900">{monthLabel}</span>
                    <button
                      type="button"
                      onClick={() => shiftCalendarMonth(1)}
                      aria-label="Next month"
                      className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                      <span key={d} className="text-[11px] font-semibold text-slate-400 py-1">
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startWeekday }).map((_, idx) => (
                      <div key={`empty-${idx}`} />
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const iso = `${calendarMonth.year}-${String(
                        calendarMonth.month + 1
                      ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isSelected = iso === dateIso;
                      const isPast = iso < todayIso;
                      return (
                        <button
                          key={iso}
                          type="button"
                          disabled={isPast}
                          onClick={() => {
                            onChangeDate(iso);
                            setOpenDropdown(null);
                          }}
                          className={`h-9 rounded-lg text-xs font-semibold tabular-nums transition-colors ${
                            isSelected
                              ? 'bg-[#D81B60] text-white shadow-sm cursor-pointer'
                              : isPast
                              ? 'text-slate-300 cursor-not-allowed'
                              : 'text-slate-700 hover:bg-[#FDF2F6] hover:text-[#D81B60] cursor-pointer'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bus Type Interactive Filter Bar */}
          <div className="mt-4 pt-4 border-t border-[#EAECEF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0">
              Bus Class
            </span>
            <div
              role="group"
              aria-label="Filter by bus class"
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
            >
              {BUS_FILTERS.map((option) => {
                const active = busFilter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onChangeBusFilter(option)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#FDF2F6] text-[#C2185B] border border-[#D81B60]/40 shadow-[0_2px_6px_rgba(216,27,96,0.1)]'
                        : 'bg-[#F5F7FA] text-slate-600 border border-transparent hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overlapping Primary Crimson-Magenta Search CTA */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 z-20">
            <button
              type="button"
              onClick={onSearch}
              className="group min-h-[56px] px-8 sm:px-10 rounded-full rsrtc-gradient text-white font-bold text-sm sm:text-base tracking-tight flex items-center gap-3 shadow-[0_12px_28px_rgba(216,27,96,0.4)] hover:shadow-[0_16px_34px_rgba(216,27,96,0.48)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B60]"
            >
              <span className="w-8 h-8 rounded-full bg-white/18 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
              </span>
              <span>Search Buses</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
